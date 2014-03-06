angular
.module('app')
.config([
  'SchemasProvider',
  function (SchemasProvider) {
    SchemasProvider.addSchema('documentation', {
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
        },{
          label:"CURL",
          type:'textarea',
          model:'curl'
        }, {
          label:"Python",
          type:'textarea',
          model:'python'
        }, {
          label:"Ruby",
          type:'textarea',
          model:'ruby'
        }, {
          label:"Node.js",
          type:'textarea',
          model:'nodejs'
        }, {
          label:"JavaScript",
          type:'textarea',
          model:'javascript'
        }, {
          label:"PHP",
          type:'textarea',
          model:'php'
        }, {
          label:"Java",
          type:'textarea',
          model:'java'
        }, {
          label:"Java (Android)",
          type:'textarea',
          model:'android'
        }, {
          label:"Objective-C",
          type:'textarea',
          model:'objective_c'
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