/** --------------------17/2/25------------------------ */
 //Chapter 7: POJO -> plain old javascript object
/*-----------------------------------------------*/

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

const pet ={species:"Dog",name:"Elton",age:1};
console.log(pet);
console.log(typeof pet);//object
console.log(Object.prototype.toString.call(pet));//[object Object]

console.log(pet["species"]);//Dog
const props = "species";
console.log(pet[props]);//Dog
//but
console.log(pet.props);//undefined b'coz there is no props property exists in pet object
pet.props = "4"
console.log(pet["props"]);//4

//All key get "stringified" it means all key will be in string format that is rule we can say if any key is in number format then it will automatically converted into string inetrnally by using toString() method
let o1={
  1:"hello",
  "1":"goodbye"
}

//o1.[1]="hello";
//o1.["1"]="goodbye";
//what is o1[1]?
console.log(o1);//{1:'goodbye'}
console.log(o1[1]);// goodbye' automatically convert into toString() method
console.log(o1[1].toString());// goodbye'

pet[true]="hello"; //b'coz behind the scene all key converted into string with help og toString() method internally
pet[1]="hi";
console.log(pet); /*
{
    "1": "hi",
    "species": "Dog",
    "name": "Elton",
    "age": 1,
    "props": "4",
    "true": "hello"
}*/
console.log(pet["true"]);//hello
console.log(pet[1]);//same as pet["1"] // result is hi

pet.bark = function(){
  return 'WOOF WOOF!'
}
console.log(pet.bark());//WOOF WOOF!

/** ------------------17/2/25-------------------------- */
 //Chapter 8: Mixing Data & Functions with Objects
/*-----------------------------------------------*/

function getTraingleArea(a,b){
  return (a*b) /2;
}
console.log(getTraingleArea(3,4));//6

function getTraingleHypotenuse(a,b){
  return Math.sqrt(a**2 + b**2);
}
console.log(getTraingleHypotenuse(3,4));//5

let myTri = {
  a:3,
  b:4,
  getArea:function(){
    return (this.a * this.b) / 2;
  },
  getHypotenuse(){
    return Math.sqrt(this.a**2 + this.b**2);

  }
}
console.log(myTri.getArea());//3.5
console.log(myTri.getHypotenuse());//5  

myTri.a=5;
myTri.b=12;
console.log(myTri.getArea());//8.5
console.log(myTri.getHypotenuse());//13  


/** -------------------17/2/25------------------------- */
 //Chapter 9: classes
/*-----------------------------------------------*/

//classes are blueprint of funcationality
//Defines of the methods each instance of Traingle will have
class Traingle {
  getArea(){
    return (this.a * this.b) / 2;
  }
  getHypotenuse(){
    return Math.sqrt(this.a**2 + this.b**2);

  }
}

const firstTri = new Traingle();
firstTri.a=3;
firstTri.b=4;
console.log(firstTri.getArea());//6
console.log(firstTri.getHypotenuse());//5
console.log(typeof firstTri);//object
console.log(firstTri instanceof Traingle);//true



/** -----------------17/2/25--------------------------- */
 //Chapter 10: Constructor 
/*-----------------------------------------------*/
//this refer to instance of class
// constructor function always just return undefined
class Traingle2 {
  constructor(a,b){
    this.a=a;
    this.b=b;
  }
  getArea(){
    return (this.a * this.b) / 2;
  }
  getHypotenuse(){
    return Math.sqrt(this.a**2 + this.b**2);

  }
}

const secondTri = new Traingle2(3,4);
console.log(secondTri.getArea());//6

//what can you do in the constructor
// validate data ,assign properties 

