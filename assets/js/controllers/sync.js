module.exports = function (app) {
  app.controller('SyncCtrl', [
    '$scope', 'Pouch', '$location',
    function ($scope, Pouch, $location) {
      $scope.sync = function (target) {
        if (target) {
          var opts = {
            continuous: true,
            create_target: true
          };

          Pouch.replicate.from(target, opts);
          Pouch.replicate.to(target, opts);

          $location.path('/');
        } else {
          $scope.error = "Target is required.";
        }
      };
    }
  ]);
};
