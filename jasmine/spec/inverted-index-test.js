var index = new Index();
describe('Read book data', function() {
    it('Asserts that json file is not empty', function(done) {
        // Resolving the promise from the createIndex method 
        // Data is the a Javascript object with the Json data
        index.fetchJson('../jasmine/books.json').then(function(data) {
            expect(data).toBeDefined();
            expect(typeof data).toEqual('object');
            expect(data.length).toBeGreaterThan(0);
            done();
        });
    });
});


describe('Populate Index', function() {
    var results = [];
    beforeEach(function(done) {
        index.createIndex('../jasmine/books.json').then(function(data) {
            results = data;
            done();
        });
    });

    it('verifies that the index is created', function() {
        expect(results.length).toBeGreaterThan(0);
    });
    it('Ensures index is correct', function() {
        expect(results).toBeDefined();
        expect(Object.keys(results[0])).toEqual(['alice']);
        expect(results[0]['alice']).toEqual([0]);
    });

});
describe('Search index', function() {
    it('Verifies that search index returns a correct array ', function() {
        expect(index.searchIndex(['123', ' ', 'alice', 'wonderland', 'lord'])).toEqual([-1, 0, 0, 1]);
        expect(index.searchIndex('alice wonderland lord')).toEqual([0, 0, 1]);
        expect(index.searchIndex('people')).toEqual([-1]);
        expect(index.searchIndex('123')).toEqual([-1]);
        expect(index.searchIndex()).toEqual(null);
        expect(index.searchIndex(123)).toEqual(false);

    });
});
