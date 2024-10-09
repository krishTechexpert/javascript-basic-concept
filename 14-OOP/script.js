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


///////////////////////////////////////
// Coding Challenge #2 ES6 class

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class BMWCar {

  constructor(){
    this._speed = 0;
  }

  get speedUs(){
    return this._speed/1.6;
  }
  set speedUs(value){
    if(value>0) {
      this._speed = value;
    }
    
  }

  accelerate(){
    this.speedUs = this._speed + 10;
    //this._speed = this.speedUs;
  }
  brake(){
    this.speedUs = this._speed - 5;
  }
}

const c1=new BMWCar();
c1.accelerate();
c1.accelerate();
c1.accelerate();
c1.accelerate();
c1.brake()
console.log(`car speed is ${c1.speedUs}`)


// Inheritance between "classes": Constructor function 

// Parent Constructor

// problem is that we are not able to access calcAge inside TraineeEmp. see solution below
// const Emp = function(firstName,birthYear){
//   this.firstName=firstName;
//   this.birthYear=birthYear;
// }
// // Adding method to the Emp prototype
// Emp.prototype.calcAge = function(){
//   console.log(2037-this.birthYear)
// }

// // Child Constructor
// const TraineeEmp = function(firstName,birthYear,company){
//   // dont' use dupicate code so try to inheritance from parent class
//   // this.firstName=firstName;
//   // this.birthYear=birthYear;

//   // Inherit properties from Emp constructor
//   Emp.call(this,firstName,birthYear) // working fine
//   this.company=company;
// }

// // Adding method to the TraineeEmp prototype
// TraineeEmp.prototype.introduce = function(){
//   console.log(`my name is ${this.firstName} and I am working in ${this.company}`)
// }

// const te1= new TraineeEmp('mike',1996,'google');
// te1.introduce(); // my name is mike and I am working in google

// te1.calcAge(); // give error because this is not inherit by tel1 object. so we have to manaually link TraineeEmp.prototype to Emp.prototype. This ensures that instances of TraineeEmp can access methods defined on Emp.prototype, including calcAge.
// console.log(te1)

//Solution: 

const Emp = function(firstName,birthYear){
  this.firstName=firstName;
  this.birthYear=birthYear;
}
// Adding method to the Emp prototype
Emp.prototype.calcAge = function(){
  console.log(2037-this.birthYear)
}

// Child Constructor
const TraineeEmp = function(firstName,birthYear,company){
  // dont' use dupicate code so try to inheritance from parent class
  // this.firstName=firstName;
  // this.birthYear=birthYear;

  // Inherit properties from Emp constructor
  Emp.call(this,firstName,birthYear) // working fine
  this.company=company;
}

// Inheritance of Methods: I used Object.create(Emp.prototype) to link TraineeEmp.prototype to Emp.prototype. This ensures that instances of TraineeEmp can access methods defined on Emp.prototype, including calcAge.

//manually Linking prototype
TraineeEmp.prototype = Object.create(Emp.prototype);

//TraineeEmp.prototype = Emp.prototype// not work b'coz both points to Emp.Prototype and we loose connected btween traineeEmp and Emp
//such as te1 --> __proto__ --> TraineeEmp -->__proto --> Emp (tis is our connection for our understanding)

//important points

 //te1. __proto points to Emp.prototype which should be points to TraineeEmp

// Set TraineeEmp's constructor back to TraineeEmp (optional but recommended)
TraineeEmp.prototype.constructor = TraineeEmp; // now te1. __proto points to TraineeEmp.prototype
//and it will point to our child constructor function and refer to child constructor function


// Adding method to the TraineeEmp prototype
TraineeEmp.prototype.introduce = function(){
  console.log(`my name is ${this.firstName} and I am working in ${this.company}`)
}

const te1= new TraineeEmp('mike',1996,'google');
te1.introduce(); // my name is mike and I am working in google
te1.calcAge(); // 41
console.log(TraineeEmp.prototype.constructor)
 console.log(te1.__proto__) //refer to child prototype
 console.log(te1.__proto__.__proto__) // refer to parent prototype

 console.log(te1 instanceof TraineeEmp)// ofcourse true
 console.log(te1 instanceof Emp)// true b'coz //manually Linking prototype





