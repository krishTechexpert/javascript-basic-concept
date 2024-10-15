'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};


///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
  <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('usa');
getCountryData('germany');
*/

///////////////////////////////////////
// Welcome to Callback Hell

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');
*/

// callback hell
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);



///////////////////////////////////////
// Consuming Promises
// Chaining Promises
// Handling Rejected Promises
// Throwing Errors Manually

const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`,{
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    }})
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'dfsdfdef';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// const getCountryData = function (country) {
//   // Country 1
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       // Country 2
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('portugal');
// });

// getCountryData('australia');


// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);

//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);

//       return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };
//whereAmI(52.508, 13.381);
//whereAmI(19.037, 72.873);
//whereAmI(-33.933, 18.474);



///////////////////////////////////////
// The Event Loop in Practice

// console.log('test start')
// setTimeout(() =>console.log('set timeout'),0)
// Promise.resolve('promise 1').then(res => console.log(res))
// console.log('test end')
// Promise.resolve('promise 2').then(res => {
//   for(let i=0; i<=10000;i++){}
//   console.log(res)
// })


///////////////////////////////////////
// Building a Simple Promise

// const lotteryPrimise=new Promise((resolve,reject) => {
//   console.log('lottary is drawing')
//   setTimeout(function(){
//     if(Math.random() >= 0.5) {
//       resolve('You win')
//     }else {
//       reject(new Error('you lost'))
//     }
//   },2000)
  
// })

//lotteryPrimise.then(res => console.log(res)).catch(err => console.log(err))


// Promisifying setTimeout

// const wait = function(seconds) {
//   return new Promise(resolve => {
//     setTimeout(resolve,seconds*1000)
//   })
// }

//promise consume
// wait(1).then(() => {
//   console.log('I am waiting 1 seconds')
//   return wait(2)
// }).then(() => {
//   console.log('I am waiting 2 seconds')
//   return wait(3)
// }).then(() => console.log('I am waiting 3 seconds'))


///////////////////////////////////////
// Promisifying the Geolocation API

const getPosition = function(){
  return new Promise((resolve,reject) => {
    //navigator.geolocation.getCurrentPosition(pos => resolve(pos),err => reject(err))// take position the resolve but
    // we can do same thing which will happen automatically
    navigator.geolocation.getCurrentPosition(resolve,reject) // 
  })
}

//getPosition().then(pos => console.log(pos))

const whereAmI = function (lat, lng) {

  getPosition().then(pos => {

    const {latitude:lat,longitude:lng} = pos.coords;

    return  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)

  })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click',whereAmI)



///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

//What is Promise Chaining?
//Promise chaining means that the next step (or task) in the code waits for the previous step (or promise) to finish. Each step returns a promise, and the next .then() will only run after that promise is resolved.

//This is how promise chaining works! It allows you to manage asynchronous tasks in sequence, ensuring they don't run all at once.

// good example for Promise chain
const image= ['img-1.jpg','img-2.jpg','img-3.jpg']
const imgContainer = document.querySelector('.images');


const createImage = function(imgPath){
  return new Promise((resolve,reject) => {
    const img = document.createElement('img')
    img.src = `./img/${imgPath}`;
    img.addEventListener('load',function(){
      imgContainer.append(img);
      resolve(img)
    })
    img.addEventListener('error',function(){
      reject(new Error('Image not found'))
    })
  })
}

// let currentImage=null;
// createImage(image[0])

//   .then(imgResponse => {
//     currentImage=imgResponse;
//     console.log(imgResponse)
//     return wait(2) // this ensure that the next .then() block does not execute until this promise is resolved.// promise chain, (agar return remove ker dogy toh y wait nhi krega or next then exeute ho jye ga which is wrong) esliye promise chain used kerna chiye jab tum ko all promise should be in sequence one by one,
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage(image[1])
//   })
//   .then(imgResponse => {
//     currentImage=imgResponse;
//     console.log(imgResponse)
//     return wait(2)
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//     return createImage(image[2])
//   })
//   .then(imgResponse => {
//     currentImage=imgResponse;
//     console.log(imgResponse)
//     return wait(2)
//   })
//   .then(() => {
//     currentImage.style.display = 'none';
//   })
  
//   .catch(err => console.log(err))

// console.log('image loading...')


// const wait = function(second){
//   return new Promise((resolve) => {
//     setTimeout(resolve,1000*second)
//   })
// }

//To summarize:

//Without return: The promise chain will continue immediately, ignoring the waiting period.
//With return: The chain will wait for the promise returned by wait(2) to resolve (after 2 seconds), ensuring the current image is displayed for that duration before proceeding.

function  showNumber(i){
  return new Promise((resolve) => {
    setTimeout(() =>resolve(i),i*1000)
  })
}

// using promise chain
let promise = Promise.resolve(); // Start with an initial resolved promise

// for(let i=1;i<=10;i++){
//   promise=  promise.then(() => showNumber(i)).then(() => console.log(i));

// }

// modified version
for (let i = 1; i <= 10; i++) {
  promise = promise.then(() => {
    console.log(`Iteration ${i}: Promise started`);
    return showNumber(i);
  }).then((number) => {
    console.log(`Iteration ${i}: Promise resolved with ${number}`);
  //  return promise; ( only for undertood and) // Logging the promise object (not useful directly, but shows chaining)
  });
}


//using async await
async function printNumber(){
  for(let i=1;i<=10;i++){
    await showNumber(i)
    console.log(i)
  }
}
//printNumber();
