module.exports = function (app) {
  app.controller('NavCtrl', [
    '$scope', 'Posts', 'Schemas',
    function ($scope, Posts, Schemas) {
      $scope.clear = function clear () {
        if (confirm('Are you sure you want to clear your local data?')) {
          PouchDB.destroy('porter');
        } 
      };

      $scope.schemas = Schemas.all();

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
