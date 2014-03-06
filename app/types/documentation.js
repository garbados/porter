angular
.module('app')
.config([
  'SchemasProvider',
  function (SchemasProvider) {
    var languages = [
      'CURL',
      'Python',
      'Ruby',
      'Node.js',
      'JavaScript',
      'PHP',
      'Java',
      'Java (Android)',
      'Objective-C'
    ].map(function (language) {
      return {
        label: language,
        type: 'textarea',
        model: language.toLowerCase().replace(/\s/g, '')
      };
    });

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
        }].concat(languages).concat([{
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
      ])
    });
  }
]);