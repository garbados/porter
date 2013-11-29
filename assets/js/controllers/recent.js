module.exports = function (app) {
  app.controller('RecentCtrl', [
    '$scope', 'Posts',
    function ($scope, Posts) {
      $scope.tag = 'Published';
      
      Posts.published(function (err, posts) {
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