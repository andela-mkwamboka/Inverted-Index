function Index() {

  this.bks = [];
  var self = this;
  this.createIndex = function(filepath) {
    /* Fetch returns a promise
     * 1. Takes in a file path
     * 2. Uses fetch API to request for the json file
     * 3. Uses Json method to convert result to a javascript object
     */
    return fetch(filepath)
      .then(function(response) {
        //Converting raw data to json
        return response.json();
      }).then(function(jsonData) {
        //Returns a javascript object
        self.bks = jsonData;
        return self.bks;
      }).catch(function(err) {
        // Log error if promise is rejected
        console.log('File cannot be read');
      });
  };
};
var x = new Index();
x.createIndex('../jasmine/books.json')
  // Resolving the promise
  .then(function(data) {
    console.log(data);
  });
