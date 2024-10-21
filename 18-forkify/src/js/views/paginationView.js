
import View from "./view.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement=document.querySelector('.pagination');

  addHandlerClick(handler){
    this._parentElement.addEventListener('click',function(e){
      const btn = e.target.closest('.btn--inline'); //closest= traveres up whenerever parents matched
      if(!btn) return;
      const page = +btn.dataset.goToPage; // put in camel case for go-to-page
      handler(page);
    })
  }

  _generateMarkup(){
    const totalPage = Math.ceil((this._data.results.length) / this._data.resultsPerPage);
    let currentPage = this._data.page;

    // page 1 and there are other page
    if(currentPage === 1 && totalPage >1){
      return this._NextButtonMarkup(currentPage)

    }
    //last page
    if(currentPage === totalPage && totalPage >1) {
      return this._PreiousButtonMarkup(currentPage)

    }
    // other page
    if(currentPage < totalPage) {
        const prevHTML = this._PreiousButtonMarkup(currentPage)
        const nextHTML = this._NextButtonMarkup(currentPage)
        return prevHTML + nextHTML
    }
     
    // only page 1 , there are no other page
    return ""
  }

  _PreiousButtonMarkup(currentPage){
    // suppose jab page =4 hoga toh hum show kregy prevpage=3 and nextpage=5
    return `<button data-go-to-page="${currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>`
  }
  _NextButtonMarkup(currentPage){
    return `
        <button data-go-to-page="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `
  }
}
export default new PaginationView();