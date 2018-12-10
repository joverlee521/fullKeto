var results = {
    getResults: function(result, name, id, type){
        var resultType = type;
        for(var i = 0; i < 5; i++){
            var foodName = result[i][name];
            var foodId = result[i][id];
            var servingQuantity = result[i].serving_qty;
            var servingUnit = result[i].serving_unit;
            var nutrients = result[i].full_nutrients;
            var totalCarb = 0;
            var fiber = 0;
            var netCarb = 0;
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
            this.displayResults(foodName, foodId, servingQuantity, servingUnit, totalCarb, fiber, netCarb, resultType);
        }
    },
    displayResults: function(name, id, servingQuantity, servingUnit, totalCarb, fiber, netCarb, type){
        var newPopout = $("<li>");
        var newHeader = $("<div class='collapsible-header'>");
        var newBody = $("<div class='collapsible-body'>");
        var newServing = $("<span>").html("Serving size: " + servingQuantity + " " + servingUnit);
        var newTotalCarb = $("<span>").html("Total Carbohydrates: " + totalCarb + "g");
        var newFiber = $("<span>").html("Dietary Fiber: " + fiber + "g");
        var newNetCarb = $("<span>").html("Net Carbohydrates: " + netCarb + "g");
        newBody.append(newServing, "<br><br>", newTotalCarb, "<br>", newFiber, "<br>", newNetCarb);
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
    $("#branded-results").empty();
    $("#common-results").empty();
    $("#food-search-loader").removeClass("hide");
    var userInput = $("#food-input").val();
    $.ajax({
        url: "/api/nutritionix/" + userInput,
        method: "GET"
    }).then(function(result){
        console.log(result);
        $("#food-search-loader").addClass("hide");
        $("#branded-results").append("<h5>Brand Foods</h5><br>");
        $("#common-results").append("<h5>Common Foods</h5><br>");
        results.getResults(result.branded, "brand_name_item_name", "nix_item_id", "branded");
        results.getResults(result.common, "food_name", "tag_id", "common");
    })
})