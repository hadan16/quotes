
// wait for DOM to load before running JS
$(document).on('ready', function() {
    // js link check
    console.log("app.js linked.");

    //focus on first form field
    $('#create-quote').find('input').first().focus();



    $(function(){
     $.ajax({
       method: 'GET',
       url: `http://localhost:3000/api/quotes`,
       dataType: 'json',
       success: onSuccess
     });
    });


// ajax data set in global scope
var data;


// function that runs after ajax call
function onSuccess(data){

    // Loop through quotes api and append to quoteTarget
    var render = function(){
      data.quotes.forEach(function(index){
        console.log(index.phrase);
        $("#quoteTarget").append(

            `<div>
              <h3>${index.phrase}</h3>
              <h4>${index.author}</h4>
            </div>
            <!-- trash can icon to delete quote, void() prevents page refresh on click -->
                 <a href="javascript:void(0)" class="delete-quote">
                  <span class="glyphicon glyphicon-trash"></span>
                </a>

            <hr>`
        )
      })
    };

    render(); //cant get this to work globally, using location reload instead for create new quote post

};//end onSuccess function





// targeting form to create new quote
  var $createQuote = $('#create-quote');

// listen for submit event on form
  $createQuote.on('submit', function (event) {
    event.preventDefault();

    // serialze form data
    var newQuote = $(this).serialize();

    // POST request to create new quote
    $.ajax({
      method: "POST", //hit up the api via a post method
      url: `http://localhost:3000/api/quotes`, //here is the api url
      data: newQuote, //grab the serialized data (
                      // ie: task=taskentry1&description=descentry2)
    });

    // refreshes page after database updates. cant figure out how to render with a global function
    // render();
    location.reload();
  });





// for delete: click event on `.delete-todo` button
  $('#quoteTarget').on('click', '.delete-quote', function (event) {
    event.preventDefault();

    // find the todo's id (stored in HTML as `data-id`)
    var quoteId = $(this).closest('.quote').attr('data-id');

    // find the todo to delete by its id
    var quote = data.quotes.filter(function (quote) {
      return quote._id == quoteId;
    })[0];

    // DELETE request to delete todo
    $.ajax({
      type: 'DELETE',
      url: `http://localhost:3000/api/quotes` + '/' + quoteId,
      success: function onDeleteSuccess(data) {
        // remove deleted todo from all todos
        allQuotes.splice(allQuotes.indexOf(quoteToDelete), 1);

        // render all todos to view
        // render();
        location.reload();
      }
    });
  });

















// handleSuccess and handleError functions for ajax calls
function handleSuccess(json) {
  allQuotes = json;
  render();
}

function handleError(e) {
  console.log('uh oh');
  $('#quoteTarget').text('Failed to load quotes, is the server working?');
}



}); // end document.ready check
