var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");


//link new schema model to hub index.js
var Quote = require("./quote.js")
module.exports = {
  Quote: Quote
}
