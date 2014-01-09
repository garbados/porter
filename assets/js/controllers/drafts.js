module.exports = function (app) {
  app.controller('DraftCtrl', [
    '$scope', 'Posts',
    function ($scope, Posts) {
      $scope.title = "Drafts";
      
      $scope.limit = 10;
      $scope.next = function () {
        $scope.limit += 10;
      };

      Posts.drafts(function (err, posts) {
        if (err) throw err;
        $scope.$apply(function () {
          $scope.posts = posts;
        });
      });
    }
  ]);
};