angular
.module('controllers')
.controller('NewCtrl', [
  '$scope', 'Pouch', 'Posts',
  '$location', '$routeParams', 'Slug',
  'Schemas',
  function ($scope, Pouch, Posts, $location, $routeParams, Slug, Schemas) {

    // get schema
    $scope.schema = Schemas.get($routeParams.type || 'post');
    $scope.post = { type: $scope.schema.name };
    $scope.defaults = {}; // add any default values here

    // get doc, if it exists
    if ($routeParams.id) {
      Pouch.get($routeParams.id, function (err, res) {
        if (err) {
          console.trace(err);
        } else {
          $scope.$apply(function () {
            $scope.post = res;
            $scope.schema = Schemas.get($scope.post.type);
          });
        }
      });
    }

    // ensure `primary` maps to the doc slug
    $scope.$watch('post.' + $scope.schema.primary, function () {
      if ($scope.post) {
        $scope.post.id = $scope.post._id || Slug.slugify($scope.post[$scope.schema.primary]); 
      }
    });

    /*
     * TYPEAHEADS
     */

    $scope.typeahead = {};
    function addTypeahead (field) {
      $scope.typeahead[field] = [];

      return function (err, res) {
        if (err) {
          console.trace (err);
        } else {
          $scope.$apply(function () {
            $scope.typeahead[field] = res;
          });
        }
      };
    }

    Posts.count.authors(addTypeahead('author'));
    Posts.count.categories(addTypeahead('category'));

    /*
     * ACTIONS
     */

    function redirect (to) {
      return function (err) {
        if (err) {
          console.trace(err);
        } else {
          $scope.$apply(function () {
            $location.path(to);
          });
        }
      };
    }

    $scope.draft = function (post) {
      post.type = $scope.schema.type;
      Posts.saveDraft(post, redirect('/drafts'));
    };

    $scope.publish = function (post) {
      post.type = $scope.schema.type;
      Posts.save(post, function (err, res) {
        redirect('/recent/' + res.id)(err);
      });
    };

    $scope.delete = function (post) {
      Pouch.remove(post, redirect('/'));
    };
  }
]);