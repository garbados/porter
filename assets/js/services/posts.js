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

      return {
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
              }));
            }
          });
        },
        saveDraft: function (post, done) {
          post.published = false;
          post = update_timestamps(post);
          
          Pouch.post(post, done);
        },
        save: function (post, done) {
          post.published = true;
          post = update_timestamps(post);

          Pouch.post(post, done);
        }
      };
    }
  ]);
};