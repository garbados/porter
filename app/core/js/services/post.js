angular
.module('services')
.factory('Post', [
  '_url', '$http',
  function (_url, $http) {
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
          var url = [_url, post._id].join('/');

          $http.get(url)
          .error(function (err) {
            if (err.status === 404) {
              post._id = post.id;
              delete post.id;
              done(null, post);
            } else {
              done(err);
            }
          })
          .success(function (res) {
            $http.delete(url)
            .error(done)
            .success(function (res) {
              post._id = post.id;
              delete post.id;
              done(null, post);
            });
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
          var id = encodeURIComponent(post._id);
          var url = [_url, id].join('/');
          $http.put(url, JSON.stringify(post), {
            "Content-Type": "multipart/form-data"
          })
          .error(done)
          .success(done.bind(null, null));
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