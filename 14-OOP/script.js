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

// static method with constructor function
Person.sentMail = function(){
  console.log('mail has sent')
}

Person.sentMail()

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

// es6 class

class Human{
  constructor(firstName,birthday){
    this.firstName=firstName;
    this.birthday=birthday;
  }
  // Methods will be added to .prototype property
  calAge(){
    console.log(2037-this.birthday)
  }

  greet(){
    console.log(`Hey ${this.firstName}`)

  }

  // static method
  static contactUs(){
    console.log('our team will contact to you.')
  }
}
const h1=new Human('kiw',1996)
h1.calAge()

console.log(h1.__proto__ === Human.prototype)

// same as above greet internal funcational
// Human.prototype.greet = function(){
//   console.log(`Hey ${this.firstName}`)
// }

h1.greet();
//h1.contactUs()// error because it is not part of h1 object
Human.contactUs()// working well
// points to remrember regarding class
//1. classes are not hoisted
//2. classes are first class citizen const hu = class {} // are just treated as function
//3. classes are executed in strict mode

// Getter and Setter

//A.) getter and setter with regular object

const account = {
  name:'max',
  depostMoney:[200,300,100,40,500],

  get money(){
    return this.depostMoney.pop();
  },
  set money(money){
    return this.depostMoney.push(money);
  } 
}

console.log(account.money) // used as property evenif You defined as function
account.money = 1000;
console.log(account.depostMoney)

//B.) getter and setter with classes

//Notes:

//The getter (get) retrieves the value of the private properties _name and _age.
//The setter (set) checks for valid input before updating the values of _name and _age.
//The underscore before the property name (e.g., _name) is a common convention to indicate that //it's a private property (though not strictly enforced in JavaScript).


class PersonCl {
  constructor(name, age) {
    this._name = name; // Using underscore to indicate that this property is private
    this._age = age;
  }

  // Getter for the name
  get name() {
    return this._name;
  }

  // Setter for the name
  set name(newName) {
    if (typeof newName === 'string' && newName.length > 0) {
      this._name = newName;
    } else {
      console.log("Please provide a valid name.");
    }
  }

  // Getter for the age
  get age() {
    return this._age;
  }

  // Setter for the age
  set age(newAge) {
    if (typeof newAge === 'number' && newAge > 0) {
      this._age = newAge;
    } else {
      console.log("Please provide a valid age.");
    }
  }
}

// Example usage
const person = new PersonCl("John", 30);

console.log(person); // John
person.name = "Jane"; // sets the name to Jane s1.age=2000; // treated as property jabki defined kiya hai as function

console.log(person.name); // Jane

person.age = -5; // Invalid age, triggers the error message
console.log(person.age); // 30 (age didn't change)


// example stopwatch example

class StopWatch {

  //Encapsulated the duration and startTime properties by prefixing them with an underscore (_) and providing getter and setter methods for both.

  constructor() {
    this._duration = 0;     // Using private variables (underscore prefix) for encapsulation
    this._startTime = null; // Initially, no start time
  }

  // Getter for duration
  get duration() {
    return this._duration;
  }

  // Setter for duration
  set duration(value) {
    if (value >= 0) {
      this._duration = value;
    } else {
      console.log("Duration cannot be negative.");
    }
  }

  // Getter for startTime
  get startTime() {
    return this._startTime;
  }

  // Setter for startTime
  set startTime(value) {
    console.log(value)
    if (value instanceof Date || value === null) {
      this._startTime = value;
    } else {
      console.log("Please provide a valid date.");
    }
  }

  start() {
    if (this._startTime) {
      console.log("Stopwatch is already running.");
    } else {
      this.startTime = new Date();// y value sent ho jye gi insidse startTime setter method 
    }
  }

  stop() {
    if (!this._startTime) {
      console.log("Stopwatch has not started.");
    } else {
      const seconds = (new Date().getTime() - this._startTime.getTime()) / 1000;
      this.duration += seconds; //y value sent ho jye gi insidse duration setter method
      this.startTime = null; // Reset start time after stopping
    }
  }

  reset() {
    this.duration = 0;
    this.startTime = null;
  }
}

const sw = new StopWatch();



// protptype inheirtance using Object.create() method

// esmy __proto connect with explicitly with any object

const PersonProto = {
  getAge(){
    console.log(2037- this.birthday)
  },
  init(firstName,lastName){
    this.firstName=firstName;
    this.lastName=lastName;
  }
}

const steven = Object.create(PersonProto) //__proto__ property connect to directly to PersonProto , not automaticallu connect as constructor function 
steven.name='max';
steven.birthday=2000;
steven.getAge()// 37
console.log(steven.__proto__ === PersonProto) //true

const sarah = Object.create(PersonProto)
sarah.init('jony','williams')
console.log(sarah) // {firstName:'jony',lastName:'williams'}