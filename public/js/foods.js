var headers = {
    "x-app-id": "1517d728",
    "x-app-key": "a7fd2ae1af395286ccc62c0ff89f662d"
};

var brandedResults = {
    getResults: function(result){
        for(var i = 0; i < result.length; i++){
            var brandedName = result[i].brand_name_item_name;
            var brandedId = result[i].nix_item_id;
            var nutrients = results[i].full_nutrients;
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
    var queryURL = "https://trackapi.nutritionix.com/v2/search/instant?detailed=true&query=" + userInput;
    $.ajax({
        headers: headers,
        url: queryURL,
        method: "GET"
    }).then(function(result){
        console.log(result);
        $("#food-search-loader").addClass("hide");
        brandedResults.getResults(result.branded);
        commonResults.getResults(result.common);
    })
})

// $(document).on("click", ".collapsible-header", function(){
//     var id = $(this).attr("data-id");
//     var that = this;
//     if($(this).attr("data-type") === "branded"){
//         var queryURL = "https://trackapi.nutritionix.com/v2/search/item?nix_item_id=" + id;
//         $.ajax({
//             headers: headers,
//             url: queryURL,
//             method: "GET"
//         }).then(function(result){
//             console.log(result);
//             var info = result.foods[0];
//             var totalCarb = info.nf_total_carbohydrate;
//             if(info.nf_dietary_fiber !== null){
//                 var totalFiber = info.nf_dietary_fiber;
//                 var netCarbs = parseFloat(totalCarb) - parseFloat(totalFiber);
//                 $(that).parent("li").children(".collapsible-body").append(totalCarb, "<br>", totalFiber, "<br>", netCarbs);
//             }
//             else{
//                 $(that).parent("li").children(".collapsible-body").append(totalCarb, "<br>", "<p> No Fiber </p>");
//             }
//         })
//     }
//     else{
        
//     }
// })