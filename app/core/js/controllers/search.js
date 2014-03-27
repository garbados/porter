angular
.module('controllers')
.controller('SearchCtrl', [
  '$scope', 'Posts',
  function ($scope, Posts) {
    $scope.limit = 10;
    $scope.next = function () {
      $scope.limit += 10;
    };

    Posts.all(function (err, res) {
      if (err) {
        console.trace(err);
      } else {
        $scope._done = true;
        $scope._posts = res.map(function (row) {
          return row.doc;
        });
      }
    });

    $scope.search = function (querystring) {
      var query = {
        text: querystring,
        title: querystring
      };

      Posts.search(query, function (err, res) {
        if (err) throw err;
        $scope.posts = res.map(function (row) {
          return row.doc;
        });
      });
    };
  }
]);