class Traingle3 {
  constructor(a,b){

    /**
     * A finite number is a number that is not infinity or NaN (Not a Number). In JavaScript, a finite number is any real number that can be represented within the limits of the IEEE 754 floating-point standard.

    Examples of Finite Numbers:
    ✅ 10, -50.25, 0, 3.14, -9999999, 1.7976931348623157e+308 (largest finite number in JavaScript)

    Examples of Non-Finite Numbers:
    ❌ Infinity, -Infinity, NaN (Not a Number)

    console.log(Number.isFinite(42));        // true
    console.log(Number.isFinite(-3.14));     // true
    console.log(Number.isFinite(Infinity));  // false
    console.log(Number.isFinite(-Infinity)); // false
    console.log(Number.isFinite(NaN));       // false
    console.log(Number.isFinite("100"));     // false (because it's a string)

    Note:

    Difference from isFinite()
      JavaScript also has a global isFinite() function, but it converts the value to a number before checking:

      console.log(isFinite("100"));      // true (converted to number 100)
      console.log(Number.isFinite("100"));// false (strict check, no conversion)

     */

    if(!Number.isFinite(a) || a<=0){
      throw new Error(`Invalid a: ${a}`);
    }

    if(!Number.isFinite(b) || b<=0){
      throw new Error(`Invalid b: ${a}`);
    }

    this.a=a;
    this.b=b;
  }
  getArea(){
    return (this.a * this.b) / 2;
  }
  getHypotenuse(){
    return Math.sqrt(this.a**2 + this.b**2);

  }
}

//const thirdtri = new Traingle3(-1,10);
//console.log(thirdtri);//Invalid a:-1 [-1<=0 true]




/** -----------------17/2/25--------------------------- */
 //Chapter 11: Bank Account mini project 
/*-----------------------------------------------*/

class BankAccount {
  constructor(accountName,accountNumber,balance=0){
    this.accountName=accountName;
    this.accountNumber=accountNumber;
    this.balance=balance;
  }
  addDeposit(amt){
    if(amt>0){
      this.balance += amt;
    }else {
      throw new Error("amount should be greater than 0")
    }
  }

  getWidthdrawl(amt){
    if(amt>0 && amt<this.balance){
      this.balance -=amt;
    }
    else {
      throw new Error('inSucificent amount')
    }
  }
  checkBalance(){
    console.log("My total balance is "+this.balance);
  }
}

const person1 = new BankAccount("max","123");
person1.addDeposit(200);
person1.getWidthdrawl(100);
person1.checkBalance();



/** -----------------18/2/25--------------------------- */
 //Chapter 11: Inheritance basic 
/*-----------------------------------------------*/

/*When you create a function (whether it's a regular function or a constructor function), it inherits from Function.prototype internally.
function myFunction() {} // Regular function
function Animal(name) { this.name = name; } // Constructor function

console.log(myFunction.__proto__ === Function.prototype); // true ✅
console.log(Animal.__proto__ === Function.prototype); // true ✅
Both myFunction and Animal are functions, so their __proto__ points to Function.prototype.

🔍 Step-by-Step Understanding
1️⃣ All functions in JavaScript (including constructor functions) are objects.
2️⃣ Every function is created using the Function constructor, so it inherits from Function.prototype.
3️⃣ This means Function.prototype is the prototype for all functions.

+------------------------------+
|  Function: Animal / myFunction |
+------------------------------+
| __proto__  -----> Function.prototype ✅ |
| prototype  -----> {} (empty, unless modified) |
+------------------------------+

🚀 Extra Clarification
🔹 prototype → Used for instances (when you use new Animal()).
🔹 __proto__ → Used for inheritance (functions inherit from Function.prototype).

suppose cat want to know i forgot to from where i inherit..
cat object is created by Animal so cat.__proto which help to determine hey cat you are inherited from Animal.prototype
cat.__proto__ = Animal.prototype

Suppose cat wants to know where it inherited from...

The cat object was created by Animal, so when cat.__proto__ is checked, it helps determine:
"Hey cat, you inherited from Animal.prototype!"
This means:
cat.__proto__ === Animal.prototype; // true ✅
We do NOT manually set cat.__proto__ = Animal.prototype; this happens automatically when we use new Animal().

"cat.__proto__ automatically points to Animal.prototype when cat is created using new Animal()."

*/

function Animal(name){
  this.name=name;
}
Animal.prototype.speak = function(){
  return `${this.name} make sounds`;
}
const cat = new Animal('cat');
console.log(Animal.__proto__===Animal.prototype);//false b'coz both are pointing to different prototype

//Animal is the function which are inherited from Function
//console.log(myFunction.__proto__ === Function.prototype); // true ✅
//console.log(Animal.__proto__ === Function.prototype); // true ✅

// cat is inherited from Animal so
console.log(cat.__proto__===Animal.prototype);

