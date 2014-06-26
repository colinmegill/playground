function appendBookForm() {
	$("#restOfResourceForm").html("<div class=\"form-group\">\r\n          <label for=\"resourceName\">Book Title<\/label>\r\n          <input type=\"text\" class=\"form-control\" id=\"resourceName\" placeholder=\"Book Title\">\r\n        <\/div>\r\n        <div class=\"form-group\">\r\n          <label for=\"resourceDescription\">Description<\/label>\r\n          <textarea class=\"form-control\" id=\"resourceDescription\" placeholder=\"Description\"><\/textarea> \r\n        <\/div>\r\n        <div class=\"form-group\">\r\n          <label for=\"resourceURL\">Purchase URL<\/label>\r\n          <input type=\"text\" class=\"form-control\" id=\"resourceURL\" placeholder=\"Purchase URL\">\r\n        <\/div>\r\n        <button type=\"submit\" id=\"submitResource\" class=\"btn btn-primary btn-lg\">Submit Resource<\/button>\r\n");
}

function appendPlaceForm() {
	$("#restOfResourceForm").html("<div class=\"form-group\">\r\n          <label for=\"resourceName\">Place Name<\/label>\r\n          <input type=\"text\" class=\"form-control\" id=\"resourceName\" placeholder=\"Place Name\">\r\n   <p> <em> ie., Woodland Park Zoo </em> </p>      <\/div>\r\n        <div class=\"form-group\">\r\n          <label for=\"resourceAddress\">Address<\/label>\r\n          <input type=\"text\" class=\"form-control\" id=\"resourceAddress\" placeholder=\"Address\">\r\n        <\/div>\r\n        <div class=\"form-group\">\r\n          <label for=\"resourceDescription\">Description<\/label>\r\n          <textarea class=\"form-control\" id=\"resourceDescription\" placeholder=\"Description\"><\/textarea> \r\n        <\/div>\r\n        <div class=\"form-group\">\r\n          <label for=\"resourceURL\">URL<\/label>\r\n          <input type=\"text\" class=\"form-control\" id=\"resourceURL\" placeholder=\"URL\">\r\n        <\/div>\r\n        <button type=\"submit\" id=\"submitResource\" class=\"btn btn-primary btn-lg\">Submit Resource<\/button>")
}

function appendCurriculumForm() {
	$("#restOfResourceForm").html("<div class=\"form-group\">\r\n          <label for=\"resourceName\">Curriculum Name<\/label>\r\n          <input type=\"text\" class=\"form-control\" id=\"resourceName\" placeholder=\"Curriculum Name\">\r\n        <\/div>\r\n        <div class=\"form-group\">\r\n          <label for=\"resourceDescription\">Description<\/label>\r\n          <textarea class=\"form-control\" id=\"resourceDescription\" placeholder=\"Description\"><\/textarea> \r\n        <\/div>\r\n        <div class=\"form-group\">\r\n          <label for=\"resourceURL\">URL<\/label>\r\n          <input type=\"text\" class=\"form-control\" id=\"resourceURL\" placeholder=\"URL\">\r\n        <\/div>\r\n        <button type=\"submit\" id=\"submitResource\" class=\"btn btn-primary btn-lg\">Submit Resource<\/button>")
}


function appendWebsiteForm() {
  $("#restOfResourceForm").html("<div class=\"form-group\">\r\n          <label for=\"resourceName\">Website<\/label>\r\n          <input type=\"text\" class=\"form-control\" id=\"resourceName\" placeholder=\"Website Name\">\r\n        <\/div>\r\n        <div class=\"form-group\">\r\n          <label for=\"resourceDescription\">Description<\/label>\r\n          <textarea class=\"form-control\" id=\"resourceDescription\" placeholder=\"Description\"><\/textarea> \r\n        <\/div>\r\n        <div class=\"form-group\">\r\n          <label for=\"resourceURL\">URL<\/label>\r\n          <input type=\"text\" class=\"form-control\" id=\"resourceURL\" placeholder=\"URL\">\r\n        <\/div>\r\n        <button type=\"submit\" id=\"submitResource\" class=\"btn btn-primary btn-lg\">Submit Resource<\/button>\r\n");
}

function appendNetworkForm() {
	$("#restOfResourceForm").html("<div class=\"form-group\">\r\n          <label for=\"resourceName\">Network Name<\/label>\r\n          <input type=\"text\" class=\"form-control\" id=\"resourceName\" placeholder=\"Network Name\">\r\n <p> <em> ie., Greenlake Moms </em> </p>        <\/div>\r\n        <div class=\"form-group\">\r\n          <label for=\"resourceDescription\">Description<\/label>\r\n          <textarea class=\"form-control\" id=\"resourceDescription\" placeholder=\"Description\"><\/textarea> \r\n        <\/div>\r\n        <div class=\"form-group\">\r\n          <label for=\"resourceURL\">URL<\/label>\r\n          <input type=\"text\" class=\"form-control\" id=\"resourceURL\" placeholder=\"URL\">\r\n        <\/div>\r\n        <button type=\"submit\" id=\"submitResource\" class=\"btn btn-primary btn-lg\">Submit Resource<\/button>")
}

//destroy any html attached to the root element
function resetResourceForm() {
	$("#restOfResourceForm").html("")
}

function resetResources(){
  $("#resources").html("")
}

function setAllResources(resources) {
	for (i=0; i<resources.length; i++) {
    if (resources[i].approved === true){
      $("#resources").append("<div class=\"col-md-6 masonry-item \"> <div class=\"resource book\"> <h3><i class=\"fa fa-book\"></i>&nbsp;" + resources[i].name +"</h3> <p><em>"+resources[i].description+"</em></p> <p><a href=\""+ resources[i].url +"\"><i class=\"fa fa-external-link\"></i>&nbsp;"+ resources[i].name +"</a></p> </div> </div>")
    }
  }
}

function setFilteredResources(resources, $text) {
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

    if (resources[i].tags.indexOf($text) != -1 && resources[i].approved === true) {
      
      $("#resources").append("<div class=\"col-md-6 masonry-item\"><div class=\"resource book\">  <h3><i class=\"fa fa-book\"></i>&nbsp;" + resources[i].name +"</h3> <p><em>"+resources[i].description+"</em></p> <p><a href=\""+ resources[i].url +"\"><i class=\"fa fa-external-link\"></i>&nbsp;"+ resources[i].name +"</a></p> </div> </div>")
    }
  }
}

function doTagLogic(resources) {
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
      resetResources();
      var $text = $(this).text()
      //sort the collection, ie., only render the ones with the tag:
      setFilteredResources(resources, $text)
      doMasonry();
    })
    $("#showAllResourcesButton").click(function(){
      resetResources();
      setAllResources(resources);
      doMasonry();
    })
}

function doMasonry() {
	  var container = document.querySelector('#resources');
    var msnry = new Masonry( container, {
      itemSelector: '.masonry-item',
    });
}
