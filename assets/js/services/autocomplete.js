angular
.module('services')
.directive('autoComplete', [
  '$timeout',
  function($timeout) {
    return function(scope, elem, attrs) {
      elem.autocomplete({
        source: scope[attrs.uiItems],
        select: function() {
          $timeout(function() {
            elem.trigger('input');
          }, 0);
        }
      });
    };
  }
]);