var plugins = [
  require('./routes')
];

module.exports = function (app) {
  plugins
    .forEach(function (plugin) {
      plugin(app);
    });
};