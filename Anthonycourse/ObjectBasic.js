//POJO -> plain old javascript object

const emp = {name:'krish',age:20};
const key="age";
console.log(emp[key])//20
emp[true]="yes";

emp[1]="one";
console.log(emp[1])//one//automatically convert like that emp[1].toString()="one"
console.log(emp["1"]);//one
console.log(emp.true)//yes

emp.add = function(){return "hi"};

console.log(emp)

console.log(3=='3')//true
console.log(3==='3')//false
console.log(['3']=='3');//true b'coz ['3'].toString() automatically convert into '3'
console.log(['3'].toString()=='3')//true
//console.log(['3'] === '3');//false 
/*
Explanation:
['3'] is an array containing a single string element "3".
When using == (loose equality), JavaScript performs type coercion.
The array ['3'] is converted to a string by calling .toString(), which results in "3".
The comparison then becomes "3" == "3", which is true.*/


const person = new Object();
person["firstName"]="raj";
person["lastName"]="singh";
person["age"]=40;
const myAge="age";
console.log(person);
console.log(person[myAge]);//40
person.address = new Object();

person.address.street="111 Main st.";
person.address.city="New York";
person.address.state="NY";

console.log(person.firstName);
console.log(person.address.city);
console.log(person["address"]["street"]);
//10/2/25
//call by value
var a=10;
var b=a;
a=2;
console.log(a);
console.log(b);
//call by reference
var c = {name:'kk'};
var d=c;
console.log(d===c);//true both points to same location so reference is same
console.log(d==c);//true b'coz d.toString()==c.toString();//value is same
d.name='java';
console.log(d);
console.log(c);

//string
var str="hello"; // this is immutable, it will not change in memory
str=str+" world";
console.log(str);// hello world..it will store in new memory;
/*📝 What Happens in Memory?
"hello" is stored at some memory location.
str + " world" creates a new string "hello world", stored in a different memory location.
str now points to this new string, and the old "hello" may be garbage collected.*/


//when function execution


//this keyword

//this points to global object
function a1(){
  console.log(this);//window obj
  this.newvaraible='hello';
}
a1();
console.log(newvaraible);//hello
console.log(window.newvaraible);//hello 

var b1=function(){
  console.log(this);//window obj
}
b1();

//this points to now object person

//example 1
const Human = {
  name:'krish',
  log:function(){
    this.name='krish 2';
    console.log(this);//Human obj.
  }
}
Human.log();

//example 2

const c1 = {
  name:'c object',
  log:function(){
    this.name='updated c object';
    console.log(this);//name='updated c object''
  },
  log2:function(){

    this.name='apple';

     var setName = function(newName){
      this.name=newName;
      console.log(this);// this points to window b'coz setName()will be called by window.setName()
      //if you want this will point to c1 object then used arrow function here
      //as arrow function has no its own this but it will take value of this from surrounding environment(lexical scope which means where arrow function is physicaaly sit in programe i.e inside log2 fun. check log3 function

    }
    setName('mango');

  },
  log3:function(){

    this.name='orange';

     var setName = (newName) => {
      this.name=newName;
      console.log(this);// this points to c1 obj c1={name:'kiwi',log:f,log2:f,log3}

    }
    setName('kiwi');

  },
  //another way if you don't want to used arrow function it work well
  log4:function(){
    let self=this;
    self.name='licchi';

     var setName = function(newName){
      self.name=newName;
      console.log(self);// this points to c1 obj c1={name:'gravue',log:f,log2:f,log3}

    }
    setName('gravue');

  },
}
c1.log();
c1.log2();
c1.log3();
c1.log4();

// Arrays

var arr = [
  1,
  "hello",
  function(name){
    var greeting="hello ";
    console.log(greeting+name);
  },
  {
    name:'tony',
    address:'111 Main st.'
  }
]
console.log(arr);
arr[2](arr[3].name);//hello tony

//arguments and spread

//arguments: the parameters you pass to a function
//javascript gives you a keyword of the same name which contains  them all.

