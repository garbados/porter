angular
.module('services')
.factory('Post', [
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

    function save (post, done) {
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

    return {
      save: save,
      draft: function (post, done) {
        post.published = false;
        save(post, done);
      },
      publish: function (post, done) {
        post.published = true;
        save(post, done);
      }
    };
  }
]);