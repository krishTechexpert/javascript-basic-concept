'use strict';

console.log('*********** Strings **********')

// *********** String ***************

const strName='kRishna'; // output =Krishna
const firstPart = strName.toLowerCase()[0].toUpperCase();
const remainPart = strName.toLowerCase().slice(1);
console.log(firstPart + remainPart) // Krishna

// replace
const words = 'These is the tv and is color is white';
console.log(words.replace('is','are')) // These are the tv and is color is white (replace only first occurance)
console.log(words.replaceAll('is','are')) // replace everywhere // These are the tv and are color are white

console.log(strName.replace(strName[0],strName[0].toUpperCase()))

// using regex
console.log(words.replace(/is/g,'are')) //These are the tv and are color are white

function metroChecking(str){
  const items = str.toLowerCase();
  if(items.includes('gun') || items.includes('Knife')){ // make sure case sensitive case: gun and Gun not same
    console.log('you are not allowed')
  }else{
    console.log('Welcome to Metro')
  }

}

metroChecking('I have gun')
metroChecking('I have Knife')
metroChecking('I have some foods and clothes')

const fruits = 'mango color is yellow';
console.log(fruits.startsWith('mango') && fruits.endsWith('yellow')) // true
console.log(fruits.startsWith('Mango') && fruits.endsWith('yellow')) // false


// padStart

console.log('krishna'.padStart(3,'$')) //3>krishna.length // krishna
console.log('krishna'.padStart(12,'$')) // 12 > krishna.length // $$$$$krishna

// masking credit card number using padding
const creditCardNumber = function(num){
  const str= String(num);
  const last = str.slice(-4)//0664
  const result=last.padStart(str.length,'X');
  console.log(result);
}
creditCardNumber(1234567890664)
creditCardNumber(12345678)//XXXX5678
creditCardNumber(1234567890645345345345)