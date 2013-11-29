module.exports = function (app) {
  app.controller('CategoryCtrl', [
    '$scope', 'Posts', '$routeParams',
    function ($scope, Posts, $routeParams) {
      $scope.category = $routeParams.category;
      Posts.categories($routeParams.category, function (err, posts) {
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