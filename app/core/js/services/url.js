angular
.module('services')
.factory('_url', function () {
  var url = location.protocol + '//' + location.host;
  if (location.pathname) {
    url += location.pathname;
  }
  
  if (url[url.length - 1] === '/') {
    url += 'api'; 
  } else {
    url += '/api';
  }
  
  return url;
});
