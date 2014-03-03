angular
.module('controllers')
.controller('TagCtrl', [
  '$scope', 'Posts', '$routeParams',
  function ($scope, Posts, $routeParams) {
    $scope.limit = 10;
    $scope.next = function () {
      $scope.limit += 10;
    };

    $scope.title = $routeParams.tag.split(',').filter(function (tag) {
      return tag;
    }).map(function (tag) {
      return '#' + tag;
    }).join(' ');

    Posts
    .search({
      tags: $routeParams.tag
    }, function (err, rows) {
      var posts = rows.map(function (row) {
        return row.doc;
      });

      $scope.$apply(function () {
        $scope.posts = posts;
      });
    });
  }
]);