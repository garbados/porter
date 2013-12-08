module.exports = function (app) {
  app.controller('RecentCtrl', [
    '$scope', 'Posts', 'Paginator',
    function ($scope, Posts, Paginator) {
      $scope.posts = $scope.posts || [];

      Paginator(Posts.published, 20, function (err, pages) {
        if (err) throw err;
        $scope.$apply(function () {
          $scope.hasMore = pages.hasMore;

          $scope.next = function (index) {
            $scope.posts = $scope.posts.concat.apply($scope.posts, pages.next(index));
          };

          pages.reset();
          $scope.next();
        });
      });
    }
  ]);
};