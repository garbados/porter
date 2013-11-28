var plugins = [
  require('./drafts'),
  require('./new'),
  require('./post'),
  require('./recent'),
  require('./search')
];

module.exports = function (app) {
  plugins
    .forEach(function (plugin) {
      plugin(app);
    });
};