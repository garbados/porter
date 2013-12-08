module.exports = function (app) {
  app.factory('Paginator', [
    function () {
      var current = 0,
          results = [];

      return function (load, chunk_size, done) {
        var Paginator = {
          hasMore: function () {
            return (results.length > current);
          },
          next: function () {
            var batch = results.slice(current, current + chunk_size);
            current += chunk_size;
            return batch;
          },
          reset: function () {
            current = 0;
          }
        };

        load(function (err, res) {
          results = res;

          done(err, Paginator);
        });
      };
    }
  ]);
};