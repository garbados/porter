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
    from: '*',
    to: '/*'
  }]
};

couchapp.loadAttachments(ddoc, path.join(__dirname, 'dist'));

module.exports = ddoc;