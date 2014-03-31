angular
.module('config')
.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider
    .when('/', {
      controller: 'RecentCtrl',
      templateUrl: 'list.html'
    })
    .when('/404', {
      templateUrl: 'notfound.html'
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
    .when('/new/:type', {
      controller: 'NewCtrl',
      templateUrl: 'new.html'
    })
    .when('/tag/:tag/', {
      controller: 'TagCtrl',
      templateUrl: 'list.html'
    })
    .when('/edit/:id*', {
      controller: 'NewCtrl',
      templateUrl: 'new.html'
    })
    .when('/:category', {
      controller: 'CategoryCtrl',
      templateUrl: 'list.html'
    })
    .when('/:category/:id*', {
      controller: 'PostCtrl',
      templateUrl: 'post.html'
    })
    .otherwise({
      redirectTo: '/404'
    });
  }
]);