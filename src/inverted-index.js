function Index() {
    this.bookArray = [];
    var self = this;

    var index = [];
    var stop_words = ['a', 'about', ',', 'above', 'into', 'across', 'of', 'the',
        'to', 'in', 'and', 'the', 'an', ' ', '.'
    ];

    this.fetchJson = function(filepath) {
        // Fetch returns a promise
        // 1. Takes in a file path
        // 2. Uses fetch API to request for the json file
        // 3. Uses Json method to convert result to a javascript object

        return fetch(filepath)
            .then(function(response) {
                // Converting raw data to json
                if (response.status === 200) {
                    return response.json();
                }
            }).then(function(jsonData) {
                // Returns a javascript object
                self.bookArray = jsonData;
                return self.bookArray;
            }).catch(function(err) {
                // Return error if promise is rejected
                return err;
            });
    };

    this.createIndex = function(filepath) {
        // Javascript object from the Json file
        return this.fetchJson(filepath)
            .then(function(books) {
                // 1. Looping through the Javascript Object getting the index of each book object
                // 2. Looping through the book to get book content
                // 3. Reformat string to lowercase and removing stop words [ Split returns array]

                books.forEach(function(book, bookIndex) {
                    for (var key in book) {
                        var bookContent = book[key]
                            .toLowerCase()
                            .split(' ')
                            .filter(function(element) {
                                return stop_words.indexOf(element) === -1;
                            });
                        // Loop through the book content array to get individual word
                        bookContent.forEach(function(word) {
                            var ok = false;
                            // Checking if the index is empty
                            if (index.length) {
                                // Executed on the second loop:
                                // 1. Looping through the index
                                // 2. Checking if word exists
                                // 3. Concatinating index if isn't found
                                index.forEach(function(obj) {
                                    if (obj.hasOwnProperty(word)) {
                                        if (obj[word].indexOf(bookIndex) === -1) {
                                            obj[word] = obj[word].concat(bookIndex);
                                        }
                                        ok = true;
                                    }
                                });
                            }
                            // Executed on the first loop
                            if (!ok) {

                                index = index.concat({
                                    // Concat to a new empty Array
                                    [word]: [].concat(bookIndex)
                                });
                            }
                        });
                    }
                });
                return index;
            }).catch(function(error) {
                return error;
            });
    };

    this.getIndex = function() {
        return index;
    };

    this.searchIndex = function() {
        var theIndex = this.getIndex();
        var results = [];
        // Checking if arguments have been passed
        if (arguments.length) {
            //  Format
            var format = function(word) {
                return word.toLowerCase().split(' ').filter(function(element) {
                    return stop_words.indexOf(element) === -1;
                });
            };
            // Returning Index of search terms
            var search = function(oneWord) {
                found = false;
                if (theIndex && oneWord) {
                    theIndex.forEach(function(indexObject) {
                        if (indexObject.hasOwnProperty(oneWord)) {
                            found = true;
                            results = results.concat(indexObject[oneWord]);
                        }
                    });

                    if (!found) {
                        results.push(-1);
                    }
                }
            };

            // 1. Loop through the args to get each term
            // 2. Check the type of the term
            // 3. If a string
            // 4. Split the term in ' '
            // 5. Loop through the splitted terms
            // 6. Search for the term
            // 7. Else if array: 
            // 8. loop through the array, toLowerCase() search

            var args = Array.from(arguments);
            args.forEach(function(terms) {
                if (typeof terms === 'string') {
                    //  Format word to remove stop word and rswitch to lowercase
                    var newTerm = format(terms);

                    for (var word in newTerm) {
                        search(newTerm[word]);
                    }
                } else if (Array.isArray(terms)) {
                    // Loop through the array
                    terms.forEach(function(element) {
                        //  Format word to remove stop word and switch to lowercase
                        element = format(element);
                        // Search word
                        element.forEach(function(oneWord) {
                            search(oneWord);
                        });
                    });
                } else {
                    // Invalid search term
                    results = false;
                }
            });
            console.log(results);
            return results;
        } else {
            // You need to search for a term
            return null;
        }
    };
}
