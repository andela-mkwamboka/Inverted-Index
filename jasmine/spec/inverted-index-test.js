describe('Read book data', function() {
  it('Asserts that json file is not empty', function() {
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
    expect(index.searchIndex('alice')).toEqual([0]);
  });

});
describe('Search index', function() {
  it('Verifies that search index returns an array ', function() {
      expect(index.searchIndex([' ', 'alice', 'wonderland', 'lord', 'priest'])).toEqual([0, 0, 1, -1]);
  })
});
