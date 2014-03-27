angular
.module('services')
.factory('Posts', [
  '_url', '$http', 'Post',
  function (_url, $http, Post) {

    function get (id, done) {
      var url = [_url, encodeURIComponent(id)].join('/');
      $http.get(url)
      .error(done)
      .success(function (res) {
        // handle posts from when tags was a string
        // sins of the jerks we were
        if (!res.tags.forEach) {
          res.tags = res.tags.split(',').map(function (tag) {
            return tag.trim();
          });
        }

        done(null, res);
      });
    }

    function remove (post, done) {
      var url = [_url, encodeURIComponent(post._id)].join('/');
      $http.delete(url, {
        params: {
          rev: post._rev
        }
      })
      .error(done)
      .success(done.bind(null, null));
    }

    function all (done) {
      var url = [_url, '_all_docs'].join('/');
      $http.get(url, {
        params: {
          include_docs: true 
        }
      })
      .error(done)
      .success(function (res) {
        var results = res.rows.filter(function (row) {
          return row.doc.type !== undefined;
        }).map(function (row) {
          if (row.doc.tags && !row.doc.tags.forEach) {
            // in older versions of porter, `tags` was a string
            // past-me made horrible choices
            // but we inherit the sins
            // of the jerks we used to be
            // something like that
            row.doc.tags = row.doc.tags.split(',').map(function (tag) {
              return tag.trim();
            });
          }

          return row;
        });

        done(null, results);
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
      get: get,
      all: all,
      search: function (query, done) {
        all(function (err, res) {
          if (err) {
            done(err);
          } else {
            var results = res.filter(function (row) {
              var should_keep = false;
              
              for (var key in query) {
                var query_key = String(query[key]).toLowerCase();
                var row_key = String(row.doc[key]).toLowerCase();

                if (row_key && row_key.indexOf(query_key) !== -1) {
                  should_keep = true;
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
              var rows = res.map(function (row) {
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

              res.forEach(function (row) {
                if (row.doc.tags && row.doc.tags.forEach) {
                  row.doc.tags.forEach(function (tag) {
                    rows.push(tag);
                  });
                }
              });

              var result = count(rows);

              done(null, result);
            }
          });
        },
        categories: function (done) {
          all(function (err, res) {
            if (err) {
              done(err);
            } else {
              var rows = res.map(function (row) {
                return row.doc.category;
              }).filter(function (category) {
                return category;
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