module.exports = function (app) {
  app.controller('SearchCtrl', [
    '$scope', 'Posts',
    function ($scope, Posts) {
      Posts.posts(function (err, res) {
        if (err) {
          console.trace(err);
        } else {
          $scope.$apply(function () {
            $scope._posts = res;
            $scope._done = true;
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