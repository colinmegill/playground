<script type="text/javascript">

$(document).ready(function(){

  $.get('resources').done(function(data){ 

    for (i=0; i<data.length; i++) {
      $("#resources").append("<div class=\"col-md-4 \"> <div class=\"resource book\"> <button class=\"pull-right btn btn-sm btn-primary\"><i class=\"fa fa-plus\"></i></button> <h3><i class=\"fa fa-book\"></i>&nbsp;" + data[i].name +"</h3> <p><em>"+data[i].description+"</em></p> <p><a href="+ data[i].url +"><i class=\"fa fa-external-link\"></i>&nbsp;"+ data[i].name +"</a></p> </div> </div>")
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


</script>