// This file contains application logic inwhich data is shared between modal and view and view-versa.

// application logic : ek bar api s data(modal) aa gya then hum usko modify ker sektai hai accoridng to our ned. yhi application logic hota hai.


import 'core-js/stable'; // polyfill for everything
import 'regenerator-runtime/runtime'; // polyfill for async/await
import {async} from "regenerator-runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import ResultsView from "./views/resultsView.js";
import PaginationView from "./views/paginationView.js";


// parcel code, if you make any chnages in code then page don't reload  and data will not lost. it preserve application state and It is only used in development
// if(module.hot) {
//  module.hot.accept()
// }


// receipe api
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// application logic

const recipeController = async function(){

  try{
    // render spinner
    recipeView.renderSpinner()
    const id= window.location.hash.slice(1);
    if(!id) return

    // Loading Recipe:  here id will be sent to  in modal file
    await model.loadRecipe(id)
    
    //2 Render Recipe
    recipeView.render(model.state.recipe);
  }catch(error){
    console.log(error)
    recipeView.renderError()// no need to send error as we recipe view class has specific error message for that.
  }
}

// The 'Controller' (Subscriber)

const searchRecipeController = async function(query){
  try{
    if(!query) return;

    //
    ResultsView.renderSpinner();
    // loading recipe
    await model.loadSearchResult(query)
    //Rendering recipe
    ResultsView.render(model.getSearchResultsPage())
    // show pagination
    PaginationView.render(model.state.search)
  }catch(err) {
    console.log(err)
    ResultsView.renderError(err)
  }
}

const paginationController = function(goToPage){
  //Rendering new Result 
  ResultsView.render(model.getSearchResultsPage(goToPage))
  // updated pagination
  console.log(model.state.search)
  PaginationView.render(model.state.search)
}

// Update Servings (basicalluy update ingredients when more person added)

const servingsController = function(newServings){
  // update the recipe servings (in state)
  model.updateServings(newServings)
  //update the recipe view
  recipeView.render(model.state.recipe);

}

/* Notes:
The Subscriber-Publisher Pattern (also known as Pub-Sub pattern) is a design pattern where one part of your application (the Publisher) triggers an event, and another part (the Subscriber) listens for that event and responds to it. This pattern is useful for decoupling different parts of your code so that they don’t depend directly on each other.

In your example, the functions recipeView.addHandlerRender and searchView.addHandlerSearch are the subscriber methods, and the corresponding recipeController and searchRecipeController functions act as the handlers (subscribers) that respond when the relevant events occur.


*/


// subscriber-publisher pattern (imp how we connect )
// Application Initialization (Connecting Publishers and Subscribers)

const appStart=function(){
  // subscriber pattern
  recipeView.addHandlerRender(recipeController) // Subscriber listens to page load
  searchView.addHandlerSearch(searchRecipeController) // Subscriber listens to form submit
  PaginationView.addHandlerClick(paginationController)
  recipeView.addHandlerUpdateServings(servingsController)
}

appStart();

/*
  How It Works Together:
Publisher (View):

recipeView.addHandlerRender(recipeController): This connects the recipeView (Publisher) to the recipeController (Subscriber). When the page loads, recipeView notifies recipeController to fetch and display the recipe.
searchView.addHandlerSearch(searchRecipeController): This connects the searchView (Publisher) to searchRecipeController (Subscriber). When the search form is submitted, searchView notifies searchRecipeController to handle the search.
Subscriber (Controller):

recipeController: Gets notified by recipeView when the page loads, and it handles fetching and rendering the recipe.
searchRecipeController: Gets notified by searchView when the search form is submitted, and it handles fetching the search results.
*/

/*
Flow of Events:
When the user visits the page, recipeView.addHandlerRender(recipeController) connects the recipeView's event (like page load) with the recipeController. So, when the page loads, the recipeController will be executed to fetch and render the recipe.

When the user submits a search query, searchView.addHandlerSearch(searchRecipeController) ensures that the form submission event is captured, and the searchRecipeController is called to handle the search logic.
*/


/*
Summary:
Publisher: The part of your app that publishes an event (like user input or page load).
Subscriber: The part of your app that listens and responds to that event (by executing specific logic).
Pub-Sub Pattern: The connection between publishers and subscribers ensures that events are handled in a decoupled way, so views (Publishers) don’t need to know the details of how the logic is implemented by controllers (Subscribers).
*/