module.exports = function (app) {
  app.controller('NavCtrl', [
    '$scope', 'Pouch',
    function ($scope, Pouch) {
      function getTags () {
        Pouch.query({
          map: function (doc) {
            if (doc.tags) {
              doc
                .tags
                .split(',')
                .map(function (tag) {
                  return tag.trim();
                })
                .forEach(function (tag) {
                  emit(tag, null);
                });
            }
          },
          reduce: '_count'
        }, {
          group: true
        }, function (err, res) {
          if (err) {
            console.trace(err);
          } else {
            var tags = res.rows
                  .sort(function (a, b) {
                    return b.value - a.value;
                  });

            $scope.$apply(function () {
              $scope.tags = tags;
            });
          }
        });
      }

      // refresh tags whenever db changes
      Pouch.changes({
        continuous: true,
        onChange: getTags
      });
    }
  ]);
};
