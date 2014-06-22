$(document).ready(function(){

  $.get('resources').done(function(resources){ 
    doTagLogic(resources);
    setAllResources(resources);
    doMasonry()
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


