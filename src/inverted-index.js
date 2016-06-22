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
        if(response.status == 200) {
          return response.json();
        } else {
          throw response;
        }
      }).then(function(jsonData) {
        //Returns a javascript object
        self.bks = jsonData;
        return self.bks;
      }).catch(function() {
        // Log error if promise is rejected
        console.log('File cannot be read');
        // return err;÷
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
        var bookContent = book[key].toLowerCase().split(' ').filter(function(element) {
          return stop_words.indexOf(element) == -1;
        });
        // Loop through the book content array to get individual word
        bookContent.forEach(function(word) {

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
              // Concat to a new empty Array
              [word]: [].concat(i)
            });
          }
        });
      }

    });
    this.indexes = index;
    return this.indexes;
  };
  this.searchIndex = function() {
    var theIndex = this.indexes;
    var results = [];
    // Checking if arguments have been passed
    if (arguments.length) {
      //  Format
      var format = function(word){
        return word.toLowerCase().split(' ').filter(function(element) {
              return stop_words.indexOf(element) == -1;
            });
      };
      // Returning Index of search terms
      var search = function(index, oneWord) {
        found = false;
        if (theIndex && oneWord) {
          theIndex.forEach(function(value) {
            if (value.hasOwnProperty(oneWord)) {
              found = true;
              results.push(...value[oneWord]);
            }
          });
          if (!found) {
            results.push(-1);
          }
        }
      };
      /*
       * 1. Loop through the args to get each term
       * 2. Check the type of the term
       * 3. If a string
       * 4. Split the term in ' '
       * 5. Loop through the splitted terms
       * 6. Search for the term
       * 7. Else if array: 
       * 8. loop through the array, toLowerCase() search
       */
      var args = Array.from(arguments);
      args.forEach(function(terms) {
        if (typeof terms === 'string') {
          //  Format word to remove stop word and rswitch to lowercase
          var newTerm = format(terms);
      
          for (var word in newTerm) {
            var findWord = newTerm[word].replace(/[.,?\s]/g, '');
            search(theIndex, findWord);
          }
          // console.log(theIndex);
        } else if (Array.isArray(terms)) {
          // Loop through the array
          terms.forEach(function(element) {
            //  Format word to remove stop word and switch to lowercase
            element = format(element);
            // Search word
            element.forEach(function(oneWord) {
              search(theIndex, oneWord);
            }); 
          });
        } else {
          console.log('Invalid search term');
        }
      });
      return results;
    }else{
      console.log('You need to search for a term');
    }
  };
}
var x = new Index();
x.createIndex('../jasmine/books.json')
  // Resolving the promise
  .then(function() {
    x.getIndex();
    x.searchIndex();
  });
