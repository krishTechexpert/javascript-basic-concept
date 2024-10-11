// 'use strict';

// //Project Live
// //https://mapty.netlify.app/

// // prettier-ignore
// const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
  constructor(coords,distance,duration){
    this.coords=coords; // [latitude,longitude]
    this.distance=distance; // in km
    this.duration=duration; // in mintue
  }
}

class Running extends Workout{
  type='running';
  constructor(coords,distance,duration,cadence){
    super(coords,distance,duration);
    this.cadence=cadence; // step per mintue
    this.calcPace()
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
    this._getPosition();
    form.addEventListener('submit',this._newWorkout.bind(this))
    inputType.addEventListener('change',this._toggleElevationField)
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
    this.renderWorkoutMarker(workout)

    // hide form + clear input field
    inputDistance.value= inputDuration.value = inputCadence.value =  inputElevation.value = '';
    
  }

  renderWorkoutMarker(workout){
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
    .setPopupContent("Workout")
    .openPopup();

  }
}

const app = new App()

