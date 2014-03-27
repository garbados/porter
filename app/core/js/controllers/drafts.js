angular
.module('controllers')
.controller('DraftCtrl', [
  '$scope', 'Posts',
  function ($scope, Posts) {
    $scope.title = "Drafts";
    
    $scope.limit = 10;
    $scope.next = function () {
      $scope.limit += 10;
    };

    Posts
    .search({
      published: false
    }, function (err, rows) {
      if (err) throw err;
      
      var posts = rows.map(function (row) {
        return row.doc;
      });
      
      $scope.posts = posts;
    });
  }
]);