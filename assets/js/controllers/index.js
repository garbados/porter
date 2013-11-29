var plugins = [
  require('./drafts'),
  require('./new'),
  require('./post'),
  require('./recent'),
  require('./search'),
  require('./tags'),
  require('./sync'),
  require('./nav'),
  require('./category')
];

module.exports = function (app) {
  plugins
    .forEach(function (plugin) {
      plugin(app);
    });
};