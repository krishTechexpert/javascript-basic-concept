
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
      return this._data.map(bookmark => previewView.render(bookmark,false)).join(''); // some recursion technique used ho rehi hai for code html reused inside _generateMarkup in PreviewView for previewView.render()..plz observe code twice
  }

} 

export default new BookmarksView();