# Full Keto

[Full Keto](https://jl-fullketo.herokuapp.com/) is a single page application dedicated to making the Ketogenic lifestyle easier.

## About
The goal of this project is to create a simple and straight-forward application to support the Ketogenic lifestyle. The "Keto Diet" has exploded in popularity in the recent years and has established a prominent presence on the web. However, many websites dedicated to it has become quite convoluted and hard to navigate. This application is designed to support those who already know about the keto lifestyle but just want an easy way to search for recipes and relevant nutrition information, i.e., total carbohydrates, dietary fiber, and net carbohydrates. 

![Full Keto](/public/img/homepage.png)

## How To:
### Keto Recipes
* Under the "KETO RECIPES" tab, users can either search for recipes or get random recipes. 

![Keto Recipes](/public/img/recipe-tab.png)

* Searching ingredients will generate cards with keto recipes containing the ingredient.

![Recipe Search Results](/public/img/recipe-search.png)

* Clicking the "Get Randome Recipes" button is generate cards with random keto recipes.

![Random Recipes](/public/img/random-recipes.png)

* Clicking on the card will reveal the nutrition information of the recipes and clicking on the link in the card footer will take users to the external recipe webpage. 

![Nutrition Facts](/public/img/nutrition-facts.png)

* A maximum of nine recipes will be displayed per page. Use the pagination at the bottom to flip through the different pages.

![Pagination](/public/img/pagination.png)

### Is it Keto?
* Under the "IS IT KETO?" tab, users can search individual food items to see their carbohydrate content. 

![Is It Keto?](/public/img/food-section.png)

* The results are listed in two columns, "Brand Foods" and "Common Foods". 

![Food Search Results](/public/img/food-search-results.png)

* Clicking of the food item will reveal the the total carbohydrates, dietary fiber, and net carbohydrates of the item.

![Carbohydrate Facts](/public/img/food-search-open.png)

## Technologies Used
* Materialize
* Node.js, Express.js
* Handelbars.js
* [EDAMAM API](https://developer.edamam.com/)
* [Nutritionix API](https://www.nutritionix.com/)
