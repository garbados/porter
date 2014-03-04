angular
.module('controllers')
.controller('SyncCtrl', [
  '$scope', 'Pouch', '$location',
  function ($scope, Pouch, $location) {
    var opts = {
      create_target: true,
      complete: function (err) {
        if (err) {
          $scope.$apply(function () {
            $scope.error = JSON.stringify(err);
          });
        } else {
          $scope.$apply(function () {
            $location.path('/');
          });
        }
      }
    };

    // default to syncing with the deploying DB
    var url = location.protocol + '//' + location.host;
    if (location.path) {
      url = [url, location.path].join('/');
    }
    url = [url, '_rewrite', 'api'].join('/');
    $scope.target = url;

    $scope.from = function (target) {
      if (!target) {
        $scope.error = "Target is required.";
      } else {
        $scope.success = true;
        Pouch.replicate.from(target, opts); 
      }
    };

    $scope.to = function (target) {
      if (!target) {
        $scope.error = "Target is required.";
      } else {
        $scope.success = true;
        Pouch.replicate.to(target, opts);
      }
    };
  }
]);