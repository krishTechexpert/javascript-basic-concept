'use strict';

console.log('*** closure *******')

const secureBooking = function(){
  let passengerCount=0;
  return function(){
    passengerCount++;
    console.log('total booking is',passengerCount)
  }
}
const booked=secureBooking();
booked();
booked();
booked();
console.dir(booked)

//below some example of closure also which does not return any value but create closure also.
//example 1
let f;



const g = function(){
  const a=23;
  f=function(){ //reasign value in f
    console.log(a*2)
  }
}
g();
f();//46
// Keep in mind f() still was able to used all the varaibles in the variable environment inwhich it was created
console.dir(f) // it contain closure a:23

const h = function(){
  const b=100;
  f=function(){ //reasign value in f
    console.log(b*2)
  }
}

h();
// overwrite/reasign f
f();// 200
console.dir(f) //// it contain closure b:200


// example2

const OTPCode = function(deliveryBoy,wait){
  const food='pizza';
  setTimeout(function(){
    console.log(`congratulation your ${food} was delivered by ${deliveryBoy} `)
  },wait * 1000)

  console.log(`you will receive otp within ${wait} seconds`)
}

OTPCode('Max',3)
// here variable environment also contain parameters, variables as closure
console.dir(OTPCode);

// keep in mind that setTimeout function  completely independently runs but still was able to used all the varaibles in the variable environment inwhich it was created


// closure also priority over scope chain . let me explain below

//what if I used const food = 'pizza' as global variable then local variable take priority first



// Explain to your self beow code inwhich how header access when we click on document

( function(){
  const header = document.querySelector('h1');
  header.style.color='red';

  document.querySelector('body').addEventListener('click',function(){
    header.style.color='blue'; // yha per header  closure create ker reha hai ,
    // function call and removed from stack. and body has event listener attached
    // so jab humny body pr click kiya toh kese header ny remember ker liya ki header h1 tag hai yha per. due to closure
  })

})()

//when this IIFE function executed , it will popout from stack as we already know that
// and that function no longer access and also event is attached on body already
// so jab hum click kroga tab header accceesible nhi hoga. really try to find answer.

// environment in which function here is created already gone but still able to access variable that were created in that variable environment by the time when function was born.

// event handler function also remember all the variable present of its birth