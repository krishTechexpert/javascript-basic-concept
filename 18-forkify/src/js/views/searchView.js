class SearchView{
  #parentElement = document.querySelector('.search');

  // This method fetches the latest input value every time it's called
  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }

  #clearInput(){
    this.#parentElement.querySelector('.search__field').value='';
  }

  addHandlerSearch(searchControllerFn){
    this.#parentElement.addEventListener('submit',(e) =>{
      e.preventDefault();
      // Fetch the latest input value dynamically here
      const query = this.getQuery();  // Now we get the current value of the input field

      searchControllerFn(query)
      this.#clearInput()
    })
  }
}

export default new SearchView();