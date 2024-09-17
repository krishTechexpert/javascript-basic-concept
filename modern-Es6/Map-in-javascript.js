'use strict';

console.log('******* Map in Javascript ******')

// Map: it is similar to object but contains key of any type such as key can be array,object,boolean,etc; As you know already that in Object key can be only string.

const emp = new Map();
// set key
emp.set('name','Max');
emp.set(true,'get subscription')
emp.set(false,'not joined')
emp.set(['html','java','css'],'required skills') // array is key here
console.log(emp)

// delete key
emp.delete(false) // delete false key
console.log(emp)

// get keys
console.log(emp.get('name')) // Max

console.log(emp.get(['html','java','css'])) // undefined you need to store array in varaible and used as key [this key is not same as above array key both keep in sepeate location]

//But here we can achieve same location 
const lang = ['html','java','css'];
emp.set(lang,'required skiils')

console.log(emp.get(lang)) //required skiils because lang is store in Heal which poinsts to same location

// key can be also dom element as H1
emp.set(document.querySelector('h1'),'Heading')
console.log(emp)

// has key return true or false
console.log(emp.has('name')) // true
console.log(emp.has(true)) // true
console.log(emp.has(lang)) // true
console.log(emp.has(1)) // no key as 1 so false

// expression evaluate
console.log(emp.get('get subscription' == emp.get(true))) // both true and we are trying to get true key which gives values= get subscription

// chaining
emp.set('dept','IT').set('location','ncr')
console.log(emp)



// If you are trying to insert multiple value then you can used alternate to sets
// for example

const question = new Map([
  ['question','what is your favourite programming language'],
  [1,'C'],
  [2,'Java'],
  [3,'Javascript'],
  ['correct',3],
  [true,'right answer'],
  [false,'try again']
])

console.log(question)

//show question
console.log(question.get('question'))

// iterate answers
for(let [key,value] of question){
  if(typeof key === 'number'){
    console.log(`Answer ${key}: ${value}`)
  }
}

//let answers=Number(prompt('enter your answer'))
let answers =3;
console.log(question.get(answers === question.get('correct')))

// convert map to array
console.log([...question])
console.log([...question.keys()])
console.log(question.values())



// Coding Challenge 1

const gameEvents = new Map([
  [17,'GOAL'],
  [36,'Substitutaion'],
  [47,'GOAL'],
  [61,'Substitutaion'],
  [64,'Yellow card'],
  [69,'Red Card'],
  [70,'Substitutaion'],
  [72,'Substitutaion'],
  [76,'GOAL'],
  [80,'GOAL'],
  [92,'Yellow card']
])

/** 
 * Create an array events of the different game events that happened (no duplicate)
 */

let noDuplicateEvents=[...new Set(gameEvents.values())]
console.log(noDuplicateEvents)

console.log(gameEvents.delete(64))
console.log(gameEvents)

let time=90/2; // 45 mintues
for(let [key,value] of gameEvents.entries()){
if(key < time){
  console.log(`[FIRST HALF] ${key}: ${value}`)
}
else{
  console.log(`[SECOND HALF] ${key}: ${value}`)

}

}


