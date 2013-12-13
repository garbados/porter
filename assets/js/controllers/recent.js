module.exports = function (app) {
  app.controller('RecentCtrl', [
    '$scope', 'Posts',
    function ($scope, Posts) {
      $scope.title = "Recent";

      $scope.limit = 10;
      $scope.next = function () {
        $scope.limit += 10;
      };

      Posts.published(function (err, posts) {
        console.log(err);
        if (err) throw err;
        $scope.$apply(function () {
          $scope.posts = posts;
        });
      });
    }
  ]);
};