
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
    console.log(data.quotes.length);


    // BEGIN LOOPING

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
  // for (var i=0; i<data.quotes.length; i++){
  //
  //
  //   phrase = data.quotes[i].phrase;
  //   author = data.quotes[i].author;
  //
  //   var varNewSection = `<div class="row result">
  //
  //           <div class="song-artist">
  //             <h3 id="artist-${[i]}">Quote</h3>
  //             <h4 id="track-${[i]}">Author</h4>
  //           </div>
  //
  //       </div>  <!-- -row-result close -->
  //
  //       <hr>`;
  //
  //   function appendHtml(){
  //   $(".container").append(varNewSection);
  //   }
  //   appendHtml();
  //
  //   function appendPhrase(){
  //     $(`#artist-${i}`).text(phrase);
  //   };
  //   appendPhrase();
  //
  //   function appendAuthor(){
  //     $(`#track-${i}`).text(author);
  //   };
  //   appendAuthor();


   //end loop










};//end onSuccess function



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
