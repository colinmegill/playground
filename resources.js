
$(document).ready(function(){

  $.get('resources').done(function(resources){ 


    var tags = [];


    resources.forEach(function(resource){ 
     tags.push(resource.tags)
    })
    tags = _.flatten(tags)
    tags = _.uniq(tags)
    console.log(tags)

    tags.forEach(function(tag) {
      $("#tags").append("<div ><button class=\"btn btn-xs btn-primary tagSortButton\">"+tag+"</button></div>")
    })

    $(".tagSortButton").click(function(){
      
      var $text = $(this).text()
      $("#resources").html("<h3> you just clicked " + $text + " </h3>" )

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
        if (resources[i].tags.indexOf($text) != -1 && resources[i].approved === true) {
          $("#resources").append("<div class=\"col-md-6 \"> <div class=\"resource book\"> <button class=\"pull-right btn btn-sm btn-primary\"><i class=\"fa fa-plus\"></i></button> <h3><i class=\"fa fa-book\"></i>&nbsp;" + resources[i].name +"</h3> <p><em>"+resources[i].description+"</em></p> <p><a href="+ resources[i].url +"><i class=\"fa fa-external-link\"></i>&nbsp;"+ resources[i].name +"</a></p> </div> </div>")
        }
      }
    })


    for (i=0; i<resources.length; i++) {
      if (resources[i].approved === true){
        $("#resources").append("<div class=\"col-md-6 \"> <div class=\"resource book\"> <button class=\"pull-right btn btn-sm btn-primary\"><i class=\"fa fa-plus\"></i></button> <h3><i class=\"fa fa-book\"></i>&nbsp;" + resources[i].name +"</h3> <p><em>"+resources[i].description+"</em></p> <p><a href="+ resources[i].url +"><i class=\"fa fa-external-link\"></i>&nbsp;"+ resources[i].name +"</a></p> </div> </div>")
      
      }
    }

  })


  $("#submitResource").click(function(e){
    e.preventDefault()
    var $resourceName = $("#resourceName")
    var $resourceAddress = $("#resourceAddress")
    var $resourceDescription = $("#resourceDescription")
    var $resourceURL = $("#resourceURL")

    var resource = {
      name: $resourceName.val(),
      address: $resourceAddress.val(),
      description: $resourceDescription.val(),
      url: $resourceURL.val()
    };

    $resourceName.val('')
    $resourceAddress.val('')
    $resourceDescription.val('')
    $resourceURL.val('')


    // console.log(resource);
    $.ajax({
      type: "POST",
      url: "resources",
      data: resource,
    });
  })


})


