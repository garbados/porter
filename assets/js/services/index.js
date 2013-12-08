var plugins = [
  require('./pouch'),
  require('./posts'),
  require('./markdown'),
  require('./autocomplete'),
  require('./summary'),
  require('./paginator')
];

module.exports = function (app) {
  plugins
    .forEach(function (plugin) {
      plugin(app);
    });
};