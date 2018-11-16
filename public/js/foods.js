var results = {
    getResults: function(result, name, id, type){
        var resultType = type;
        for(var i = 0; i < result.length; i++){
            var foodName = result[i][name];
            var foodId = result[i][id];
            var nutrients = result[i].full_nutrients;
            var totalCarb;
            var fiber;
            var netCarb;
            for(var j = 0; j < nutrients.length; j++){
                if(nutrients[j].attr_id == 205){
                    totalCarb = nutrients[j].value.toFixed(2);
                }
                if(nutrients[j].attr_id == 291){
                    fiber = nutrients[j].value.toFixed(2);
                }
            }
            if(fiber !== undefined){
                netCarb = (totalCarb - fiber).toFixed(2);
            }
            else{
                netCarb = totalCarb;
            }
            this.displayResults(foodName, foodId, totalCarb, fiber, netCarb, resultType);
        }
    },
    displayResults: function(name, id, totalCarb, fiber, netCarb, type){
        var newPopout = $("<li>");
        var newHeader = $("<div class='collapsible-header'>");
        var newBody = $("<div class='collapsible-body'>");
        var newTotalCarb = $("<span>").html("Total Carbohydrates: " + totalCarb + "g");
        var newFiber = $("<span>").html("Dietary Fiber: " + fiber + "g");
        var newNetCarb = $("<span>").html("Net Carbohydrates: " + netCarb + "g");
        newBody.append(newTotalCarb, "<br>", newFiber, "<br>", newNetCarb);
        newHeader.attr({"data-id": id, "data-type": type});
        newPopout.append(newHeader, newBody);
        if(type === "branded"){
            newHeader.html("<i class='material-icons'>restaurant</i> " + name);
            $("#branded-results").append(newPopout);
        }else{
            newHeader.html("<i class='material-icons'>local_grocery_store</i> " + name)
            $("#common-results").append(newPopout);
        }
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
        results.getResults(result.branded, "brand_name_item_name", "nix_item_id", "branded");
        results.getResults(result.common, "food_name", "tag_id", "common");
    })
})