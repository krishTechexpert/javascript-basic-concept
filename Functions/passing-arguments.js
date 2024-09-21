'use strict';

console.log('*******How Paasing Arguments works: Value vs Reference  ********')

const flight = 'LH123';
const passengerObj={
  name:'Max',
  passport:123456
}

const checkIn = function(flightNumber,passenger){
  flightNumber='LH235';
  passenger.name = 'Mr.'+passenger.name;

  if(passenger.passport === 123456){
    console.log('Checked In')
  }
  else {
    console.log('Invalid Passport')
  }
}
//checkIn(flight,passengerObj) //flight means sending value and passengerObj means sending reference/object
//console.log(flight,passengerObj)

const newPassport = function(passenger){
  const newNumber = Math.trunc(Math.random() * 10000);
  passenger.passport = newNumber;
}
newPassport(passengerObj) 
checkIn(flight,passengerObj) // invalid 
console.log(flight,passengerObj)

// Point to remmember
// javascript works for passed by value not passed by reference..
//but here passed by object looks like passed by reference.. but Object is also value but internally sending reference..
