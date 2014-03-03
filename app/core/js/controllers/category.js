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

    Posts
    .search({
      category: $routeParams.category
    }, function (err, rows) {
      if (err) throw err;
      
      $scope.$apply(function () {
        var docs = rows.map(function (row) {
          return row.doc;
        });

        if (docs.length) {
          $scope.posts = docs; 
        } else {
          // backwards compatibility for top-level-pages
          $location.path('/post/' + $routeParams.category);
        }
      });
    });
  }
]);