function greet(firstName,lastName,language){
  //language=language || 'en'; you can also set default paramete like (firstName,lastName,langugae='en)
  if(arguments.length === 0) {
    console.log('Missing parameters');
    console.log('-----------');
    return;
  }

  console.log(firstName);
  console.log(lastName);
  console.log(language);
  console.log(arguments);//is array which contains value of parametes] like [],['raj],['tony','john'],['tony','john','en'],
  console.log('----------')
}
greet();//undefined undefined undefined due to hoisting(which setup memory space for these varaible)
greet('raj'); //raj,undefined,undefined
greet('tony','john');
greet('tony','john','en');

//11/2/2025

//IIFE (Immediate Invoked Function expression)

var name="Hola";
const showName = function(name){
  return `hello ${name}`;
}('krish')
console.log(showName);

//closure

function greet(whatTosay){
  return function(name){
    console.log(whatTosay + ' '+ name);
  }
}
greet('hi')('krish');


//most asked closure interview question 

function buildFunctions(){
  var arr=[];
  for(var i=0;i<3;i++){
    arr.push(function(){
      console.log(i);//closure create ho reha hai yha per
    })
  }
  return arr;

}
var fs = buildFunctions();
fs[0]();//3
fs[1]();//3
fs[2]();//3

/*explanation with under the hood
1.) when this programe runs then it first create global Execution Context(GEC) inside main call stack.
which contains buildFunction body and var fs;
2.) when this line encounter var fs = buildFunctions(); which will be executed

it also create its own GEC which contains i=3 and arr[f0,f1,f2]; 
and
buildFunctions() has popout from stack..but  memory space for i,arr that execution context is still hanging around.


3.) now this line  fs[0]() executed . which will create its own GEX and and find this function , hey I have no i varaible..so it will go to parent scope and take value of i which is 3 and pop out.
same process with follow with step 3 as well for fs[1] and fs[2]
*/


// above closure example without let how we can acheived results with 0,1,2

function buildFunctions2(){
  var arr=[];
  //don't used let
  for(var i=0;i<3;i++){
    // let j=i;
    // arr.push(function(){
    //   console.log(j);0,1,2
    // })

    //way-1
    function abc(i){
      return function(){
        console.log(i);//0,1,2
      }
    }
    //arr.push(abc(i))


    //way-2 using IIFE
    arr.push((function(j){
      return function(){
        console.log(j);//0,1,2
      }
    }(i)))
  }
  return arr;

}
var fs2 = buildFunctions2();
fs2[0]();//0
fs2[1]();//1
fs2[2]();//2


/* -------------Function factories ----------- */

function makeGreeting(language){
  return function(firstName,lastName){
    if(language=='en'){
      console.log('hello '+ firstName + ' '+lastName);
    }
    if(language =='es'){
      console.log('hola '+ firstName + ' '+lastName);
    }
  }
}

const greetEnglish = makeGreeting('en');
const greetSpanish = makeGreeting('es');

greetEnglish('john','doe');
greetSpanish('john','doe');


/* -------------Closure and Callbacks ----------- */

function sayHiLater(){
  const greeting='hi';
  setTimeout(function(){
      console.log(greeting); // closure bn reha hai..and setTimeout conain callback function 
      //which will executed after 3 seconds
  },3000)
}

sayHiLater();

//callback function: A function you passed to another function as arguments, to be run when the other function  is finished..hey fn jab tum sum calculate ker logy toh mera callback run ker lna for printing output.
function sum(a,b,callback){
  const c=a+b;
  callback(c);
}


/* -------------Call,apply,bind ----------- */

const person5 = {
  firstName:'john',
  lastName:'dow',
  getFullName:function(){
    var fullName = this.firstName + ' ' + this.lastName;
    return fullName;
  }
}

const logName = function(lang1,lang2){
  console.log('Logged: '+this.getFullName())
}
//function borrowing
logName.call(person5,'en','es');//Logged: john dow

const logPersonName = logName.bind(person5);
console.log(logPersonName());//Logged: john dow

logName.apply(person5,['en','es']);

