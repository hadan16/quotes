
// wait for DOM to load before running JS
$(document).on('ready', function() {
    // js link check
    console.log("app.js linked.");

    //for use with helper function below used to reder all posts to view
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
function onSuccess(responseData){
    // console.log(responseData);
    data = responseData;

    // IS DATA FROM THE DATABASE APPEARING IN THE DOM??
    $("body").text(data.quotes[0].phrase);
};//end onSuccess function



// helper function to render all posts to view. note: we empty and re-render the collection each time our post data changes
function render () {
  // empty existing posts from view
  $quotesList.empty();

  // pass `allQuotes` into the template function
  var quotesHtml = getAllQuotesHtml(allQuotes);

  // append html to the view
  $quotesList.append(quotesHtml);
};



// handleSuccess and handleError functions for ajax calls
function handleSuccess(json) {
  allQuotes = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#quoteTarget').text('Failed to load quotes, is the server working?');
}
