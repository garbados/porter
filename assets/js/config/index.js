var plugins = [
  require('./routes'),
  require('./location')
];

module.exports = function (app) {
  plugins
    .forEach(function (plugin) {
      plugin(app);
    });
};