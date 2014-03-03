angular
.module('controllers')
.controller('NavCtrl', [
  '$scope', 'Posts', 'Schemas',
  function ($scope, Posts, Schemas) {
    $scope.clear = function clear () {
      if (confirm('Are you sure you want to clear your local data?')) {
        // TODO this throws "database is closing" :(
        alert('Refresh your browser to finish clearing your Porter.');
        PouchDB.destroy('porter');
      } 
    };

    $scope.schemas = Schemas.all();

    Posts
    .count
    .tags(function (err, tags) {
      if (err) {
        console.trace(err);
      } else {
        $scope.$apply(function () {
          $scope.tags = tags;
        });
      }
    });

    Posts
    .count
    .categories(function (err, categories) {
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
