module.exports = function (app) {
  app.controller('SearchCtrl', [
    '$scope', 'Pouch',
    function ($scope, Pouch) {
      Pouch.allDocs({
        include_docs: true
      }, function (err, res) {
        if (err) {
          console.trace(err);
        } else {
          $scope.$apply(function () {
            $scope._done = true;
          });
          $scope._posts = res.rows.map(function (row) {
            return row.doc;
          });
        }
      });

      $scope.search = function (querystring) {
        $scope.posts = $scope._posts.filter(function (post) {
          return post.text.indexOf(querystring) > -1;
        });
      };
    }
  ]);
};