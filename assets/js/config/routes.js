module.exports = function (app) {
  app.config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider
      .when('/', {
        controller: 'RecentCtrl',
        templateUrl: 'list.html'
      })
      .when('/drafts', {
        controller: 'DraftCtrl',
        templateUrl: 'list.html'
      })
      .when('/search', {
        controller: 'SearchCtrl',
        templateUrl: 'search.html'
      })
      .when('/new', {
        controller: 'NewCtrl',
        templateUrl: 'new.html'
      })
      .when('/:tag/', {
        controller: 'TagCtrl',
        templateUrl: 'list.html'
      })
      .when('/:tag/:id', {
        controller: 'PostCtrl',
        templateUrl: 'post.html'
      })
      .when('/:tag/:id/edit', {
        controller: 'NewCtrl',
        templateUrl: 'new.html'
      });
    }
  ]);
};