(function(){
  var fullName = this.firstName + ' ' + this.lastName;
  return fullName;
}).apply(person5,['hi','pb'])

//bidn with function currying

//function currying: Creating a copy of a function but with some preset parameters

function multiply(a,b){
  return a*b;
}
const multiplyby5 = multiply.bind(null,2);
//bind like function multiplyby5(2,b){return 2*b;}
console.log(multiplyby5(5));//10

// Date 12/02/2025

/*-------- Prototypal inheritance ------------------*/
/*Inheritance: One Object gets access  to the properties and methods of another object*/

const people = {
  firstName:'default',
  lastName:'default',
  age:20,
  getFullName:function(){
    return this.firstName + ' ' + this.lastName;
  }
}

const john = {
  firstName:'John',
  lastName:'doe',
}
john.__proto__=people // don;t do this..b'coz modern browser does automatically for us..otherwisse app will slowdown
//john.__proto__=people :  it will point like [[prototype]]:Object(it means people obj)
//john.__proto__= null try also this it will break prototype chain


console.log(john.getFullName());
console.log(john.firstName); 
// first it will look inside john obj if property not availble then go to people obj see age
console.log(john.age);//20
//console.log(people.getFullName.call(john))

const jane = {
  firstName:'jane',
  __proto__:john // it will point like [[prototype]]:Object(it means john obj)
}

console.log(jane.lastName);//doe
console.log(jane.age);//20
console.log(jane);
//when you print console.log(jane) the you will see prototype chain in browser console.

//everythin is an object 

let a2 = {}// a2.__proto points to Object{}
let b2=function(){}// b2.__proto__ points to empty function such as function Empty(){}
b2.__proto__.bind;// that 's why you can access bind method 
let c2=[];//c2.__proto__ points to array which conatins all array method such as  [concat:f,push:f] etc.

/*------- Reflection and Extend ---------- */

/**
 * Reflection: An object can look at itself, listing and changing its properties and methods.
 */

for(prop in jane){
  console.log(prop + ' : '+ jane[prop])
}


/** Section-06: ------- Building Objects ------------ */

// way to building object
//1. object literal obj ={}
//2. new Object();
//3 function constructor new Person()
//4 class
//5 Object.create()
//6 Factory function 
//7 json

//1. Object Literal (Most Common)
const pop = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  getFullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
};

console.log(pop.getFullName()); // "John Doe"

//2. Using new Object()
const mack = new Object();
mack.firstName = 'John';
mack.lastName = 'Doe';
mack.age = 30;
mack.getFullName = function() {
  return this.firstName + ' ' + this.lastName;
};

console.log(mack.getFullName()); // "John Doe"

//3. Using a Constructor Function

function Person(firstName, lastName, age) {
  console.log('krishna')
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  // this.getFullName = function() { // if we create 10 object then each object contain getfullName() method which consume memory.. so we can save memory by using prototype
  //   return this.firstName + ' ' + this.lastName;
  // };
}

Person.prototype.getFullName = function(){ // esko  ek bar memory milegi for 10 new Object
  return this.firstName + ' ' + this.lastName;
}
//without new
//const joh1 =  Person('John1', 'Doe', 30);// it is normal function which retrun undefined
const joh = new Person('John', 'Doe', 30);
console.log(joh)

console.log(joh.getFullName()); // "John Doe"
//👉 Useful when creating multiple objects with similar properties.

//4. Using ES6 Classes (Recommended for OOP)

