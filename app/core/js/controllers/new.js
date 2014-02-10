angular
.module('controllers')
.controller('NewCtrl', [
  '$scope', 'Pouch', 'Posts',
  '$location', '$routeParams', 'Slug',
  'Schemas',
  function ($scope, Pouch, Posts, $location, $routeParams, Slug, Schemas) {

    // get schema
    $scope.schema = Schemas.get($routeParams.category || 'post');
    $scope.defaults = {
      category: $routeParams.category
    };

    // get doc, if it exists
    if ($routeParams.id) {
      Pouch.get($routeParams.id, function (err, res) {
        if (err) {
          console.trace(err);
        } else {
          $scope.$apply(function () {
            $scope.post = res;
            $scope.schema = Schemas.get($scope.post.category);
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

    Posts.allAuthors(addTypeahead('author'));
    Posts.allCategories(addTypeahead('category'));

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
      Posts.saveDraft(post, redirect('/drafts'));
    };

    $scope.publish = function (post) {
      Posts.save(post, function (err, res) {
        redirect('/recent/' + res.id)(err);
      });
    };

    $scope.delete = function (post) {
      Pouch.remove(post, redirect('/'));
    };
  }
]);