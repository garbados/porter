module.exports = function (app) {
  app.controller('DraftCtrl', [
    '$scope', 'Posts', 'Paginator',
    function ($scope, Posts, Paginator) {
      $scope.posts = [];

      Paginator(Posts.drafts, 20, function (err, pages) {
        if (err) throw err;
        $scope.$apply(function () {
          $scope.hasMore = pages.hasMore;

          $scope.next = function () {
            $scope.posts = $scope.posts.concat.apply($scope.posts, pages.next());
          };

          $scope.next();
        });
      });
    }
  ]);
};