/*Understanding prototype and __proto__ with a Diagram
Here’s a visual representation of what’s happening in your code:
+------------------+
|   Function: Animal   |  (A function itself)
+------------------+
| __proto__  ----->  Function.prototype  
| prototype  ----->  { speak: function }  (Used by instances)
+------------------+

         ⬇️  (new Animal('cat') creates an instance)

+------------------+
|  Object: cat     |  (Instance of Animal)
+------------------+
| name = 'cat'     |
| __proto__  ----->  Animal.prototype  
+------------------+
Breaking it Down:
1.) Animal is a constructor function, and all function in javascript are objects that inherit from
Function.prototype
console.log(Animal.__proto__ === Function.prototype); // true ✅

2.) Animal.prototype is the object that will be assigned as the prototype of instances created using new Animal().
console.log(cat.__proto__ === Animal.prototype); // true ✅ Connects an cat object to its Animal prototype

3.) Animal.__proto__ is not the same as Animal.prototype, because:

Animal.__proto__ refers to the prototype of the function itself (Function.prototype).
Animal.prototype is what instances (new Animal()) inherit from.
console.log(Animal.__proto__ === Animal.prototype); // false ❌

*/

console.log(Animal.__proto__ === Function.prototype); // true ✅ (Functions inherit from Function.prototype)
console.log(Animal.prototype === cat.__proto__); // true ✅ (Instances inherit from Animal.prototype)
console.log(Animal.__proto__ === Animal.prototype); // false ❌
console.log(Object.getPrototypeOf(Animal) === Function.prototype); // true ✅
console.log(Object.getPrototypeOf(cat) === Animal.prototype); // true ✅



/*Step 1: Understanding prototype and __proto__

Think of a Animal factory toys :

Animal is a factory that makes animal toys.
Animal.prototype is a blueprint that each toy follows.
cat is an animal toy created by the factory.

function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes sounds`;
};

const cat = new Animal("cat");
✅ This means that all animals (like cat) will have a speak() method because they follow this blueprint.



Step 2: What is prototype?
Every function in JavaScript has a prototype object.
It is used as a blueprint for the objects that the function creates.

console.log(Animal.prototype);{ speak: function }
✅ This means that all animals (like cat) will have a speak() method because they follow this blueprint.

Step 3: What is __proto__?
Every object in JavaScript has a __proto__ property, which points to the object it inherited from.

console.log(cat.__proto__ === Animal.prototype); // true ✅
✅ This means cat follows the Animal.prototype blueprint.

Step 4: What is Animal.__proto__?
Now, we check what the function Animal itself inherits from:
console.log(Animal.__proto__ === Function.prototype); // true ✅
✅ Why?
Because Animal is a function, and in JavaScript, all functions are objects that inherit from Function.prototype.

Step 5: Why is Animal.__proto__ !== Animal.prototype?
console.log(Animal.__proto__ === Animal.prototype); // false ❌
🤔 Why false?

Animal.__proto__ is about the function itself → It points to Function.prototype.(it inherited from Function.Prototype)
Animal.prototype is about instances of Animal → It is used by objects created with new Animal().


Final Summary
What?	What it does?
Animal.prototype	A blueprint for objects created with new Animal()
cat.__proto__	Points to Animal.prototype because cat follows the blueprint
Animal.__proto__	Points to Function.prototype because Animal is a function
Animal.__proto__ !== Animal.prototype	✅ TRUE, because they serve different purposes



🛠 Key Differences
Feature	            prototype	                                  __proto__
Who has it?	        Functions (like Animal)	                  Objects (like cat)
What does it do?	  Acts as a blueprint for objects	          Links an object to its blueprint
Example	            Animal.prototype.speak = function() {}	  cat.__proto__ === Animal.prototype
Purpose	Defines     what properties and methods will be inherited	  Connects an object to its prototype

*/

function Dog(name,breed){
  Animal.call(this,name);//Copies properties from the constructor
  this.breed=breed;
}
//Dog.prototype = Animal.prototype;//Animal ka reference share ho reha hai..so if we make changes in dog then it will reflect in lion also..bad practice..
//❌ But it also overwrites Dog.prototype.constructor!


//what is good approach try to create new object

console.log(Dog.prototype.constructor); // Dog ✅ (default before we overwrite it)
Dog.prototype = Object.create(Animal.prototype)//copy all methods(not properties) from animal to Dog
console.log(Dog.prototype.constructor); // Animal ❌ (incorrect!)


//✅ Object.create(Animal.prototype) creates a new object that inherits from Animal.prototype, instead of sharing the reference.

