angular
.module('app')
.config([
  'SchemasProvider',
  function (SchemasProvider) {
    SchemasProvider.addSchema('sitemap', {
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
        }
      ]
    });
  }
]);