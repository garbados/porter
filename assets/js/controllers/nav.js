module.exports = function (app) {
  app.controller('NavCtrl', [
    '$scope', 'Posts',
    function ($scope, Posts) {
      Posts.allTags(function (err, tags) {
        if (err) {
          console.trace(err);
        } else {
          $scope.$apply(function () {
            $scope.tags = tags;
          });
        }
      });

      Posts.allCategories(function (err, categories) {
        if (err) {
          console.trace(err);
        } else {
          $scope.$apply(function () {
            $scope.categories = categories;
          }); 
        }
      });
    }
  ]);
};