//❌ But it also overwrites Dog.prototype.constructor!



Dog.prototype.constructor = Dog; // Restore the correct constructor reference

Dog.prototype.bark = function(){
  return 'woof woof!';
}
const dog = new Dog('tomy','Golden Retriever');
console.log(dog.speak());//tomy make sounds
const lion = new Animal('lion king');
console.log(lion.speak())//lion king make sounds
//console.log(lion.bark() + " ")

console.log(Dog.prototype.constructor); // Dog ✅ (correct!)
console.log(dog.constructor); // Dog ✅ (correct!)

/*********** End ************ */

class ColorTraingle extends Traingle3{
  constructor(a,b,color){
    super(a,b);//call constructor of Traingle3
    this.color="red";
  }
}
const colorTraingle = new ColorTraingle(5,5);
console.log(colorTraingle);

class ColorMoodTraingle extends ColorTraingle {
  constructor(a,b,color,mood){
    super(a,b,color);//call constructor of ColorTraingle
    this.mood=mood;
  }
}

const colorMoodTraingle = new ColorMoodTraingle(5,5,"blue","happy");
console.log(colorMoodTraingle);


/** -----------------18/2/25--------------------------- */
 //Chapter 15: static properties 
/*-----------------------------------------------*/

//modern JS also offers "static properties" where individual pieces of data are on the class, not on instance.
//static property are the properties of class level data member
//it is also known as class attribute

//-------- static methods
//where methos is called on class, not an object
//static method does not have access to this class itself

class Student {
  static schoolName="DPS"; // here yoy can see schoolName is common for both students. that's why we make it static.
  constructor(rollNo,name,standard){
    this.rollNo=rollNo;
    this.name=name;
    this.standard=standard;
    
  }
  showMyRecord(){
    console.log(`hey my name is ${this.name} and I am student of ${this.standard} class in ${Student.schoolName}`);
  }

  static fees(){
    console.log(this);//this points to class Student itself(means class defination body)
  }
}

const std1 = new Student(100,'aryan','7');
std1.showMyRecord();
const std2 = new Student(101,'simran','12');
std2.showMyRecord();

Student.fees();


class MyMath{

  static add(a,b){
    return a + b;
  }
  static sub(a,b){
      return a - b;
    }
}
console.log(MyMath.add(10,20));

class Cat{
  constructor(name,breed) {
    this.name=name;
    this.breed=breed;
  }
  static registerStray(){
    const names = ["Muffin","Biscuit","Sleepy","Dodo","Princes","Butterface"];
    const name = choice(names);
    return new Cat(name,"unknown");
  }

  meow(){
    return `${this.name} says meow`;
  }
}

function choice(arr){
  let index = Math.floor(Math.random() * arr.length)
  return arr[index];
}

console.log(Cat.registerStray())//Cat {name:'Princes',breed:'unknown'}

//consider as factory function which is not releated to Cat but if we put inside Cat class and make static registerStray() method then it belongs to Cat class
function registerStray1(){
  const names = ["Muffin","Biscuit","Sleepy","Dodo","Princes","Butterface"];
  const name = choice(names);
  return new Cat(name,"unknown");
}

class User {
  static registerUser(username,password){}
  static token;
}
//coding exercise 1
class Book{
  constructor(title,author,year){
      this.title=title;
      this.author=author;
      this.year=year;
  }
}

class Ebook extends Book{
  constructor(title,author,year,fileSize){
      super(title,author,year);
      this.fileSize=fileSize;
  }
  
  download(){
      return `${this.title} and ${this.fileSize}`;
  }
}
//coding exercise 2
class ArrayUtils{
  constructor(){
      throw new Error("ArrayUtils cannot be instantiated.")
  }
  static average(arr){
      if(arr.length === 0) {
          throw new Error("Array cannot be empty.");
      }
      let sum=0;
      for(let i=0;i<arr.length;i++){
          sum+=arr[i];
      }
      return sum/arr.length;
  }
  
  static max(arr){
      let maxNumber=arr[0];
      for(let i=0;i<arr.length;i++){
          if(arr[i]>maxNumber){
              maxNumber=arr[i]
          }
      }
      return maxNumber;
  }
}

const arr=[1,2,3,4,5];
ArrayUtils.average(arr);
ArrayUtils.max(arr);
