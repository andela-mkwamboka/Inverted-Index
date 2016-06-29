var index = new Index();
describe('Read book data', function() {

  it('Asserts that JSON file is not empty', function(done) {
    // Resolve the promise from fetchJSON method
    // Data is the Javascript object with JSON data
    index.fetchJSON('../jasmine/books.json').then(function (data) {
      expect(data).toBeDefined();
      expect(typeof data).toEqual('object');
      expect(data.length).toBeGreaterThan(0);
      done();
    });
  });
  
});

// describe('Tesing the index', function() {

//   var results = [];
//   beforeEach(function(done) {
//     index.createIndex('../jasmine/books.json').then(function (data){
//       results = data;
//       done();
//     });
//   });
  
//   describe('Populate Index', function() {

//     it('Verifies that the index is created', function() {
//       expect(results.length).toBeGreaterThan(0);
//     });

//     it('Ensures index is correct', function() {
//       expect(results).toBeDefined();
//       expect(Object.keys(results[0])).toEqual(['alice']);
//       expect(results[0]['alice']).toEqual([ 0, 1]);
//     });

//   });

//   describe('Search Index', function() {

//     it('Return null if nothing is searched', function() {
//       expect(index.searchIndex()).toEqual(null);
//     });

//     it('Ignore punctuations and space', function() {
//       expect(index.searchIndex('alice wonderland lord?')).toEqual({ alice: [ 0, 1 ], wonderland: [ 0 ], lord: [ 1 ] });
//       expect(index.searchIndex(['123', ' ', 'alice', 'wonderland', 'lord'])).toEqual({ 123: null, alice: [ 0, 1 ], wonderland: [ 0 ], lord: [ 1 ] });
//     });

//     it('Should return false when term searched isn\'t a string or an array of string', function() {
//       expect(index.searchIndex(123)).toEqual(false);
//     });

//     it('Returns the right index position of items searched', function() {
//       expect(index.searchIndex('ALice')).toEqual({ alice: [ 0, 1 ]})
//       expect(index.searchIndex('Alice Wonderland lord')).toEqual({ alice: [ 0, 1 ], wonderland: [ 0 ], lord: [ 1 ] });
//     });

//     it('Should return index when an array is searched', function() {
//       expect(index.searchIndex(['Alice', 'Wonderland', 'Lord'])).toEqual({ alice: [ 0, 1 ], wonderland: [ 0 ], lord: [ 1 ] });
//     });

//     it('Return index when a term that contains both string and array is searched', function() {
//       expect(index.searchIndex(['Alice' , 'Rough'] , 'Fish Working')).toEqual({ alice: [ 0, 1 ], rough: null, fish: null, working: null})
//     });

//     it('Returns null when a non-existing term is searched', function() {
//       expect(index.searchIndex('Gold teeth Alice')).toEqual({ gold: null, teeth: null, alice: [ 0, 1 ] });
//       expect(index.searchIndex('123')).toEqual({ 123: null });
//     });

//   });

// });