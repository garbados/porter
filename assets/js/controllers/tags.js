module.exports = function (app) {
  app.controller('TagCtrl', [
    '$scope', 'Posts', 'Paginator', '$routeParams',
    function ($scope, Posts, Paginator, $routeParams) {
      $scope.tag = $routeParams.tag;
      $scope.posts = $scope.posts || [];

      Paginator(Posts.tags.bind(Posts.tags, $routeParams.tag), 20, function (err, pages) {
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