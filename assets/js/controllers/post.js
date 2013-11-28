module.exports = function (app) {
  app.controller('PostCtrl', [
    '$scope', 'Pouch', '$routeParams',
    function ($scope, Pouch, $routeParams) {
      Pouch.get($routeParams.id, function (err, res) {
        if (err) {
          console.trace(err);
        } else {
          $scope.$apply(function () {
            $scope.post = res;
          });
        }
      });
    }
  ]);
};