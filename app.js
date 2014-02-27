var couchapp = require('couchapp')
  , path = require('path');

ddoc = {
  _id: '_design/porter',
  views: {},
  lists: {},
  shows: {},
  rewrites: [{
    from: '/',
    to: '/index.html'
  }, {
    from: '/api/*',
    to: '../../*'
  }, {
    from: '*',
    to: '/*'
  }],
  filters: {
    docs: function (doc, req) {
      if (doc.type) {
        return true;
      } else {
        return false;
      }
    }
  }
};

couchapp.loadAttachments(ddoc, path.join(__dirname, 'dist'));

module.exports = ddoc;