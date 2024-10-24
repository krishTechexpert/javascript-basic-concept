
import View from "./view.js";
import icons from "url:../../img/icons.svg";

class AddRevipeView extends View {
  _parentElement=document.querySelector('.upload');
  _message='Recipe upload successfully ):';
  _window=document.querySelector('.add-recipe-window');
  _overlay=document.querySelector('.overlay');
  _btnOpen =document.querySelector('.nav__btn--add-recipe');
  _btnClose=document.querySelector('.btn--close-modal');
  
  constructor(){
    super();
    this._addHandlerShowWindow(); // which attaches a click event listener 
    this._addHandlerHideWindow();
  }

  toggleWindow(){
    this._overlay.classList.toggle('hidden')
    this._window.classList.toggle('hidden')
  }

  _addHandlerShowWindow(){
    this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
  }

  _addHandlerHideWindow(){
    this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
    this._overlay.addEventListener('click',this.toggleWindow.bind(this))
  }

  addHandlerUplpad(handler){
    this._parentElement.addEventListener('submit',function(e){
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr)
      handler(data)
    })
  }

  _generateMarkup(){

  }

}
export default new AddRevipeView();