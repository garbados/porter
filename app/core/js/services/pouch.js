angular
.module('services')
.factory('Pouch', function () {
  var url = location.protocol + '//' + location.host;
  if (location.pathname) {
    url += location.pathname;
  }
  url = [url, 'api'].join('/');
  
  return new PouchDB(url);
});
