angular
.module('app')
.config([
  'SchemasProvider',
  function (SchemasProvider) {
    SchemasProvider.addSchema('link', {
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
          label: "URL",
          type: 'input',
          model: 'href'
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
    });
  }
]);