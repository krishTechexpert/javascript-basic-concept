// 'use strict';

// //Project Live
// //https://mapty.netlify.app/



const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class Workout{
  date = new Date();
  id = (Date.now() + '').slice(-10)// last 10 number
  count=0;
  constructor(coords,distance,duration){
    this.coords=coords; // [latitude,longitude]
    this.distance=distance; // in km
    this.duration=duration; // in mintue
  }
  _setDescription(){
    // // prettier-ignore
   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}` 
  }
  _getCounts(){
    this.count++;
  }
}

class Running extends Workout{
  type='running';
  constructor(coords,distance,duration,cadence){
    super(coords,distance,duration);
    this.cadence=cadence; // step per mintue
    this.calcPace();
    this._setDescription();
  }

  calcPace(){
    // min/km
    this.pace=this.duration/this.distance;
    return this.pace;
  }
}

class Cycling extends Workout{
  type='cycling'
  constructor(coords,distance,duration,elevationGain){
    super(coords,distance,duration);
    this.elevationGain=elevationGain; // meter
    this.calcSpeed();
    this._setDescription();

  }

  calcSpeed(){
    //km/h
    this.speed=this.distance/(this.duration/60);
    return this.speed;
  }

}


/////////////////////////////////////
// Application Architecture
class App{
  #map;
  #mapEvent;
  #workouts=[];
  constructor(){
    this._getLocalStorage();
    this._getPosition();
    form.addEventListener('submit',this._newWorkout.bind(this))
    inputType.addEventListener('change',this._toggleElevationField);
    containerWorkouts.addEventListener('click',this._moveToPopUp.bind(this))
  }

  _getPosition(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(error){
        alert('Could not get your location')
      })
    }
  }

  _loadMap(position){
    const {latitude,longitude} = position.coords;
    const coords = [latitude,longitude];

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);

    // handling clicks on map
    this.#map.on('click',this._showForm.bind(this))

    // load map marker on page load
    this.#workouts.forEach(workout =>   this._renderWorkoutMarker(workout))

  }

  _showForm(mapE){
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus()
  }

  _toggleElevationField(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
  }

  _newWorkout(e){
    e.preventDefault();

    // get data from form
    const type = inputType.value;
    const distance= +inputDistance.value; 
    const duration = +inputDuration.value;

    const validInput = (...inputs) => inputs.every(value => Number.isFinite(value))

    const allPositive = (...inputs) => inputs.every(value => value > 0)

    const {lat,lng} = this.#mapEvent.latlng;
     let workout;
    // If workout running, create running object
    if(type === 'running'){
      const cadence= +inputCadence.value
      // check if data is valid
      // old ways !Number.isFinite(distance) || !Number.isFinite(duration) || !Number.isFinite(cadence)
      if(!validInput(distance,duration,cadence) || !allPositive(distance,duration,cadence) ){
          return alert('Input have to be positive number')
      }
      workout = new Running([lat,lng],distance,duration,cadence)
    }

    // If workout cycling, create cycling object

    if(type === 'cycling'){
      const elevation = +inputElevation.value; // negative value accepted b'coz cycling can go down from hills
      if(!validInput(distance,duration) || !allPositive(distance,duration) ){
          return alert('Input have to be positive number')
      }
      workout = new Cycling([lat,lng],distance,duration,elevation)

    }

    // Add new object to workout array
      this.#workouts.push(workout)
      console.log(workout)

    // Render workout on map as marker
    this._renderWorkoutMarker(workout)

    // Render Workout list
    this._renderWorkout(workout)

    // hide form + clear input field
    this._hideForm();

    // to save workout in localstorage
    this._setLocalStorage();
  
  }


  _renderWorkoutMarker(workout){
    L.marker(workout.coords)
    .addTo(this.#map)
    .bindPopup(
        L.popup({
        maxWidth:250,
        minWidth:100,
        autoClose:false,
        closeOnClick:false,
        className:`${workout.type}-popup`
      })
    )
    .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️ ' : '🚴‍♀️ '} ${workout.description}`)
    .openPopup();
  }

  _renderWorkout(workout){
    let html= `
    
      <li class="workout workout--${workout.type}" data-id=${workout.id}>
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">🏃‍♂️</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
      `

    if(workout.type === 'running'){
      html = html + `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
          </li>
      `
    }

    if(workout.type === 'cycling'){
      html = html + `
            <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `
    }

    form.insertAdjacentHTML('afterend',html)
  }

  _hideForm(){
    //css m form class per animation add hai so woh 1sec s delay hide hota hai..so I tried below some trick to form hide immediately
    form.style.display='none'
    form.classList.add('hidden');
    setTimeout(() =>form.style.display='grid',1000 )
    
    inputDistance.value= inputDuration.value = inputCadence.value =  inputElevation.value = '';

  }

  _moveToPopUp(e){
    const workoutEl = e.target.closest('.workout')
    if(!workoutEl) return;
    const workout = this.#workouts.find(item => item.id === workoutEl.dataset.id);
    
    this.#map.setView(workout.coords,13,{
      animate:true,
      pan:{
        duration:1
      }
    })

    // // using the public interfaces
    // The error you're encountering occurs because when objects are retrieved from localStorage, they are no longer instances of Running or Cycling. They are just plain objects, so their prototype methods like _getCounts are not available. To fix this, you'll need to manually recreate the Running and Cycling instances from the plain objects stored in localStorage.
    

    //solution: You can modify the _getLocalStorage method to recreate the objects using their respective classes.
    
    workout._getCounts(); //when you work on local strorage then convert json.stringify and json.parse then out prototype connection loose that's why it show error on get value from localstorage then click on render list show error present
    console.log(this) // check count 1 aa reha hai ..basically used count method here
  }

  _setLocalStorage(){
    localStorage.setItem('workouts',JSON.stringify(this.#workouts))
  }
  _getLocalStorage(){
    const data = JSON.parse(localStorage.getItem('workouts'))
    if(!data) return;
    if(data){
      //You can modify the _getLocalStorage method to recreate the objects using their respective classes.

      //bar approach
      //this.#workouts=data;// gives error points to workout._getCounts();

      // good approach
      this.#workouts = data.map(workout => {
        if (workout.type === 'running') {
          //yha per re-build object banaya hai to solved this problem workout._getCounts()


          // Restoring Class Instances: By creating new instances of Running and Cycling, the methods and properties, like _getCounts or _setDescription, will be available again on these objects.

          
          return new Running(workout.coords, workout.distance, workout.duration, workout.cadence);
        }
        if (workout.type === 'cycling') {
          return new Cycling(workout.coords, workout.distance, workout.duration, workout.elevationGain);
        }
      });
      console.log(this.#workouts)
      this.#workouts.forEach(workout =>   this._renderWorkout(workout))
    }
  }
}

const app = new App()

