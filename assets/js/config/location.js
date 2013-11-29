module.exports = function (app) {
  app.config([
    '$locationProvider',
    function ($locationProvider) {
      // TODO fix html5mode, because right now it breaks everything
      // $locationProvider.html5Mode(true);
    }
  ]);
};