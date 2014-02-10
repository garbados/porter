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

    Posts.tags($routeParams.tag, function (err, res) {
      if (err) throw err;
      $scope.$apply(function () {
        $scope.posts = res;
      });
    });
  }
]);