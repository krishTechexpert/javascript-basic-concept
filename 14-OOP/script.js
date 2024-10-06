'use strict';

function Person(firstName,lastName){
  this.fN=firstName;
  this.lN=lastName;
  
}

const p1=new Person("max","suvi");

// step
//1. New {} is created
//2. function is called this = {}
//3. {} is linked to prototype
//4. function automatically return
console.log(p1)
console.log(Person.prototype)

Person.prototype.getFullName= function(){
  console.log(`hello Mr. ${this.fN} ${this.lN}`)
}
p1.getFullName()
// .prototyeOfLinkedObjects

// Prototypal Inheritance on Built-In Objects
console.log(p1.__proto__ === Person.prototype) // true

console.log(p1.__proto__.__proto__) // Object.prototype ( top of prototype chain)

console.log(p1.__proto__.__proto__.__proto__) // null

// similarly with array
const arr = [3,6,6,5,6,9,9] // new Array === []
console.log(arr.__proto__) // Array.prototype
console.log(arr.__proto__ === Array.prototype) // true
console.log(arr.__proto__.__proto__) // Object.prototype ( top of prototype chain)

Array.prototype.unique = function(){
  return [...new Set(this)]
}

console.log(arr.unique()); // [3,6,5,9]


///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

function Car(make,speed){
  this.make=make;
  this.speed=speed;
}

Car.prototype.accelerate = function(){
  const increaseSpeed = this.speed + 10;
  this.speed = increaseSpeed;
  console.log('accelerate=',this.speed)
}

Car.prototype.break = function(){
  const decreaseSpeed = this.speed-5;
  this.speed = decreaseSpeed;
  console.log('Break=',this.speed)
}

const car1 = new Car('BMW',120);
car1.accelerate();
car1.accelerate();
car1.accelerate();
car1.accelerate();
car1.break();
const car2 = new Car('Mercedes',95);
car2.accelerate();
car2.break();