angular
.module('services')
.factory('Pouch', function () {
  var url = location.protocol + '//' + location.host;
  if (location.pathname) {
    url += location.pathname;
  }
  url = [url, '_rewrite', 'api'].join('/');
  console.log(url);
  return new PouchDB(url);
});
