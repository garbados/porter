angular
.module('services')
.factory('Posts', [
  'Pouch', 'Post',
  function (Pouch, Post) {

    function all (done) {
      Pouch.allDocs({
        include_docs: true
      }, function (err, res) {
        if (err) {
          done(err);
        } else {
          var results = res.rows.filter(function (row) {
            return row.doc.type !== undefined;
          });

          done(null, results);
        }
      });
    }

    function count (keys) {
      var results = {};

      keys.forEach(function (key) {
        if (results[key]) {
          results[key]++;
        } else {
          results[key] = 1;
        }
      });

      return results;
    }

    return {
      all: all,
      search: function (query, done) {
        all(function (err, res) {
          if (err) {
            done(err);
          } else {
            var results = res.rows.filter(function (row) {
              var should_keep = true;
              
              for (var key in query) {
                if (query[key] !== row.doc[key]) {
                  should_keep = false;
                  break;
                }
              }

              return should_keep;
            });

            done(null, results);
          }
        });
      },
      count: {
        authors: function (done) {
          all(function (err, res) {
            if (err) {
              done(err);
            } else {
              var rows = res.rows.map(function (row) {
                return row.doc.author;
              });
              var result = count(rows);

              done(null, result);
            }
          });
        },
        tags: function (done) {
          all(function (err, res) {
            if (err) {
              done(err);
            } else {
              var rows = [];

              res.rows.forEach(function (row) {
                if (row.doc.tags.forEach) {
                  row.doc.tags.forEach(function (tag) {
                    rows.push(tag);
                  });
                }
              });

              var result = count(rows);

              done(null, result);
            }
          });},
        category: function (done) {
          all(function (err, res) {
            if (err) {
              done(err);
            } else {
              var rows = res.rows.map(function (row) {
                return row.doc.category;
              });
              var result = count(rows);

              done(null, result);
            }
          });
        }
      },
      // create, update 
      saveDraft: Post.draft,
      save: Post.publish
    };
  }
]);