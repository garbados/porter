angular
.module('services')
.factory('Posts', [
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

    function split_tags (post) {
      // make array if none
      if (!post.tags) {
        post.tags = [];
      }
      // duck-type determine whether tags are a string or an array
      if (post.tags.split) {
        post.tags = post.tags.split(',').map(function (tag) {
          return tag.trim();
        }); 
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

    function _allPosts(query, done) {
      Pouch.query({
        map: query,
        reduce: '_count'
      }, {
        group: true
      }, function (err, res) {
        if (err) {
          done(err);
        } else {
          var tags = res.rows;

          done(null, tags);
        }
      });
    }

    function allTags (done) {
      _allPosts(function (doc) {
        if (doc.tags) {
          doc
            .tags
            .filter(function (tag) {
              return tag;
            })
            .forEach(function (tag) {
              emit(tag, null);
            });
        }
      }, done);
    }

    function allCategories (done) {
      _allPosts(function (doc) {
        if (doc.category) {
          emit(doc.category, null);
        }
      }, done);
    }

    function allAuthors (done) {
      _allPosts(function (doc) {
        if (doc.author) {
          emit(doc.author, null);
        }
      }, done);
    }

    function getTags (tags, done) {
      if (typeof(tags) === 'string') {
        tags = tags.filter(function (tag) {
          return tag;
        });
      }

      Pouch.query({
        map: function (doc) {
          if (doc.tags) {
            var tags = doc.tags;
            tags.forEach(function (tag) {
              emit(tag, tags);
            });
          }
        }
      }, {
        include_docs: true,
        keys: tags
      }, function (err, res) {
        if (err) {
          done(err);
        } else {
          var uniq_posts = {},
              posts = res.rows
                // remove all posts which don't feature all tags
                .filter(function (row) {
                  var results = [];
                  tags.forEach(function (tag) {
                    results.push(row.value.indexOf(tag));
                  });
                  return results.indexOf(-1) === -1;
                })
                // return only the tag doc itself
                .map(function (row) {
                  return row.doc;
                });

          posts.forEach(function (post) {
            uniq_posts[post._id] = post;
          });

          var results = Object.keys(uniq_posts).map(function (id) {
            return uniq_posts[id];
          });

          done(null, results);
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
        post = update_timestamps(post);
        post = split_tags(post);
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
        post = split_tags(post);
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