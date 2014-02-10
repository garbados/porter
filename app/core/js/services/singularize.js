angular
.module('services')
.filter('singularize', [
  function () {
    return function (input) {
      if (input.slice(-1) === 's' && input.slice(-2) !== 'ss') {
        return input.slice(0, -1);
      } else {
        return input;
      }
    };
  }
]);