class Joe {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  getFullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

const joe = new Joe('John', 'Doe', 30);
console.log(joe.getFullName()); // "John Doe"
//👉 Preferred for Object-Oriented Programming (OOP).

//5. Using Object.create()
const personPrototype = {
  getFullName: function() {
    return this.firstName + ' ' + this.lastName;
  }
};

const jax = Object.create(personPrototype);
jax.firstName = 'John';
jax.lastName = 'Doe';

console.log(jax.getFullName()); // "John Doe"
//👉 Used for prototype-based inheritance.

//6. Using Factory Functions
function createPerson(fName,lName,age){
  return {
    fName,lName,age,
    getFullName(){
      return `${this.firstName} ${this.lastName}`;
    }
  }
}
const Peter = createPerson('max','luck',30);
console.log(Peter.getFullName());
//👉 Useful for creating multiple objects without using new.

//7. Using JSON (JSON.parse() and JSON.stringify())
const jsonString = '{"firstName": "John", "lastName": "Doe", "age": 30}';
const moh = JSON.parse(jsonString);

console.log(moh.firstName); // "John"


/** ------ What is Prototype in JavaScript? ---------- */

/*In JavaScript, prototype is a mechanism that allows objects to inherit properties and methods from other objects. Every JavaScript function (except arrow functions) has a prototype property, which is an object that serves as a blueprint for creating new objects.

1. Understanding Prototype Chain
Every JavaScript object has an internal property called [[Prototype]], which refers to another object.
When you try to access a property or method on an object, JavaScript first looks for it on the object itself.
If it’s not found, it searches in the object's prototype (__proto__).
This process continues up the prototype chain until it reaches null.*/

//2. Example of Prototype in Action

function Pascal(name, age) {
  this.name = name;
  this.age = age;
}

// Adding a method to the prototype
Pascal.prototype.sayHello = function () {
  return `Hello, my name is ${this.name}`;
};

const luck = new Pascal('luck', 25);
console.log(luck.sayHello()); // "Hello, my name is John"

// Checking the prototype chain
console.log(luck.__proto__ === Pascal.prototype); // true
console.log(Pascal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true

/**Key Takeaways:
sayHello is not inside john, but inside Person.prototype, and john can access it through prototype inheritance.
john.__proto__ points to Person.prototype.
The prototype chain eventually leads to Object.prototype.
 */

//3. Prototype vs __proto__
//prototype: A property of functions that is used when creating new objects with new.
//__proto__: A property of objects that refers to their prototype.
console.log(Pascal.prototype); // The prototype object {sayHello:fn}
console.log(luck.__proto__);   // Points to Pascal.prototype {sayHello:fn}
console.log(luck.__proto__ === Pascal.prototype); // true

/** 4. Prototype Inheritance  */
//You can use prototypes to create inheritance between objects.

//Inheritance allows an object to use properties and methods from another object.
//We will create a parent class (Animal) and a child class (Dog) that inherits from Animal.


// Step 1: Define a constructor function for the parent class

function Animal(name){
  console.log(this)//Dog{}

  this.name = name; // Every animal will have a name property
}
// Step 2: Add a method to the Animal prototype

Animal.prototype.speak = function(){
  return `${this.name} makes a sound`; // A general method for all animals
}
// Inheriting Animal prototype in Dog
// Step 3: Define a constructor function for the child class

function Dog(name,breed){
  console.log(this);//Dog{}
  Animal.call(this, name); // Inherit the 'name' property from Animal
  //Animal.call(this, name); // Calls Animal and sets this.name = name
  //Animal k ander this treat as dog object
//internally work like   this.name = name; // Copying from Animal manually
//But instead of manually copying, we reuse Animal using call().

/*5. When Should You Use call()?
Use call() when you want to "inherit" properties from a parent constructor function inside a child constructor function.
This is how classical constructor inheritance works in JavaScript.*/


  this.breed = breed; // Dog-specific property

  //👉 This makes sure that Dog has a name and breed, but it does NOT yet inherit the speak() method.
// / Link Dog to Animal Using Object.create()


}
// Set prototype of Dog to be an instance of Animal
// Step 4: Set Dog’s prototype to be an object created from Animal’s prototype
//Dog : {name:'Buddy' , [[prototype]]:Animal}
Dog.prototype = Object.create(Animal.prototype) //This line makes sure that Dogs can use methods from Animals. both will work such as 
//Dog.prototype = {...Animal.prototype} //create new object

// in simple words, create copy all animale methods and put inside in new object

/*👉 What does this do?

Creates a new object that is linked to Animal.prototype.
Makes Dog.prototype inherit from Animal.prototype.
Now, all Dog instances can use speak() from Animal.*/

//What Happens If We Use Dog.prototype = Animal.prototype;?
//Now, both Dog.prototype and Animal.prototype point to the same object in memory.
//because both will  points to same memory location
// Incorrect way: Both Dog and Animal share the same prototype
//Dog.prototype = Animal.prototype;

const dog1 = new Dog("Buddy", "Golden Retriever");
dog1.speak = function () {
  return `${this.name} barks!`;
};

console.log(dog1.speak()); // "Buddy barks!"

const animal1 = new Animal("Leo");
console.log(animal1.speak()); // "Leo barks!" ❌ (should be "Leo makes a sound")

/*Problem?
Since Dog.prototype and Animal.prototype now refer to the same object, any change in Dog.prototype will also affect Animal.prototype.
This means if we add bark() or override speak() in Dog.prototype, it will also change Animal.prototype, which is wrong!*/

//Why Object.create(Animal.prototype) is the Correct Way
/*How This Works
Object.create(Animal.prototype) creates a new empty object that inherits from Animal.prototype.
Dog.prototype now has its own object, which is linked to Animal.prototype, but they are not the same object.*/

// Correct way: Dog.prototype is a separate object linked to Animal.prototype
//Dog.prototype = Object.create(Animal.prototype);

const dog3 = new Dog("Buddy", "Golden Retriever");
dog1.speak = function () {
  return `${this.name} barks!`;
};

console.log(dog3.speak()); // "Buddy barks!" ✅

const animal3 = new Animal("Leo");
console.log(animal3.speak()); // "Leo makes a sound" ✅ (Animal is unchanged)

/*Now, What Happened?
Dog.prototype inherits from Animal.prototype, but they are not the same object.
We can now modify Dog.prototype without affecting Animal.prototype.*/


// Step 5: Reset the constructor property (otherwise, it will point to Animal)
Dog.prototype.constructor = Dog;

/**
 * 
 * 🔹 Why is this needed?
When we do Dog.prototype = Object.create(Animal.prototype);, it overwrites Dog.prototype, and the constructor now points to Animal.
So, we manually set Dog.prototype.constructor = Dog; to fix this.


 */

/*👉 Why do we need this?

When we set Dog.prototype = Object.create(Animal.prototype);, the constructor gets lost.
We fix it by setting Dog.prototype.constructor = Dog;.*/

//Case 1: If We Don't Use Dog.prototype.constructor = Dog;
 //console.log(dog.constructor); 
// Output: [Function: Animal] ❌ (Wrong, should be Dog)

//Confusion: If someone checks dog.constructor, they might think dog is an instance of Animal, not Dog.

//This makes no sense because Dog is a child class, and its constructor should be Dog, not Animal.

//✅ If you don't set it, JavaScript automatically assigns Animal as the constructor (which is incorrect).


// Step 6: Add a new method specific to Dog

Dog.prototype.bark = function () {
  return `${this.name} barks`;
};

// Step 7: Create an instance of Dog

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog);
console.log("dog= " + dog.speak() + " " + dog.bark())

// Step 8: Call inherited and own methods
//This method dog.speak() is shared by all animals instead of being duplicated.

console.log(dog.speak()); // "Buddy makes a sound" (from Animal prototype)
console.log(dog.bark());  // "Buddy barks!" (from Dog prototype)

// Step 9: Checking the prototype chain
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
console.log(dog.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true


/**
 * 
 * Step-by-Step Explanation
1.) Creating the Animal constructor:

function Animal(name) { this.name = name; }
When we create an Animal, it will have a name property.
2.) Adding a method to Animal.prototype:

Animal.prototype.speak = function () { return this.name + " makes a sound"; };
This method is shared by all animals instead of being duplicated.
3.)Creating the Dog constructor:

function Dog(name, breed) { Animal.call(this, name); this.breed = breed; }
Animal.call(this, name); calls the Animal function, making sure Dog gets the name property.
4.) Setting Dog.prototype to inherit from Animal.prototype:

Dog.prototype = Object.create(Animal.prototype);
This makes Dog inherit all methods from Animal.prototype.
5.) Fixing the constructor property:

Dog.prototype.constructor = Dog;
By default, the constructor will still point to Animal, so we manually fix it.
6.) Adding a bark method to Dog.prototype:

Dog.prototype.bark = function () { return this.name + " barks!"; };
This method is only for dogs, not for all animals.
7.) Creating an instance of Dog:

const dog = new Dog("Buddy", "Golden Retriever");
dog now has both name and breed, and it can use speak() from Animal and bark() from Dog.
8.) Calling the methods:

dog.speak(); → "Buddy makes a sound" (from Animal.prototype)
dog.bark(); → "Buddy barks!" (from Dog.prototype)
9.) Checking prototype relationships:

dog instanceof Dog → true ✅ (Yes, dog is an instance of Dog)
dog instanceof Animal → true ✅ (Yes, dog is also an instance of Animal)
dog.__proto__ === Dog.prototype → true ✅ (dog inherits from Dog.prototype)
Dog.prototype.__proto__ === Animal.prototype → true ✅ (Dog inherits from Animal)
Summary
 . Prototype inheritance lets Dog reuse Animal’s properties and methods.
 . Avoids duplication because speak() is stored in Animal.prototype, not inside each Dog object.
   Prototype chain:
 . dog → Dog.prototype → Animal.prototype → Object.prototype → null
  Let me know if you need any more clarifications! 😊🚀

 * 
 */



/*. Checking Prototypes
You can check an object’s prototype using:

Object.getPrototypeOf(obj)
instanceof operator*/
console.log(Object.getPrototypeOf(luck) === Pascal.prototype); // true
console.log(luck instanceof Pascal); // true

/**
 * Summary
Prototype is an object from which other objects inherit properties and methods.
Objects in JavaScript have a __proto__ property that points to their prototype.
Functions have a prototype property used for creating new objects.
JavaScript uses prototype chaining to look up properties and methods.
ES6 class syntax is just a cleaner way of working with prototypes.

 * 
 */


/*--------- 15/02/25 polyfill */
//Polyfill: code that adds a feature which the engine may lack.

if(!Object.create){
  Object.create = function(o){
    if(arguments.length>1){
      //Ensures that Object.create is only called with one argument. If more than one argument is provided, an error is thrown.

      throw new Error('Object.create implementation'+ 'only accept the first parameter')
    }
    function F(){};//A temporary constructor function F is created.
    
    
    F.prototype=o;//The prototype of F is set to o, meaning that any object created using F will inherit from o.
    
    console.log(F);
    return new F();
  }
}

//Syntactic sugar : A different way to type something that does not change how it works under theh hood.

const d1=[];
console.log(typeof d1);//object
console.log(d1.toString());//empty
console.log(Object.prototype.toString.call(d1));//[object Array] confirming that d1 is an array. 
//returns the internal [[Class]] of the object, formatted as "[object Type]".
//better way
/**Object.prototype.toString.call(d1)  => is a better way to determine the type of d1 compared to using typeof because it provides more accurate results, especially for distinguishing between different built-in objects.

 */
console.log(Array.isArray(d1)); // true

/**Alternative Approach Using Array.isArray()
 * It is more readable and faster than using Object.prototype.toString.call().

 */

console.log(Object.prototype.toString.call([]));        // "[object Array]"
console.log(Object.prototype.toString.call({}));        // "[object Object]"
console.log(Object.prototype.toString.call(null));      // "[object Null]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
console.log(Object.prototype.toString.call(123));       // "[object Number]"
console.log(Object.prototype.toString.call("Hello"));   // "[object String]"
console.log(Object.prototype.toString.call(new Date()));// "[object Date]"
console.log(Object.prototype.toString.call(/regex/));   // "[object RegExp]"
console.log(Object.prototype.toString.call(function(){})); // "[object Function]"


/*function Mary(name){
  this.name=name;
}
const e = new Mary('Maary');
console.log(typeof e);//object
console.log(Object.prototype.toString.call(e));//[object object]
console.log(e instanceof Mary);//true

 function Mary(name) {
  this.name = name;
}

Mary.prototype.toString = function() {
  return `[object ${Mary.name}]`;
};

const e1 = new Mary("Maary");

console.log(e1.toString()); // "[object Mary]"
*/
 
/**
 * Conclusion
✅ Object.prototype.toString.call(value) is a more reliable way to determine an object's type than typeof.
✅ For checking arrays specifically, Array.isArray(value) is the best method.
✅ toString.call() is helpful when dealing with various built-in objects like Date, RegExp, and null.

 */

/******** 16/2/25 Promise, Async and await ***********/
//Transpile: Convert the syntax of one programming language to another such as typescript,jsx convert into javascript

//Promise: A standardized approach  to dealing with asynchronous events and callbacks

const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function CustomPromise(executor) {
    let state=PENDING;
    let value=null;
    let handlers=[];
    let catches =[];

    function resolve(result){
      if(state !== PENDING) return;

      state=FULFILLED;
      value=result;

      handlers.forEach((fn) => fn(value));
    }

    function reject(err) {
      if(state !== PENDING) return;
      state = REJECTED;
      value=err;
      catches.forEach(fn => fn(err));
    }

    this.then = function(callback){
      console.log('run...'+callback)
        if(state == FULFILLED){
          callback(value)
        }else {
          handlers.push(callback);
        }
    }

    executor(resolve,reject);
}

const doWork = (res,rej) => {
  setTimeout(() => {res('hello world')} ,1000);
}





const someText = new CustomPromise(doWork);//1sec ka wait ho reha hai toh tab tak  then() ko run ker do and push then callback inside handlers Array, after 1 sec
//resolved method execute.

someText
.then((val) => {
  console.log('1st log: '+ val)
})

someText.then((val) => {
  console.log('2nd log: '+ val)
})

setTimeout(() =>{
  someText.then((val) => {
    console.log('3rd log: '+ val)
  })
},3000)

//simple another example

function myPromise(executor){
  let successCallBack;
  let errorCallBack;

  this.then = function(callback){
    successCallBack = callback; // Store the function for later use
  }
  
  this.catch = function(callback){
    errorCallBack=callback;// Store the function for later use
  }
  
  function resolve(value){
    if(successCallBack){
      successCallBack(value)
    }
  }

  function reject(err){
    if(errorCallBack){
      errorCallBack(err)
    }
  }
      // Immediately call the executor function and pass `resolve` and `reject`

  executor(resolve,reject)

}

const promise = new Promise((resolve,reject) => {
  setTimeout(() => {resolve('hello krish')},1000)
})

// This allows us to store `.then()` and `.catch()` callbacks

promise.then(function(value){
  console.log(`Results success:${value}`)
})

promise.then(function(value){
  console.log(`Results success2:${value}`)
})

//🔹 Example 1: Normal Callback Function

function doWork1(callback){
  setTimeout(() => {callback('I am callback')},2000)
}

doWork1((message) => {
  console.log(message);
});

//🔹 Example 2: Same Concept, but Using a Promise

function doWork2(){
  return new Promise((resolve,reject) => {
      setTimeout(() => {resolve("I am callback 2")},2000)
  })
}

doWork2().then((message) => {
  console.log(message);
  return message;//chaining
}).then((value) => {
  console.log("hello "+value)
});


/*********Sequential Promises in JavaScript (E-commerce Example)
A sequential promise means executing multiple promises one after another (in order), where each step depends on the previous step's result.
Let's say you are placing an online order. The steps are:
1️⃣ Select a product
2️⃣ Make a payment
3️⃣ Confirm the order
4️⃣ Ship the product

Each step depends on the success of the previous step.

 */

function selectProduct(){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log("1️⃣ Product selected: Laptop");
      resolve('Laptop')
    },1000)
  })
}

