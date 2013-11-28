module.exports = function (app) {
  app.controller('DraftCtrl', [
    '$scope', 'Posts',
    function ($scope, Posts) {
      Posts.drafts(function (err, posts) {
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