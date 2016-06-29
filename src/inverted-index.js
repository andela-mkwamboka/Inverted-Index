function Index () {
  this.bookArray = [];
  var self = this;

  var index = [];
  var stop_words = [ 'a', 'about', 'above', 'into', 'across', 'of', 'the',
                    'to', 'in', 'and', 'the', 'an'];

  // Function format
  var format = function (word) {
    return word.toLowerCase()
           .replace(/[,.?!]/g,'')
           .split(' ')
           .filter(function (element) {
              return stop_words.indexOf(element) === -1;
           });
  };

  this.fetchJSON = function (filepath) {
    // Fetch returns a promise
    // !. Takes in file path
    // 2.Uses fetch API to request for the data in the json file
    // 3. Uses Json method to convert result to a javascript object
    
    return fetch(filepath)
      .then(function (response) {
        // Convert raw data to json
        if (response.status === 200) {
            return response.json();
        }
      }).then(function (data) {
        // Return a javascript object
        self.bookArray = data;
        return self.bookArray;
      }).catch(function (err) {
        // Return error if the promise is rejected
        return err;
      });
  };

  this.createIndex = function (filepath) {
    // Resolving the promise and returning books a javascript object from the Json file
    return this.fetchJSON(filepath)
      .then(function (books) {
        // 1. Loop through the Javascript Object getting the index of each book object
        // 2. Loop through the book to get book content
        // 3. Reformat string to lowercase and removing stop words [ Split returns array]
        books.forEach(function (book, bookIndex) {
          for (var key in book) {
            var bookContent = format(book[key]);
            // Loop through the book content array to get individual word
            bookContent.forEach(function (word){
              var ok = false;

              // Checking if the index is empty
              if (index.length) {
                // Excuted on the second loop:
                // 1.Looping through thr index
                // 2.Checking if the word exists
                // 3.Concate index if it isnt found
                index.forEach(function (obj) {
                  if (obj.hasOwnProperty(word)) {
                    if (obj[word].indexOf(bookIndex) === -1) {
                      obj[word].push(bookIndex);
                    }
                    ok = true;
                  }
                });
              }
              // Executed on the first loop
              if (!ok) {
                index.push({
                  [word]: [].concat(bookIndex)
                });
              }
            });
          }
        });
        return index;
      }).catch(function (error) {
        return error;
      });
  };

  this.getIndex = function () {
    return index;
  }

  this.searchIndex = function () {
    var theIndex = this.getIndex();
    var results = {};
    // Checking if arguments are passed
    if(arguments.length) {
      // Retutn Index of search terms
      var search = function (oneWord) {
        var found = false;
        if (theIndex && oneWord) {
          theIndex.forEach(function (indexObject) {
            if(indexObject.hasOwnProperty(oneWord)) {
              results[oneWord] = indexObject[oneWord];
              found = true;
            }
          });
          if (!found) {
            results[oneWord] = null;
          }
        }
      };
      // 1.Loop through the args to get each term
      // 2.Check the type if the term
      // 3.If string:
      // 4.Format to remove stop words and punctuation marks
      // 5.Split and loop through
      // 6.Search for term in index
      // 7.Else if array:
      // 8.Loop through array format and search
      // 9.Else: return false
      // 
      var args = Array.from(arguments);
      args.forEach(function (terms) {
        if (typeof terms === 'string') {
          var newTerm = format(terms);
          for(var word in newTerm){
            search(newTerm[word]);
          }
        } else if (Array.isArray(terms)) {
          terms.forEach(function (element) {
            element = format(element);
            element.forEach(function (oneWord) {
              search(oneWord);
            });
          });
        } else {
          results = false;
        }
      });
      return results;
    } else {
      // If no arguments passed
      return null;
    }
  };
}