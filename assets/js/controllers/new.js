module.exports = function (app) {
  app.controller('NewCtrl', [
    '$scope', 'Pouch', 'Posts',
    '$location', '$routeParams', 'Slug',
    'Schemas',
    function ($scope, Pouch, Posts, $location, $routeParams, Slug, Schemas) {
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

      if ($routeParams.id) {
        Pouch.get($routeParams.id, function (err, res) {
          if (err) {
            console.trace(err);
          } else {
            $scope.$apply(function () {
              $scope.post = res;
              $scope.schema = Schemas($scope.post.category);
            });
          }
        });
      } else {
        var schema = Schemas($routeParams.category);
        $scope.schema = schema;
        $scope.posts = {
          category: $routeParams.category
        };
      }

      $scope.$watch('post.title', function () {
        if ($scope.post) {
          $scope.post.id = $scope.post._id || Slug.slugify($scope.post.title); 
        }
      });

      $scope.typeahead = {};
      function addTypeahead (field) {
        return function (err, res) {
          if (err) {
            console.trace (err);
          } else {
            $scope.typeahead[field] = res.map(function (row) {
              return row.key;
            });
          }
        };
      }

      Posts.allAuthors(addTypeahead('author'));
      Posts.allCategories(addTypeahead('category'));

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
};