var plugins = [
  require('./drafts'),
  require('./new'),
  require('./post'),
  require('./recent'),
  require('./search'),
  require('./tags'),
  require('./sync')
];

module.exports = function (app) {
  plugins
    .forEach(function (plugin) {
      plugin(app);
    });
};