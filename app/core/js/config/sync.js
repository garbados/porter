// sync on startup
angular
.module('config')
.run([
  'Pouch',
  function (Pouch) {
    var url = location.protocol + '//' + location.hostname + location.pathname + '/api';
    var options = {
      complete: console.log,
      filter: 'porter/docs'
    };

    Pouch.replicate.from(url, options);
  }
]);