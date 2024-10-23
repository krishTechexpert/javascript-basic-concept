
import View from "./view.js";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js";

class BookmarksView extends View {
  _parentElement=document.querySelector('.bookmarks__list');
  _errorMessage='No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerBookmark(handler){
    window.addEventListener('load',handler)
  }

  _generateMarkup(){
      return this._data.map(bookmark => previewView.render(bookmark,false)).join(''); 

  /*Flow Summary: explain above line of code
  1.) _generateMarkup() is called.
  2.) this._data.map() loops through each bookmark in the array.
  3.) For each bookmark, previewView.render(bookmark, false) is called:
            Inside render(), this._data in previewView is set to the bookmark.
            previewView._generateMarkup() is called to generate the HTML for that bookmark.
            The HTML string is returned.
  4.) map() returns an array of HTML strings, one for each bookmark.
  5.) join('') concatenates the array of strings into one large HTML string.
  6.) The final HTML string is returned by _generateMarkup().
  This ensures that when previewView._generateMarkup() is called, it has access to the current bookmark’s data (like id, title, image).*/

  }

} 

export default new BookmarksView();