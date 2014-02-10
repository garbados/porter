angular
.module('app')
.config([
  'SchemasProvider',
  function (SchemasProvider) {
    SchemasProvider.addSchema('being', {
      primary: 'author',
      fields: [
        {
          label: "Name",
          type: 'input',
          model: 'author'
        }, {
          label: "Slug",
          type: 'input',
          model: 'id'
        }, {
          label: "Bio",
          type: 'textarea',
          model: 'text'
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