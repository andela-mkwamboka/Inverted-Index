function Index() {


  this.bks = [];
  var self = this;
  var index = [];
  var stop_words = ['a', 'about', ',', 'above', 'into', 'across', 'of', 'the', 'to', 'in', 'and', 'the', 'an'];

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

  this.getIndex = function() {
    // Javascript object from the Json file
    var books = self.bks;
    /*
     * 1. Looping through the Javascript Object getting the index of each book object
     * 2. Looping through the book to get book content
     * 3. Reformat string to lowercase and removing stop words [ Split returns array]
     */
    books.forEach(function(book, i) {
      for (var key in book) {
        book[key] = book[key].toLowerCase().split(' ').filter(function(element) {
          return stop_words.indexOf(element) == -1;
        });
        // Loop through the book content array to get individual word
        book[key].forEach(function(word) {

          var ok = false;
          // Checking if the index is empty
          if (index.length) {
            /* Executed on the second loop:
            * 1. Looping through the index 
            * 2. Checking if word exists 
            * 3. Concatinating index if it is unique
            */
            index.forEach(function(obj) {
              if (obj.hasOwnProperty(word)) {
                obj[word] = obj[word].concat(i).filter(function(v, ind, arr) {
                  return arr.indexOf(v) == ind;
                });
                ok = true;
              }
            });
          }
          // Executed on the first loop
          if (!ok) {
            index = index.concat({
              [word]: [].concat(i)
            });
          }
        });
      }

    });
    this.indexes = index;
    return this.indexes;
  };
};
var x = new Index();
x.createIndex('../jasmine/books.json')
  // Resolving the promise
  .then(function() {
    console.log(x.getIndex());
  });
