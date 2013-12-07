module.exports = function (app) {
  app.controller('RecentCtrl', [
    '$scope', 'Posts',
    function ($scope, Posts) {
      var _posts = [],
          batch_size = 5;
      $scope.tag = 'Published';
      $scope.posts = [];

      $scope.next = function () {
        return (_posts.length > $scope.posts.length);
      };
      
      Posts.published(function (err, posts) {
        if (err) {
          console.trace(err);
        } else {
          _posts = posts;
          $scope.$apply(function () {
            $scope.posts = _posts.slice(0, batch_size);
          });
        }
      });

      $scope.loadMore = function () {
        $scope.posts = $scope
          .posts
          .concat
          .apply($scope.posts, _posts.slice(
              $scope.posts.length,
              $scope.posts.length + batch_size
            ));
      };
    }
  ]);
};