function makePayment(product){
  return new Promise((resolve) => {
    setTimeout(() => {
        console.log(`2️⃣ Payment successful for ${product}`);
        resolve("Payment ID: 12345");
    }, 2000);
});

}

function confirmOrder(paymentId) {
  return new Promise((resolve) => {
      setTimeout(() => {
          console.log(`3️⃣ Order confirmed with ${paymentId}`);
          resolve("Order ID: 98765");
      }, 1500);
  });
}

function shipProduct(orderId) {
  return new Promise((resolve) => {
      setTimeout(() => {
          console.log(`4️⃣ Product shipped with ${orderId}`);
          resolve("Tracking ID: XYZ123");
      }, 2500);
  });
}

selectProduct()
.then(makePayment)
.then(confirmOrder)
.then(shipProduct)
.then((statusMsg) => {
  console.log(statusMsg)
})

/**
 * 1️⃣ Promise.all() → Runs multiple promises in parallel
📌 Waits for all promises to resolve; fails if ANY promise rejects.
✅ Best for running independent tasks together.
❗ If ANY promise rejects, Promise.all() immediately fails.


* 
 */

//Example: Fetching product details, price, and stock
const fetchProductDetails = new Promise((resolve) => 
  setTimeout(() => resolve("Product: Laptop"), 1000)
);

