angular
.module('controllers')
.controller('PostCtrl', [
  '$scope', 'Pouch', '$routeParams', '$location',
  function ($scope, Pouch, $routeParams, $location) {
    Pouch.get($routeParams.id, function (err, res) {
      if (err) {
        if (err.status === 404) {
          $scope.$apply(function () {
            $location.path('/404');
          });
        } else {
          console.trace(err); 
        }
      } else {
        $scope.$apply(function () {
          $scope.post = res;
          $scope.schema = $scope.Schemas.get(res.type);
        });
      }
    });
  }
]);