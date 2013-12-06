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

      function allTags (done) {
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
            done(err);
          } else {
            var tags = res.rows
                  .sort(function (a, b) {
                    return b.value - a.value;
                  });

            done(null, tags);
          }
        });
      }

      function allCategories (done) {
        Pouch.query({
          map: function (doc) {
            if (doc.category) {
              emit(doc.category, null);
            }
          },
          reduce: '_count'
        }, {
          group: true
        }, function (err, res) {
          if (err) {
            done(err);
          } else {
            var categories = res.rows
                  .sort(function (a, b) {
                    return b.value - a.value;
                  });

            done(null, categories);
          }
        });
      }

      function allAuthors (done) {
        Pouch.query({
          map: function (doc) {
            if (doc.author) {
              emit(doc.author, null);
            }
          },
          reduce: '_count'
        }, {
          group: true
        }, function (err, res) {
          if (err) {
            done(err);
          } else {
            var authors = res.rows
                  .sort(function (a, b) {
                    return b.value - a.value;
                  });

            done(null, authors);
          }
        });
      }

      function getTags (tag, done) {
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
      }

      function getCategories (category, done) {
        Pouch.query({
          map: function (doc) {
            if (doc.category) {
              emit(doc.category, null);
            }
          }
        }, {
          include_docs: true,
          key: category
        }, function (err, res) {
          if (err) {
            done(err);
          } else {
            var posts = 
              res.rows
              .map(function (row) {
                return row.doc;
              })
              .sort(function (a, b) {
                return b.created_at - a.created_at;
              });

            done(null, posts);
          }
        });
      }

      function getAuthors (author, done) {
        Pouch.query({
          map: function (doc) {
            if (doc.author) {
              emit(doc.author, null);
            }
          }
        }, {
          include_docs: true,
          key: author
        }, function (err, res) {
          if (err) {
            done(err);
          } else {
            var authors = 
              res.rows
              .map(function (row) {
                return row.doc;
              })
              .sort(function (a, b) {
                return b.created_at - a.created_at;
              });

            done(null, authors);
          }
        });
      }

      function _prepPosts (done) {
        return function (err, res) {
          if (err) {
            done(err);
          } else {
            done(null, res.rows.map(function (row) {
              return row.doc;
            }).sort(function (a, b) {
              return b.created_at - a.created_at;
            }));
          }
        };
      }

      function _getPosts (query) {
        return function (opts, done) {
          if (typeof opts === 'function') {
            done = opts;
            opts = {};
          }
          opts.include_docs = true;

          Pouch.query({
            map: query
          }, opts, _prepPosts(done));
        };
      }

      function getPosts (opts, done) {
        _getPosts(function (doc) {
          if (doc.published !== undefined) {
            emit(doc._id, null);
          }
        })(opts, done);
      }

      function getDrafts (opts, done) {
        _getPosts(function (doc) {
          if (doc.published === false) {
            emit(doc._id, null);
          }
        })(opts, done);
      }

      function getPublished (opts, done) {
        _getPosts(function (doc) {
          if (doc.published === true) {
            emit(doc._id, null);
          }
        })(opts, done);
      }

      return {
        tags: getTags,
        categories: getCategories,
        authors: getAuthors,
        allTags: allTags,
        allCategories: allCategories,
        allAuthors: allAuthors,
        drafts: getDrafts,
        published: getPublished,
        posts: getPosts,
        saveDraft: function (post, done) {
          post.published = false;
          post.type = 'porter';
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
          post.type = 'porter';
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