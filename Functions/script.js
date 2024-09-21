'use strict';

console.log('****** ES6 Default Parameters')

// default parameters

const bookings = []
// function createBooking(flightNum,numPassenger,price){
//   //ES5
//    numPassenger = numPassenger || 1;
//    price = price || 199;
//   const booking = {
//     flightNum,
//     numPassenger,
//     price
//   }
//   console.log(booking)
//   bookings.push(booking)
// }

function createBooking(flightNum,numPassenger=1,price=199){
  const booking = {
    flightNum,
    numPassenger,
    price
  }
  console.log(booking)
  bookings.push(booking)
}
createBooking('LH123') // {flightNum: "LH123",numPassenger: 1,price: 199}
createBooking('LH123',20,2000) //{flightNum: "LH123",numPassenger: 20,price: 2000}
createBooking('LH123',undefined,30) //{flightNum: "LH123",numPassenger: 1,price: 30}
createBooking('LH123',null,30) // {flightNum: "LH123",numPassenger: null,price: 30}

// default parameter expresssion
function createBooking1(flightNum,numPassenger=1,price=199 * numPassenger){
  const booking = {
    flightNum,
    numPassenger,
    price
  }
  console.log(booking)
  bookings.push(booking)
}
createBooking1('LH123',6) // {flightNum: "LH123",numPassenger: 6,price: 1194} As we have not given price value then it will take default price value with calculate expreassion
createBooking1('LH123',5,2000) //{flightNum: "LH123",numPassenger: 5,price: 2000} // it will overwrite 2000 value here
