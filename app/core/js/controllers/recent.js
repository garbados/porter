angular
.module('controllers')
.controller('RecentCtrl', [
  '$scope', 'Posts',
  function ($scope, Posts) {
    $scope.title = "Recent";

    $scope.limit = 10;
    $scope.next = function () {
      $scope.limit += 10;
    };

    Posts
    .search({
      published: true
    }, function (err, res) {
      if (err) throw err;

      var posts = res.map(function (row) {
        return row.doc;
      });

      $scope.$apply(function () {
        $scope.posts = posts;
      });
    });
  }
]);