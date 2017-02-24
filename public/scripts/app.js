
// wait for DOM to load before running JS
$(document).on('ready', function() {
    // js link check
    console.log("app.js linked.");

    //focus on first form field
    $('#create-quote').find('input').first().focus();

//SHOW ALL QUOTES
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

              `
                <h3>${index.phrase}</h3>
                <h4>${index.author}</h4>
                <a href="javascript:void(0)" class="delete-quote">
                  <span class="glyphicon glyphicon-trash" value="${index._id}">
                </a>
                <a href="javascript:void(0)" class="update-quote">
                  <span class="glyphicon glyphicon-pencil" value="${index._id}">
                </a>

                <div>
                  <br>
                  <form class="form-toggle" id="update-quote-form">
                    <div class="form-group">
                      <input type="text" name="phrase" class="form-control" placeholder="${index.phrase}">
                    </div>
                    <div class="form-group">
                      <input type="text" name="author" class="form-control" placeholder="${index.author}">
                    </div>
                    <div class="form-group">
                      <input class="temp" type="submit" value="submit change" name="${index._id}">
                    </div>
                  </form>
                </div>

                <hr>
              `
          )
        })
      };

        render(); //cant get this to work globally, using location reload instead for create new quote post

    };//end onSuccess function


//CREATE QUOTE
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



//DELETE QUOTE
  //hover instead of click, because would require two clicks
  $('#quoteTarget').hover(function() {
      $('.glyphicon-trash').unbind().click(function() { //unbind because it mysteriously returned multiple attributes, only needed one
        var quoteId = $(this).attr('value'); //set the trash can or buttons value (set to _id in html) to = quoteId
        console.log(quoteId);

        //  this console.log below took forever to figure out
        //  console.log($(this).attr('value'));

          // DELETE request to delete quote
          $.ajax({
            type: 'DELETE',
            url: `http://localhost:3000/api/quotes` + '/' + quoteId,
            success: function () {
              // render (render function requires handlebars)all quote to view
              location.reload();
            }
          });

      });
  });


//UPDATE QUOTE
    //grab the update form's id, set to quoteId2 for the ajax url call below
    $('#quoteTarget').hover(function() {
        $('.temp').unbind().click(function() { //unbind because it mysteriousuly returned multiple attributes, only needed one
        event.preventDefault();
        var quoteId2 = $(this).attr('name'); //set the trash can or buttons value (set to _id in html) to = quoteId
        console.log(quoteId2);

        // serialze form data
        // source for grabbing value of select input field from multiple input fields: http://stackoverflow.com/questions/27704828/jquery-click-submit-button-get-form-value
        var p = $(this).closest("form").find("input[name='phrase']").val();
        var a = $(this).closest("form").find("input[name='author']").val();

        // source for replacing spaces with '&': http://stackoverflow.com/questions/4932898/jquery-replace-spaces-in-word
        var pSerialize = p;
        pSerialize = pSerialize.replace(/ /g, '+');
        var aSerialize = a;
        aSerialize = aSerialize.replace(/ /g, '+');

        var updatedQuote = `phrase=${pSerialize}&author=${aSerialize}`
        console.log(updatedQuote);

        // PUT request to update quote
        $.ajax({
          type: 'PUT',
          url: `http://localhost:3000/api/quotes` + '/' + quoteId2,
          data: updatedQuote,
          success: function onUpdateSuccess() {

            // render all quotes to view
            location.reload();

          }
        });


        });

    });

// SUCCESS & ERROR HANDLING
// handleSuccess and handleError functions for ajax calls
  function handleSuccess(json) {
    allQuotes = json;
    render();
  }

  function handleError(e) {
    console.log('uh oh');
    $('#quoteTarget').text('Failed to load quotes, is the server working?');
  }



// NEXT STEPS: Toggling select edit fields.. need to apply unique class using existing forEach function to each form
// and then targeting it to toggle witch the click
  // $('#quoteTarget').hover(function() {
  //     $('.glyphicon-trash').unbind().click(function() { //unbind because it mysteriousuly returned multiple attributes, only needed one
  //       var quoteClass = $(this).attr('class'); //set the trash can or buttons value (set to _id in html) to = quoteId
  //       console.log(quoteClass);
  //       console.log("quoteClass");
  //
  //     });
  // });
  //





}); // end document.ready check
