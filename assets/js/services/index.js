var plugins = [
  require('./pouch'),
  require('./posts'),
  require('./markdown')
];

module.exports = function (app) {
  plugins
    .forEach(function (plugin) {
      plugin(app);
    });
};