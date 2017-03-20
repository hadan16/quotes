// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');
var Quote = db.Quote;
Quote.create()


var quotes_list = [
  {
    phrase: "Your hustle muscle is the most important thing. If you're not hustling, you're worrying.",
    author: "Jamie Foxx",
  },
  {
    phrase: "Don't let the noise of others' opinions drown out your inner voice. Have the courage to follow your own heart and intuition.",
    author: "Steve Jobs",
  },
  {
    phrase: "Suffer the pain of discipline or suffer the pain of regret.",
    author: "Jim Rohn",
  },
  {
    phrase: "There, in the stillness, a treasure trove of beauty.",
    author: "Dewitt Jones",
  },
  {
    phrase: "When good things happen to us, we have a way of baking them into our expectations very quickly, and taking them for granted. In this way, the pursuit of happiness becomes the source of our unhappiness.",
    author: "Dan Harris",
  },
  {
    phrase: "If we could see the miracle of a single flower, our whole life would change. Assignment: today, look for the miracles and really see them.",
    author: "Jack Kornfield",
  },
  {
    phrase: "There's nothing wrong with change, as long as its in the right direction.",
    author: "Unknown",
  },
  {
    phrase: "Decide that you want it more than you are afraid of it.",
    author: "Bill Cosby",
  },
  {
    phrase: "Fall forward.",
    author: "Denzel Washington",
  },

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
