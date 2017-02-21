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


 // get all todos

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



 /**********
  * SERVER *
  **********/

 // listen on port 3000
 app.listen(process.env.PORT || 3000, function () {
   console.log('Express server is up and running on http://localhost:3000/');
 });