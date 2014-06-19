
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
      $("#resources").html("")

      //sort the collection, ie., only render the ones with the tag:
      $(this).text()

    // for (i=0; i<resources.length; i++) {
    //    $("#resources").append("<div class=\"col-md-6 \"> <div class=\"resource book\"> <button class=\"pull-right btn btn-sm btn-primary\"><i class=\"fa fa-plus\"></i></button> <h3><i class=\"fa fa-book\"></i>&nbsp;" + resources[i].name +"</h3> <p><em>"+resources[i].description+"</em></p> <p><a href="+ resources[i].url +"><i class=\"fa fa-external-link\"></i>&nbsp;"+ resources[i].name +"</a></p> </div> </div>")
    //  }
    })


    for (i=0; i<resources.length; i++) {
       $("#resources").append("<div class=\"col-md-6 \"> <div class=\"resource book\"> <button class=\"pull-right btn btn-sm btn-primary\"><i class=\"fa fa-plus\"></i></button> <h3><i class=\"fa fa-book\"></i>&nbsp;" + resources[i].name +"</h3> <p><em>"+resources[i].description+"</em></p> <p><a href="+ resources[i].url +"><i class=\"fa fa-external-link\"></i>&nbsp;"+ resources[i].name +"</a></p> </div> </div>")
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


