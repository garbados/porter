module.exports = function (app) {
  app.constant('Pouch', new PouchDB('porter'));
};