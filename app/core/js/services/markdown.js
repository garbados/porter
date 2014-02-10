angular
.module('services')
.constant('md', new Showdown.converter())
.filter('markdown', [
  'md', 
  function (md) {
    return function (input){
      if (input) return md.makeHtml(input);
    };
  }
]);