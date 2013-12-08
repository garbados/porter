module.exports = function (app) {
  app.controller('CategoryCtrl', [
    '$scope', 'Posts', 'Paginator', '$routeParams',
    function ($scope, Posts, Paginator, $routeParams) {
      $scope.category = $routeParams.category;
      $scope.posts = $scope.posts || [];

      Paginator(Posts.categories.bind(Posts.categories, $routeParams.category), 20, function (err, pages) {
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