var imgSRC;
var title;
var recipeURL;
var recipeSource;
var servings;
var caloriesPerServing;
var fatPerServing;
var proteinPerServing;
var carbsPerServing;
var netCarbsPerServing;
var from = 0;
var to = 9;
var recipeData;
var numberOfPages;
var currentPage;

var recipeResults = {
    displayResults: function(imgSRC, title, url, source, servings, caloriesPerServing, fatPerServing, proteinPerServing, carbsPerServing, netCarbsPerServing){
        var newResult = $("<div class='col s12 m6 l4 result'>");
        var newCard = $("<div class='card sticky-action hoverable'>");
        var newCardImage = $("<div class='card-image waves-effect waves-block waves-light'>");
        var newImage = $("<img class='activator'>").attr("src", imgSRC);
        newCardImage.append(newImage);
        var newCardContent = $("<div class='card-content'>");
        var cardTitle = $("<span class='card-title activator'>");
        cardTitle.html(title);
        newCardContent.append(cardTitle);
        var newCardAction = $("<div class='card-action'>");
        var newLink = $("<a>").attr("href", url);
        newLink.text(source);
        newCardAction.append(newLink);
        var newCardReveal = $("<div class='card-reveal'>");
        var revealTitle = $("<span class='card-title grey-text text-darken-4'>");
        revealTitle.html("Nutrition Facts <i class='material-icons right'>close</i>");
        var nutritionDetails = $("<div>");
        var serving = $("<span>").html("Servings: " + servings + "<br>" + "<u>Per Serving: </u>");
        var calories = $("<span>").text("Calories: " + caloriesPerServing + "kcal");
        var fat = $("<span>").text("Fat: " + fatPerServing + "g");
        var protein = $("<span>").text("Protein: " + proteinPerServing + "g");
        var carbs = $("<span>").text("Carbs: " + carbsPerServing + "g");
        var netCarbs = $("<span>").text("Net Carbs: " + netCarbsPerServing + "g");
        nutritionDetails.append(serving,"<br>",calories,"<br>",fat, "<br>",protein, "<br>", carbs, "<br>", netCarbs);
        newCardReveal.append(revealTitle, "<div class='divider'>", nutritionDetails);
        newCard.append(newCardImage, newCardContent, newCardAction, newCardReveal);
        newResult.append(newCard);
        $("#recipe-search-results").append(newResult);
    },
    getResults: function(result, startIndex, endIndex){
        for(var i = startIndex; i < endIndex; i++){
            imgSRC = result.hits[i].recipe.image;
            title = result.hits[i].recipe.label;
            recipeURL = result.hits[i].recipe.url;
            recipeSource = result.hits[i].recipe.source;
            servings = result.hits[i].recipe.yield;
            caloriesPerServing = Math.floor((result.hits[i].recipe.calories)/servings);
            fatPerServing = Math.floor((result.hits[i].recipe.totalNutrients.FAT.quantity)/servings);
            proteinPerServing = Math.floor((result.hits[i].recipe.totalNutrients.PROCNT.quantity)/servings);
            carbsPerServing = Math.floor((result.hits[i].recipe.totalNutrients.CHOCDF.quantity)/servings);
            netCarbsPerServing = Math.floor((result.hits[i].recipe.digest[1].sub[0].total)/servings);
            this.displayResults(imgSRC, title, recipeURL, recipeSource, servings, caloriesPerServing, fatPerServing, proteinPerServing, carbsPerServing, netCarbsPerServing);
        }
    }
}

var pagination = {
    paginationDisplay: function(numberOfResults){
        $(".pages").remove();
        if(numberOfResults === 0){
            return;
        }
        else{
            $(".pagination").removeClass("hide");
            var page = $("<li class='active pages'>")
            var pageNumber = $("<a>").attr({"class":"page-number", "href": "#recipe-search-form", "data-number": "1"}).text("1")
            page.append(pageNumber);
            page.insertBefore($("#pagination-end"));
            if(numberOfResults <= 9){
                $("#pagination-end").addClass("disabled").removeClass("waves-effect");
            }
            else{
                numberOfPages = (Math.ceil(numberOfResults/9)) - 1;
                for(var j = 0; j < numberOfPages; j++){
                    page=$("<li class='waves-effect pages'>")
                    pageNumber = $("<a>").attr({"class": "page-number", "href": "#recipe-search-form", "data-number": j+2}).text(j+2);
                    page.append(pageNumber);
                    page.insertBefore($("#pagination-end"));
                }
            }
        }
    },
    displayPage: function(clicked){
        currentPage = clicked; 
        var newEndIndex = currentPage * 9;
        var newStartIndex = newEndIndex - 9; 
        if(currentPage != 1){
            $("#pagination-start").removeClass("disabled").addClass("waves-effect");
        }
        else{
            if(!$("#pagination-start").hasClass("disabled")){
                $("#pagination-start").addClass("disabled");
            }
        }
        if(currentPage == (numberOfPages+1)){
            $("#pagination-end").addClass("disabled").removeClass("waves-effect");
        }
        else if(currentPage != (numberOfPages+1) && $("#pagination-end").hasClass("disabled")){
            $("#pagination-end").removeClass("disabled").addClass("waves-effect");
        }
        $("#recipe-search-results").empty();
        recipeResults.getResults(recipeData, newStartIndex, newEndIndex);
    }
}

$(document).on("click", ".page-number", function(){
    $(".pages").removeClass("active");
    $(this).parents("li").addClass("active");
    var thisPage = $(this).attr("data-number");
    pagination.displayPage(thisPage);
})

$("#pagination-start").on("click", function(){
    $(".pages").removeClass("active");
    var previousPage = parseInt(currentPage) - 1;
    $(".page-number[data-number=" + previousPage + "]").parents("li").addClass("active");
    pagination.displayPage(previousPage);
})

$("#pagination-end").on("click", function(){
    $(".pages").removeClass("active");
    var nextPage = parseInt(currentPage) + 1;
    $(".page-number[data-number=" + nextPage + "]").parents("li").addClass("active");
    pagination.displayPage(nextPage);
})

$("#random-button").on("click", function(){
    $("#search-results").empty();
    $("#recipe-search-loader").removeClass("hide");
    $.ajax({
        url: "/api/edamam/random",
        method: "GET"
    }).then(function(result){
        console.log("api call complete");
        console.log(typeof result);
        console.log(result);
        recipeData = result;
        $("#recipe-search-loader").addClass("hide");
        recipeResults.getResults(result, 0, 9);
        pagination.paginationDisplay(result.hits.length);
    });
})

$("#recipe-search-form").on("submit", function(event){
    event.preventDefault();
    $("#search-results").empty();
    $("#recipe-search-loader").removeClass("hide");
    var userInput = $("#search-input").val();
    $.ajax({
        url: "api/edamam/" + userInput,
        method: "GET"
    }).then(function(result){
        recipeData = result;
        currentPage = 1;
        $("#recipe-search-loader").addClass("hide");
        $("#pagination-start").addClass("disabled").removeClass("waves-effect");
        $("#pagination-end").addClass("waves-effect").removeClass("disabled");
        pagination.paginationDisplay(recipeData.hits.length);
        recipeResults.getResults(recipeData, 0, 9);
    })
})