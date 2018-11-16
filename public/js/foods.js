var brandedResults = {
    getResults: function(result){
        for(var i = 0; i < result.length; i++){
            var brandedName = result[i].brand_name_item_name;
            var brandedId = result[i].nix_item_id;
            var nutrients = result[i].full_nutrients;
            var totalCarb;
            var fiber;
            var netCarbs;
            for(var j = 0; j < nutrients.length; j++){
                if(nutrients[j].attr_id == 205){
                    totalCarb = nutrients[j].value;
                }
                if(nutrients[j].attr_id == 291){
                    fiber = nutrients[j].value;
                }
            }
            if(fiber !== undefined){
                netCarbs = totalCarb - fiber;
            }
            else{
                netCarbs = totalCarb;
            }
            this.displayResults(brandedName, brandedId);
        }
    },
    displayResults: function(name, id){
        var newPopout = $("<li>");
        var newHeader = $("<div class='collapsible-header'>");
        var newBody = $("<div class='collapsible-body'>");
        // var newIcon = $("<i class='material-icons'>").text("restaurant");
        newHeader.html("<i class='material-icons'>restaurant</i> " + name).attr({"data-id": id, "data-type": "branded"});
        newPopout.append(newHeader, newBody);
        $("#branded-results").append(newPopout);
    }
}

var commonResults = {
    getResults: function(result){
        for(var i = 0; i < result.length; i++){
            var commonName = result[i].food_name;
            var commonId = result[i].tag_id;
            this.displayResults(commonName, commonId);
        }
    },
    displayResults: function(name, id){
        var newPopout = $("<li>");
        var newHeader = $("<div class='collapsible-header'>");
        var newBody = $("<div class='collapsible-body'>");
        // var newIcon = $("<i class='material-icons'>").text("restaurant");
        newHeader.html("<i class='material-icons'>shopping_cart</i> " + name).attr({"data-id": id, "data-type": "common"});
        newPopout.append(newHeader, newBody);
        $("#common-results").append(newPopout);
    }
}

$("#food-search-form").on("submit", function(event){
    event.preventDefault();
    $("#food-search-results").empty();
    $("#food-search-loader").removeClass("hide");
    var userInput = $("#food-input").val();
    $.ajax({
        url: "/api/nutritionix/" + userInput,
        method: "GET"
    }).then(function(result){
        console.log(result);
        $("#food-search-loader").addClass("hide");
        brandedResults.getResults(result.branded);
        commonResults.getResults(result.common);
    })
})