module.exports = function (app) {
  app.constant('md', new Showdown.converter());
  app.filter('markdown', [
    'md', 
    function (md) {
      return function (input){
        if (input) return md.makeHtml(input);
      };
    }
  ]);
};