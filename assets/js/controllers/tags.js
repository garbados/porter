module.exports = function (app) {
  app.controller('TagCtrl', [
    '$scope', 'Posts', '$routeParams',
    function ($scope, Posts, $routeParams) {
      $scope.tag = $routeParams.tag;
      Posts.tags($routeParams.tag, function (err, posts) {
        if (err) {
          console.trace(err);
        } else {
          $scope.$apply(function () {
            $scope.posts = posts;
          });
        }
      });
    }
  ]);
};