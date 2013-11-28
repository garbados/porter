module.exports = function (app) {
  app.controller('NewCtrl', [
    '$scope', 'Pouch', 'Posts', '$location', '$routeParams',
    function ($scope, Pouch, Posts, $location, $routeParams) {
      function redirect (to) {
        // TODO: doesn't currently redirect if `to` === '/'
        return function (err) {
          if (err) {
            console.trace(err);
          } else {
            $location.path(to);
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

      $scope.draft = function (post) {
        Posts.saveDraft(post, redirect('/drafts'));
      };

      $scope.publish = function (post) {
        Posts.save(post, redirect('/'));
      };

      $scope.delete = function (post) {
        Pouch.remove(post, redirect('/'));
      };
    }
  ]);
};