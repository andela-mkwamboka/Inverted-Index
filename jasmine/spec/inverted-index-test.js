describe('Inverted Index Tests', function() {
  var index = new Index();
  //Before each runs before each suite
  beforeEach(function(done) {
  	// Resolving the promise from the createIndex method 
  	// Data is the a Javascript object with the Json data
    index.createIndex('../jasmine/books.json').then(function(data) {
      index.results = data;
      done();
    });
  });

  describe('Read book data', function() {
    it('Asserts that json file is not empty', function() {
      var jsonData = index.results;
      expect(jsonData).toBeDefined();
      expect(typeof jsonData).toEqual('object');
      expect(jsonData.length).not.toEqual(0);

    });
  });
  describe('Populate Index', function() {
    it('verifies that the index is created', function() {
      expect(index.getIndex().length).toBeGreaterThan(0);
    });
    it('Ensures index is correct', function() {
    	expect(index.getIndex()).toBeDefined();
    	expect(Object.keys(index.getIndex()[0])).toEqual(['alice']);
    	expect(index.getIndex()[0]['alice']).toEqual([0]);
    });

  });
  describe('Search index', function() {
    it('Verifies that search index returns an array ', function() {
      expect(index.searchIndex([' ', 'alice', 'wonderland', 'lord', 'priest'])).toEqual([0, 0, 1, -1]);
    });
  });

});
