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