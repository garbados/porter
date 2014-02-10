angular
.module('app')
.config([
  'SchemasProvider',
  function (SchemasProvider) {
    SchemasProvider.addSchema('event', {
      primary: 'title',
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
    });
  }
]);