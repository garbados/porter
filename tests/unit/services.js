describe('services: ', function() {

  beforeEach(angular.mock.module('services'));

  describe('autocomplete', function() {
    // TODO
  });

  describe('markdown filter', function() {
    var filter;

    beforeEach(inject(function ($filter) {
      filter = $filter('markdown');
    }))

    it('should exist', function () {
      expect(filter).not.toBe(null);
    });

    it('should convert text', function () {
      var html = "# hello";
      var md = '<h1 id="hello">hello</h1>';

      expect(filter(html)).toBe(md);
    });
  });

  describe('posts', function() {
    // body...
  });

  describe('pouch', function() {
    // body...
  });

  describe('schemas', function() {
    // body...
  });

  describe('summary', function() {
    // body...
  });

  describe('singularize', function() {
    // body...
  });

});