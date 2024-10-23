import icons from "url:../../img/icons.svg";

export default class View {
  _data;
  render(data,render=true){
    if(data.length === 0) return  this.renderError(); 
    this._data=data;
    const markup=this._generateMarkup();

    if(!render) return markup; 

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin',markup)
  }
  _clear(){
    this._parentElement.innerHTML='';
  }

  // create virtual DOM..comare new markup html with old markup html and find difference then update text,attribute in real DOM

  // DOM updating algorthim
  update(data){
    this._data=data;
    const newMarkup=this._generateMarkup();// geting updated html here

    // convert string into DOM object
    const newDOM =document.createRange().createContextualFragment(newMarkup); // create virtual dom in memory

    const newElements = Array.from(newDOM.querySelectorAll('*')); // return nodelist then convert into array
    const currentElements = Array.from(this._parentElement.querySelectorAll('*')); //return nodelist then convert into array

    // now time to compare both and find only difference value(updated value)
    newElements.forEach((newEl,i) => {
      const currEl = currentElements[i];
      // update changed text
      if(!newEl.isEqualNode(currEl) && newEl.firstChild?.nodeValue.trim() !==''){
        //newEl.firstChild: <span>5</span> i.e 5
        // only replace text , not everything
        //console.log('***',newEl,newEl.firstChild)
        currEl.textContent = newEl.textContent;
      }
      // update changed attribute because we used data-update-to as attribute on button+
      if(!newEl.isEqualNode(currEl)){
        Array.from(newEl.attributes).forEach(attr => currEl.setAttribute(attr.name,attr.value))
      }


    })



  }
  renderError(message=this._errorMessage) {
    const markup = `
        <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin',markup)
  }

  renderMessage(message=this._message) {
    const markup = `
        <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin',markup)
  }
  renderSpinner(){
    const markup=`<div class="spinner">
                    <svg>
                      <use href="${icons}#icon-loader"></use>
                    </svg>
                  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin',markup)
  }
}