///////////////////////////////////////
// Coding Challenge #3 very importnat polymorphism

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
// parent constructor
function CarEV(make,speed){
  this.make=make;
  this.speed=speed;
}

CarEV.prototype.accelerate = function(){
  const increaseSpeed = this.speed + 10;
  this.speed = increaseSpeed;
  console.log('accelerate=',this.speed)
}

CarEV.prototype.break = function(){
  const decreaseSpeed = this.speed-5;
  this.speed = decreaseSpeed;
  console.log(`${this.make} going at ${this.speed} km/h `)
}


// child constructor
const EV = function(make,speed,charge){
  CarEV.call(this,make,speed);
  this.charge=charge;
}
EV.prototype=Object.create(CarEV.prototype) // now EV has access to both method{acceleerate:(),break()} of parent

EV.prototype.chargeBattery = function(chargeTo) {
  this.charge=chargeTo;
  console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}% `)

}

EV.prototype.accelerate = function(){
  this.speed = this.speed + 20;
  this.charge = this.charge - 1;
  console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}% `)
}
// EV.prototype.brake = function(){
//   this.speed = this.speed -10;
//   this.charge=this.charge-1;
//   console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}% `)

// }

const ev1 = new EV('Tesla',120,23)
ev1.chargeBattery(90)
console.log(ev1)
ev1.break()
ev1.accelerate();
console.log(EV.prototype.constructor) // this poinsts to parent constructor
EV.prototype.constructor=EV;
console.log(EV.prototype.constructor) // now this poinst to child constructor and this is recommend approach

//as it should be linking like ev1 obj --> EV proto --> CarEV proto


//  inheritance with class ES6

class Student extends Human {
  constructor(firstName,birthday,course ){
    super(firstName,birthday)
    this.course=course;
  }
  greet(){
    console.log(`Hey ${this.firstName} and I am studing ${this.course}`)
  }

}

const std = new Student('krish',2000,'computer science')
std.greet();
std.calAge();
console.log(std)

// last way inheritance Between classes : Object.create ( without new keyword)

const PersonProto2 = {
  calcAge(){
    console.log(2037- this.birthYear)
  },
  init(firstName,birthYear){
    this.firstName=firstName;
    this.birthYear = birthYear;
  }
}

const stev = Object.create(PersonProto2)

const StudentProto = Object.create(PersonProto2)

StudentProto.init = function(firstName,birthYear,course){
  PersonProto2.init.call(this,firstName,birthYear)
  this.course = course;
}
StudentProto.init('jk',2000,'phython')

StudentProto.introduce = function(){
  console.log(`my name is ${this.firstName} and I am working in ${this.course}`)
}

const jay=Object.create(StudentProto)
jay.init('jay',2010,'html')
jay.introduce();//my name is jay and I am working in html
jay.calcAge(); //27





class Account {
  constructor(owner,currency,pin){
    this.owner=owner;
    this.currency=currency;
    this._pin=pin;
    this._movements=[];
    this.locale=navigator.language;
  }
  getMovements(){
    return this._movements;
  }
  deposit(amount){
    this._movements.push(amount)
  }
  // some kind of little bit abstraction b'coz we give positive value but add here negative value 
  widthdrawl(amount){
    this._movements.push(-amount)
  }
  // suppose this methods our bank internal method which is not accesible out of account object here need some data protection then we need to make variable and method private using underscore(_)..
_approveLoan(){
    return true
  }

  requestLoan(amount){
    if(this._approveLoan) {
      //this.movements.push(amount)
      this.deposit(amount)
      console.log('Loan approved')
    }
  }


}

const myAccount = new Account('krish','IND',1111)
//myAccount.movements.push(200)
//myAccount.movements.push(-100)
myAccount.deposit(200)
myAccount.widthdrawl(100)
myAccount.requestLoan(1000)
console.log(myAccount)
//console.log(myAccount._movements) // it is accessible outside not fully supported
//console.log(myAccount.getMovements())

// data privacy and data encapsulation