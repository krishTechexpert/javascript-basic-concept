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