var plugins = [
  require('./pouch'),
  require('./posts'),
  require('./markdown'),
  require('./autocomplete')
];

module.exports = function (app) {
  plugins
    .forEach(function (plugin) {
      plugin(app);
    });
};