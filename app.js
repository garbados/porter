var couchapp = require('couchapp')
  , path = require('path');

ddoc = {
  _id: '_design/app',
  views: {},
  lists: {},
  shows: {},
  rewrites: [{
    from: '/',
    to: '/index.html'
  }, {
    from: '*',
    to: '/*'
  }]
};

couchapp.loadAttachments(ddoc, path.join(__dirname, 'dist'));

module.exports = ddoc;