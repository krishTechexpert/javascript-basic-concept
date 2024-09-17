'use strict';

// option chaining demo

console.log('*********** Option Chaining ?. ********************')

const person = {
  name:'max',
  age:30,
  permanentAddress:{
    street:'los angles',
    city:'pencilvania'
  }
}




const permanentAddress = person.permanentAddress.city;
console.log(permanentAddress) //pencilvania


//const currentAddress1 = person.currentAddress.city;  (undefined.city which gives error)
//console.log(currentAddress1) //Uncaught TypeError: Cannot read properties of undefined (reading 'city') because there is no currentAddress property inside person 

// how we can fixed error using option chaining (?.)
const currentAddress = person.currentAddress?.city;
console.log(currentAddress) // undefined , here our application will not break because it check left hand side of ? then evaluate property not present then return undefined



// old ways
// if(person.address.city){
//   console.log('city found')
// }
// else {
//   console.log('city not found')
// }

// new ways
const currentAddress2 = person.currentAddress?.city || 'north carilona'; // person.currentAddress not exists
console.log(currentAddress2) //north carilona

person.currentAddress = {
  city:'washington'
}

const currentAddress3 = person.currentAddress?.city || 'north carilona';
console.log(currentAddress3) // washington

//Coding challenge 1 [when || operator not work as our expectaion)]

// if property does not exists then  only set some default values is north carilona using (||)


// now try to give any falsy value in city and city and currentAddress also exists ( || operator not work as our expectaion)
 person.currentAddress = {
  city:'' // any false value such as 0,'',null,false,undeined etc.
}
 const currentAddress4 = person.currentAddress.city || 'north carilona';
 console.log(currentAddress4)//north carilona 
 //expected result should be city ='' which is not matched


 //Coding challenge 2 [when nulish operator (??) solved above problem ]

// if property does not exists then  only set some default values is north carilona using (??)


// now try to give any falsy value in city and city and currentAddress also exists ( || operator not work as our expectaion)
person.currentAddress = {
  city:'' // any false value such as 0,'',null,false,undeined etc.
}
 const currentAddress5 = person.currentAddress.city ?? 'north carilona';
 console.log(currentAddress5)//'' 
 //expected result should be city ='' which is matched

 const personCountry = person.country ?? 'north carilona';
 console.log(personCountry)// north carilona because country not exists then evaluate next expression


 //Note: 

 //?? Nullish operator:  if value is null or undefined then next expression evaluated otherwise it retrun whatever value such as currentAddress5 which retrun ''

 // || operator : if value is falsy then it sets default value such as currentAddress4 which should noy happen so ?? is used to set default value which is good appraoch

 
// OptionChaining with Array

 let cat = [ {
  name:'pety',
  color:'brown',
  age:0 // falsy value you need just observed
 }]

console.log(cat[0]?.age || '2') // 2 which is not expected
console.log(cat[0].age ?? '2') // 0 which is expected

//we want that if age is null and undefined only set default values

cat[0].age=null; 

console.log(cat[0]?.age || '2') // 2 which is not expected
console.log(cat[0].age ?? '2') // 2 which is expected

cat=[];
console.log(cat[0]?.name ?? 'empty array')

cat = [ {
  name:'pety',
  color:'brown',
  age:0 // falsy value you need just observed
 }]

// you can check also function exists or not
console.log(cat[0].calcAge?.() ?? 'function not exists')

