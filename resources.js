
$(document).ready(function(){

  $.get('resources').done(function(resources){ 

    var tags = [];

    resources.forEach(function(resource){ 
     tags.push(resource.tags)
    })
    tags = _.flatten(tags)
    tags = _.uniq(tags)

    tags.forEach(function(tag) {
      $("#tags").append("<div ><button class=\"btn btn-md btn-primary tagSortButton\">"+tag+"</button></div>")
    })
    $(".tagSortButton").click(function(){
      var $text = $(this).text()
      //sort the collection, ie., only render the ones with the tag:
      for (i=0; i<resources.length; i++) {
        /*
          if the tags attribute, of the current model - which is an array - DOES NOT HAVE the
          text of the button that was just clicked on inside of it in any index position 
          -- remember the structure of the data [{name:"", ... tags: [] },{},{}]
          then the if statement is false and we DO NOT show the resource because the jquery will not run. 
          If we DO have the text of the button in the array of the tag, then we DO want the jquery to run, 
          which it will because it is truthy.
        */
        // when we want to put the button back in for the recipe maker
        //  <button class=\"pull-right btn btn-sm btn-primary\"><i class=\"fa fa-plus\"></i></button>

        console.warn("code commented out because it errors - no tags until the data in mongo has tags")
        // if (resources[i].tags.indexOf($text) != -1 && resources[i].approved === true) {
        //   $("#resources").html("<div class=\"col-md-6 masonry-item\"><div class=\"resource book\">  <h3><i class=\"fa fa-book\"></i>&nbsp;" + resources[i].name +"</h3> <p><em>"+resources[i].description+"</em></p> <p><a href="+ resources[i].url +"><i class=\"fa fa-external-link\"></i>&nbsp;"+ resources[i].name +"</a></p> </div> </div>")
        // }
      }
    })
    for (i=0; i<resources.length; i++) {
      if (resources[i].approved === true){
        $("#resources").append("<div class=\"col-md-6 masonry-item \"> <div class=\"resource book\"> <h3><i class=\"fa fa-book\"></i>&nbsp;" + resources[i].name +"</h3> <p><em>"+resources[i].description+"</em></p> <p><a href=\""+ resources[i].url +"\"><i class=\"fa fa-external-link\"></i>&nbsp;"+ resources[i].name +"</a></p> </div> </div>")
      }
    }
    var container = document.querySelector('#resources');
    var msnry = new Masonry( container, {
      itemSelector: '.masonry-item',
    });
  })


function submitResourceFormHandler() {
  //form submit logic
  $("#submitResource").click(function(e){
    e.preventDefault()
    var $resourceChoice = $("#selectResourceType option:selected").text();
    var $resourceName = $("#resourceName");
    var $resourceAddress = $("#resourceAddress");
    var $resourceDescription = $("#resourceDescription");
    var $resourceURL = $("#resourceURL");

    var resource = {
      name: $resourceName.val(),
      address: $resourceAddress.val(),
      description: $resourceDescription.val(),
      url: $resourceURL.val(),
      type: $resourceChoice
    };

    $resourceName.val('')
    $resourceAddress.val('')
    $resourceDescription.val('')
    $resourceURL.val('')
    resetResourceForm();

    console.log(resource);
    $.ajax({
      type: "POST",
      url: "resources",
      data: resource,
    }).done(function(){
      $("#restOfResourceForm").html("<div class=\"alert alert-success\"> Thanks! We'll review your resource shortly.</div>")
    }).fail(function(){
      $("#restOfResourceForm").html("<div class=\"alert alert-warning\"> Sorry - something went wrong and we did not receive your submission.</div>")
    });
  })
}

  //form showing logic
  $("#selectResourceType").change(function(){
    var $resourceChoice = $("#selectResourceType option:selected").text()
    if ($resourceChoice === "Book") {
      appendBookForm();
      submitResourceFormHandler();
    } else if ($resourceChoice === "Place") {
      appendPlaceForm();
      submitResourceFormHandler();
    } else if ($resourceChoice === "Type...") {
      resetResourceForm();
      submitResourceFormHandler();
    } else if ($resourceChoice === "Network of People") {
      appendNetworkForm();
      submitResourceFormHandler();
    } else if ($resourceChoice === "Curriculum") {
      appendCurriculumForm();
      submitResourceFormHandler();
    }
  })


  // var handler = StripeCheckout.configure({
  //   key: 'pk_live_uAY8LydDEydIS3oH4ZmaBpnw',
  //   token: function(token) {
  //     // Use the token to create the charge with a server-side script.
  //     // You can access the token ID with `token.id`
  //   }
  // });

  // document.getElementById('donateButton').addEventListener('click', function(e) {
  //   // Open Checkout with further options
  //   var amount = $("#donateInput").val()
  //   handler.open({
  //     name: 'Seattle Homeschooling',
  //     description: '~one time donation~',
  //     amount: amount * 100
  //   });
  //   e.preventDefault();
  // });



})


