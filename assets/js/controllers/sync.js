module.exports = function (app) {
  app.controller('SyncCtrl', [
    '$scope', 'Pouch', '$location',
    function ($scope, Pouch, $location) {
      $scope.sync = function (target) {
        if (target) {
          // TODO allow filters like published-only
          var opts = {
            continuous: true,
            create_target: true
          };

          Pouch.replicate.from(target, opts);
          Pouch.replicate.to(target, opts);
          // TODO fix redirect; doesn't redirect to '/'
          $location.path('/');
        } else {
          // TODO error message
        }
      };
    }
  ]);
};
