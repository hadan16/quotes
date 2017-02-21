var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  phrase: String,
  author: String,
  topic: String
});

var Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;
