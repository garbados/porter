angular
.module('controllers')
.controller('PostCtrl', [
  '$scope', 'Posts', '$routeParams', '$location',
  function ($scope, Posts, $routeParams, $location) {
    Posts.get($routeParams.id, function (err, res) {
      if (err) {
        if (err.status === 404) {
          $scope.$apply(function () {
            $location.path('/404');
          });
        } else {
          console.trace(err); 
        }
      } else {
        $scope.post = res;
        $scope.schema = $scope.Schemas.get(res.type);
      }
    });
  }
]);