module.exports = function (app) {
  app.factory('Schemas', [
    function () {
      // TODO add custom post types here
      var schemas = {
        posts: {
          fields: [
            {
              label: "Title",
              type: 'input',
              model: 'title'
            }, {
              label: "Slug",
              type: 'input',
              model: 'id'
            }, {
              label: "Body",
              type: 'textarea',
              model: 'text'
            }, {
              label: "Author",
              type: 'input',
              model: 'author'
            }, {
              label: "Category",
              type: 'input',
              model: 'category'
            }, {
              label: "Tags",
              type: 'input',
              model: 'tags'
            }
          ]
        },
        events: {
          fields: [
            {
              label: "Title",
              type: 'input',
              model: 'title'
            }, {
              label: "Slug",
              type: 'input',
              model: 'id'
            }, {
              label: "Body",
              type: 'textarea',
              model: 'text'
            }, {
              label: "Author",
              type: 'input',
              model: 'author'
            }, {
              label: "Category",
              type: 'input',
              model: 'category'
            }, {
              label: "Tags",
              type: 'input',
              model: 'tags'
            }, {
              label: "Start Date",
              type: 'datepicker',
              model: 'start_date'
            }, {
              label: "Start Time",
              type: 'timepicker',
              model: 'start_time'
            }, {
              label: "End Date",
              type: 'datepicker',
              model: 'end_date'
            }, {
              label: "End Time",
              type: 'timepicker',
              model: 'end_time'
            }
          ]
        }
      };

      return {
        all: function () {
          return Object.keys(schemas);
        },
        get: function (type) {
          return schemas[type] || schemas.posts;
        }
      };
    }
  ]);
};