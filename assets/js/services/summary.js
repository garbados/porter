module.exports = function (app) {
  app.filter('summary', [
    function () {
      return function (input) {
        if (input) {
          // get the first \n\n
          var md_end = input.indexOf('\n\n');
          if (md_end === -1) md_end = 0;
          // get the first </p>
          var html_tag = '</p>',
              html_end = input.indexOf(html_tag);
          if (html_end === -1) html_end = 0;
          // detect which is higher; use that
          var index = html_end || md_end;
          // if </p> was higher, += </p>.length
          if (index) {
            if (index === html_end) {
              index += html_tag.length;
            }
          }
              
          return input.slice(0, index) || '';         
        } else {
          return '';
        }
      };
    }
  ]);
};