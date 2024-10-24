// this file contain bussiness logic such as fetch api, get data from state, get data from database, get data from files etc,

import {API_URL,API_KEY} from "./config.js";
import {getJSON,sendJSON} from "./helpers.js";
export const state = {
  recipe:{},
  search:{
    query:'',//for analtics (which query user is interested) future used
    results:[],
    page:1,
    resultsPerPage:10
  },
  bookmarks: []
}

const createRecipeObject = function(data){
  const {recipe}=data.data;

  return {
    id:recipe.id,
    title:recipe.title,
    publisher:recipe.publisher,
    sourceUrl:recipe.source_url,
    image:recipe.image_url,
    servings:recipe.servings,
    cookingTime:recipe.cooking_time,
    ingredients:recipe.ingredients,
    ...(recipe.key && {key:recipe.key}) // key:recipe.key

  }
}

// handling fetch receipe data from some 3rd party api
export const loadRecipe = async function(id){
  
  try {

    const result = await getJSON(`${API_URL}${id}`)

    state.recipe = createRecipeObject(result)
    
    if(state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)){
      state.recipe.bookmarked = true;

    }else {
      state.recipe.bookmarked = false;
    }
    console.log(state)

  } catch(error){
    console.log(`${error}`)
    throw error; // rethrow error
  }
}

export const loadSearchResult = async function(query){
  try{
    state.search.query=query;
    const result = await getJSON(`${API_URL}?search=${query}`)
    state.search.results=result && result.data.recipes.map(recipe => {
      return {
        id:recipe.id,
        title:recipe.title,
        publisher:recipe.publisher,
        image:recipe.image_url,
      }
    })
    
    state.search.page=1;
  }catch(error) {
    console.log(`${error}`)
    throw error; // rethrow error
  }
}

export const getSearchResultsPage = function(page=state.search.page){
  state.search.page=page;
  const start=(page-1)* state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start,end)
}

export const updateServings = function(newServings){
  const updateIng =state.recipe.ingredients.slice();
  updateIng.forEach(serving => {
    serving.quantity= (serving.quantity * newServings) / state.recipe.servings;
    // newQt= oldQty*newServings/ oldServings // 2*8/4=4
  });
  state.recipe.servings=newServings;
  state.recipe.ingredients=updateIng;
}

export const persistBookmarks = function(){
  localStorage.setItem('bookmarks',JSON.stringify(state.bookmarks))

}

export const addBookmarked = function(recipe){
  // add bookmark
  state.bookmarks.push(recipe)
  // make current recipe as bookmarked 
  if(recipe.id === state.recipe.id) state.recipe.bookmarked=true;

  persistBookmarks()
}

export const deleteBookmarked = function(id) {
  const index = state.bookmarks.findIndex(item => item.id === id)
  state.bookmarks.splice(index,1);
  // make current recipe as Not bookmarked
  if(id === state.recipe.id) state.recipe.bookmarked=false;

  persistBookmarks()
}

export const uploadRecipe = async function(newRecipe){
  try{
    const ingredients =Object.entries(newRecipe)
                      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !=='')
                      .map(ing => {
                        const ingArr = ing[1].replaceAll(' ','').split(',');
                        if(ingArr.length !==3) {
                          throw new Error('Wrong ingredient format! please use the correct format')
                        }
                        let [quantity,unit,description] = ingArr;
                        return {quantity: quantity ? +quantity:null,unit,description}
                      })
    const recipe = {
      title:newRecipe.title,
      source_url:newRecipe.sourceUrl,
      image_url:newRecipe.image,
      publisher:newRecipe.publisher,
      cooking_time:+newRecipe.cookingTime,
      servings:+newRecipe.servings,
      ingredients
    }
    const result = await sendJSON(`${API_URL}?key=${API_KEY}`,recipe)
    state.recipe = createRecipeObject(result)
    addBookmarked(state.recipe)

  }catch(err) {
    throw err;
  }

}

  const storage=localStorage.getItem('bookmarks');
  if(storage){
  state.bookmarks = JSON.parse(storage);
  }
    

