angular
.module('controllers')
.controller('CategoryCtrl', [
  '$scope', 'Posts', '$routeParams', '$location',
  function ($scope, Posts, $routeParams, $location) {
    $scope.limit = 10;
    $scope.next = function () {
      $scope.limit += 10;
    };

    $scope.title = '@' + $routeParams.category;

    Posts.categories($routeParams.category, function (err, res) {
      if (err) throw err;
      $scope.$apply(function () {
        if (res.length) {
          $scope.posts = res; 
        } else {
          // backwards compatibility for top-level-pages
          $location.path('/post/' + $routeParams.category);
        }
      });
    });
  }
]);