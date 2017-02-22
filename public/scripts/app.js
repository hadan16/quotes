
// wait for DOM to load before running JS
$(document).on('ready', function() {
    // js link check
    console.log("app.js linked.");

    //for use with helper function below used to render all posts to view
    $quotesList = $('#quoteTarget');

    $(function(){
     $.ajax({
       method: 'GET',
       url: `http://localhost:3000/api/quotes`,
       dataType: 'json',
       success: onSuccess
     });
    });



}); // end document.ready check



// ajax data set in global scope
var data;



// function that runs after ajax call
function onSuccess(data){

    // Loop through todos api and append to quoteTarget
    data.quotes.forEach(function(index){
      console.log(index.phrase);
      $("#quoteTarget").append(

          `<div class="row result">

                  <div class="song-artist">
                    <h3>${index.phrase}</h3>
                    <h4>${index.author}</h4>
                  </div>

          </div>  <!-- -row-result close -->

          <hr>`
      )
    })

};//end onSuccess function

// targerting form to create new quote
  var $createQuote = $('#create-quote');

// listen for submit event on form
  $createQuote.on('submit', function (event) {
    event.preventDefault();

    // serialze form data
    var newQuote = $(this).serialize();

    // POST request to create new todo
    $.ajax({
      method: "POST", //hit up the api via a post method
      url: `http://localhost:3000/api/quotes`, //here is the api url
      data: newQuote, //grab the newTodo data (serialized: task=taskentry1&description=descentry2)

    // reset the form
    // $createTodo[0].reset();
    // $createTodo.find('input').first().focus();
    });
  });

// // helper function to render all posts to view. note: we empty and re-render the collection each time our post data changes
// function render () {
//   // empty existing posts from view
//   $quotesList.empty();
//
//   // pass `allQuotes` into the template function
//   var quotesHtml = getAllQuotesHtml(allQuotes);
//
//   // append html to the view
//   $quotesList.append(quotesHtml);
// };



// handleSuccess and handleError functions for ajax calls
function handleSuccess(json) {
  allQuotes = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#quoteTarget').text('Failed to load quotes, is the server working?');
}
