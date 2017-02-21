// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');
var Quote = db.Quote;
Quote.create()


var quotes_list = [
  {
    phrase: "To Kill a Mockingbird",
    author: "Harper Lee",
    topic: "Life"
  },
  {
    phrase: "To Kill a Mockingbird 2",
    author: "Harper Lee 2",
    topic: "Life 2"
  },
  {
    phrase: "To Kill a Mockingbird 3",
    author: "Harper Lee 3",
    topic: "Life 3"
  }
];

// remove all records that match {} -- which means remove ALL records
db.Quote.remove({}, function(err, quotes){
  if(err) {
    console.log('Error occurred in remove', err);
  } else {
    console.log('removed all quotes');

    // create new records based on the array quotes_list
    db.Quote.create(quotes_list, function(err, quotes){
      if (err) { return console.log('err', err); }
      console.log("created", quotes.length, "quotes");
      process.exit();
    });
  }
});
