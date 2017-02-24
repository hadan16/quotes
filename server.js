// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');
var Quote = db.Quote;

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */


 // get all quotes

 app.get('/api/quotes', function index(req, res) {
   // find all quotes in db
   db.Quote.find({}, function (err, allQuotes) {
     if (err) {
       res.status(500).json({ error: err.message });
     } else {
       res.json({ quotes: allQuotes });
     }
   });
 });

 // create new quote
 app.post('/api/quotes', function create(req, res) {
   // create new quote with form data (`req.body`)
   var newQuote = new db.Quote(req.body);

   // save new quote in db
   newQuote.save(function(err, savedQuote) {
     if (err) {
       res.status(500).json({ error: err.message });
     } else {
       res.json(savedQuote);
     }
   });
 });

 // get one todo
app.get('/api/quotes/:id', function show(req, res) {
  // get todo id from url params (`req.params`)
  var quoteId = req.params.id;

  // find todo in db by id
  db.Quote.findOne({ _id: quoteId }, function(err, foundQuote) {
    if (err) {
      if (err.name === "CastError") {
        res.status(404).json({ error: "Nothing found by this ID." });
      } else {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.json(foundQuote);
    }
  });
});



  // update todo
 app.put('/api/quotes/:id', function update(req, res) {
   // get todo id from url params (`req.params`)
   var quoteId = req.params.id;

   // find todo in db by id
   db.Quote.findOne({ _id: quoteId }, function(err, foundQuote) {
     if (err) {
       res.status(500).json({ error: err.message });
     } else {
       // update the todos's attributes
       foundQuote.phrase = req.body.phrase;
       foundQuote.author = req.body.author;
       foundQuote.topic = req.body.topic;

       // save updated todo in db
       foundQuote.save(function(err, savedQuote) {
         if (err) {
           res.status(500).json({ error: err.message });
         } else {
           res.json(savedQuote);
         }
       });
     }
   });
 });


  // delete quote
  app.delete('/api/quotes/:id', function destroy(req, res) {
    // get todo id from url params (`req.params`)
    var quoteId = req.params.id;
    // find todo in db by id and remove
    db.Quote.findOneAndRemove({ _id: quoteId }, function (err, deletedQuote) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(deletedQuote);
      }
    });
  });


 /**********
  * SERVER *
  **********/

 // listen on port 3000
 app.listen(process.env.PORT || 3000, function () {
   console.log('Express server is up and running on http://localhost:3000/');
 });
