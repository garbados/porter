angular
.module('services')
.provider('Schemas', function () {
  var schemas = {};
  
  this.addSchema = function (name, schema) {
    schema.type = name;
    schemas[name] = schema;
  };

  this.$get = function () {
    return {
      all: function () {
        return Object.keys(schemas);
      },
      get: function (type) {
        return schemas[type] || schemas.posts;
      }
    };
  };
});