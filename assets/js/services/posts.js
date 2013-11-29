module.exports = function (app) {
  app.factory('Posts', [
    'Pouch',
    function (Pouch) {
      function update_timestamps (post) {
        if (post.created_at === undefined) {
          post.created_at = new Date().getTime();
        } else {
          post.modified_at = new Date().getTime();
        }

        return post;
      }

      // if the id changes, 
      // ensure that id isn't already taken
      // and remove the old post
      function modify_id (post, done) {
        if (post._id) {
          if (post.id !== post._id) {
            Pouch.get(post._id, function (err, res) {
              if (err) {
                if (err.status === 404) {
                  post._id = post.id;
                  delete post.id;
                  done(null, post);
                } else {
                  done(err);
                }
              } else {
                Pouch.remove(post, function (err) {
                  if (err) {
                    done(err);
                  } else {
                    post._id = post.id;
                    delete post.id;
                    done(null, post);
                  }
                });
              }
            });
          } else {
            done(null, post);
          }
        } else {
          post._id = post.id;
          delete post.id;
          done(null, post);
        }
      }

      function dedupe (array, field) {
        var keys = {},
            results = [];

        array.forEach(function (obj) {
          if (field) {
            if (obj[field] in keys) {
              // do nothing
            } else {
              keys[obj[field]] = true;
              results.push(obj);
            }
          } else {
            if (obj in keys) {
              // do nothing
            } else {
              keys[obj] = true;
              results.push(obj);
            }
          }
        });

        return results;
      }

      return {
        tags: function (tag, done) {
          Pouch.query({
            map: function (doc) {
              if (doc.tags) {
                doc.tags.split(',').forEach(function (tag) {
                  tag = tag.trim();
                  emit(tag, null);
                });
              }
            }
          }, {
            include_docs: true,
            key: tag
          }, function (err, res) {
            if (err) {
              done(err);
            } else {
              var posts = 
                dedupe(res.rows, 'id')
                .map(function (row) {
                  return row.doc;
                })
                .sort(function (a, b) {
                  return b.created_at - a.created_at;
                });

              done(null, posts);
            }
          });
        },
        drafts: function (done) {
          Pouch.query({
            map: function (doc) {
              if (doc.published === false) {
                emit(doc._id, null);
              }
            }
          }, {
            include_docs: true
          }, function (err, res) {
            if (err) {
              done(err);
            } else {
              done(null, res.rows.map(function (row) {
                  return row.doc;
              }));
            }
          });
        },
        published: function (done) {
          Pouch.query({
            map: function (doc) {
              if (doc.published === true) {
                emit(doc._id, null);
              }
            }
          }, {
            include_docs: true
          }, function (err, res) {
            if (err) {
              done(err);
            } else {
              done(null, res.rows.map(function (row) {
                return row.doc;
              }).sort(function (a, b) {
                return b.created_at - a.created_at;
              }));
            }
          });
        },
        saveDraft: function (post, done) {
          post.published = false;
          post = update_timestamps(post);
          modify_id(post, function (err, post) {
            if (err) {
              done(err);
            } else {
              Pouch.post(post, done); 
            }
          });
        },
        save: function (post, done) {
          post.published = true;
          post = update_timestamps(post);
          modify_id(post, function (err, post) {
            if (err) {
              done(err);
            } else {
              Pouch.post(post, done); 
            }
          });
        }
      };
    }
  ]);
};