const fetchPrice = new Promise((resolve,reject) => 
  setTimeout(() => resolve("Price: $1000"), 2000)
);

const fetchStock = new Promise((resolve) => 
  setTimeout(() => resolve("Stock: Available"), 1500)
);

Promise.all([fetchProductDetails, fetchPrice, fetchStock])
  .then((values) => console.log("✅ All Data:", values))
  .catch((error) => console.log("❌ Error:", error));
//(3) ['Product: Laptop', 'Price: $1000', 'Stock: Available']


/** 2️⃣ Promise.allSettled() → Waits for all, never fails
📌 Waits for ALL promises to settle (resolve or reject), without stopping.
✅ Best when you need results for all tasks, even if some fail.
✔ No error stops execution—each promise reports success or failure.

 */
//Example: Fetching data, where one API might fail
function fetchUser(){
  return new Promise((resolve) => 
    setTimeout(() => resolve("User Data"), 1000)
  );
} 


function fetchOrders(){
  return new Promise((resolve,reject) => {
    setTimeout(() => reject("Order API failed"), 2000)

  })
}

Promise.allSettled([fetchUser(), fetchOrders()])
  .then((results) => console.log("✅ Results:", results));

  // ✅ Results: [
  //   { status: 'fulfilled', value: 'User Data' },
  //   { status: 'rejected', reason: 'Order API failed' }
  // ]
  

  /**
   * 3️⃣ Promise.race() → First to finish wins
📌 Resolves/rejects as soon as the FIRST promise settles.
✅ Best for timeout logic (e.g., cancel if API is too slow).
*✔ The fastest resolved promise is returned.
❗ If the first one rejects, the race immediately fails.

 
*/

//Example: Fastest response wins
const fastAPI = new Promise((resolve) => 
    setTimeout(() => resolve("Fast API Response"), 1000)
);

const slowAPI = new Promise((resolve) => 
    setTimeout(() => resolve("Slow API Response"), 3000)
);

Promise.race([fastAPI, slowAPI])
    .then((result) => console.log("✅ First response:", result));

    //✅ First response: Fast API Response

/**
 * 4️⃣ Promise.any() → First successful one wins
📌 Resolves when ANY promise succeeds; ignores failures until one succeeds.
✅ Best when you want the first available success.

✔ Only the first success is returned.
❗ If ALL promises fail, it returns an AggregateError.


  */

//Example: Multiple API endpoints (fastest success wins)
const api1 = new Promise((resolve, reject) => 
  setTimeout(() => reject("API 1 failed"), 1000)
);

const api2 = new Promise((resolve) => 
  setTimeout(() => resolve("API 2 success"), 2000)
);

const api3 = new Promise((resolve) => 
  setTimeout(() => resolve("API 3 success"), 1500)
);

Promise.any([api1, api2, api3])
  .then((result) => console.log("✅ First successful:", result))
  .catch((error) => console.log("❌ All failed:", error));

  //✅ First successful: API 3 success
