module.exports = function (app) {
  app.controller('NewCtrl', [
    '$scope', 'Pouch', 'Posts', '$location', '$routeParams', 'Slug',
    function ($scope, Pouch, Posts, $location, $routeParams, Slug) {
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
            });
          }
        });
      }

      $scope.$watch('post.title', function () {
        if ($scope.post) {
          $scope.post.id = $scope.post._id || Slug.slugify($scope.post.title); 
        }
      });

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