'use strict'


console.log('*********** Hgher order function **********')


//remove space from words

const removeSpace = function(str){
  return  str.replace(/ /g,'').toLowerCase();

}

const firstWordUppercase = function(str){
  const [first,...others] = str.split(' ')
  return [first.toUpperCase(),...others].join(' ')
}


//Higher order function
const transform = function(str,fn){
  console.log(`original str= ${str}`)
  console.log(`Transform= ${fn(str)}`)
  console.log(`function name is= ${fn.name}`)
}


transform('india is the great country',firstWordUppercase) //INDIA is the great country
transform('india is the great country',removeSpace) //indiaisthegreatcountry

// HOF also provide abstraction (transform method don't know how string is converted)

//JS use callbacks all the times
const high5 = function(){
  console.log('hello')
}

document.body.addEventListener('click',high5);
['a','b','c'].forEach(high5)

// function returing function

// const greet = function(greeting){
//   return function(...args){
//     console.log(args) //stevan ['Max','']
//     console.log(`${greeting},${args.join(' ')}`)
//   }
// }

//arrow function
const greet = greeting => (...args) => {
    console.log(args) //stevan ['Max','']
    console.log(`${greeting},${args.join(' ')}`)
  }




const greetSay = greet('hello')
greetSay('Max','kumar')
greetSay('steven')