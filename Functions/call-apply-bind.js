'use strict';

console.log('**** Call ,apply and Bind method ********')

const udemyCourse = {
  course:'php',
  duration:'30 hours',
  price:399,
  booking:[],
  buyCourse(userName,courseId){
    console.log(`${userName} has buy ${this.course} course and ${this.price} amount has paid`)
    this.booking.push({user:userName,courseId})

  }
}

udemyCourse.buyCourse('Max','101')
udemyCourse.buyCourse('Ravi','102')
console.log(udemyCourse)

const metaCourse = {
  course:'c++',
  duration:'12 hours',
  price:699,
  booking:[],
  author(authorName,userName){
    console.log(`the ${this.course} has written by ${authorName} paid by ${userName}`)
  }
}
// does not work
//const metaCourse1 = udemyCourse.buyCourse;
//metaCourse1('John','103')

// you have to used call or apply method
udemyCourse.buyCourse.call(metaCourse,'John','103')
//console.log(metaCourse)

const googleCourse = {
  course:'Phython',
  duration:'24 hours',
  price:999,
  booking:[],
}

const google = udemyCourse.buyCourse;

google.call(googleCourse,'Krish','104');

// apply methood
const Fb = ['nikki','105'];
//google.apply(googleCourse,Fb)

// you can used rest operator which will work same as apply method
google.call(googleCourse,...Fb)
console.log(googleCourse)

// bind() method // which will not execute immediatetly rather than it return functions
console.log('Bind method example')
const venkyCourse1=udemyCourse.buyCourse.bind(metaCourse,'venky','106')
venkyCourse1();
// we can set some predeined values which will constant
const venkyCourse2=metaCourse.author.bind(metaCourse,'Jonas') // here we preset author value
venkyCourse2('sinschen'); // here we passed username who buy course
//console.log(metaCourse)

// bind with event listeners

metaCourse.courseSold=10;

metaCourse.courseCount = function(){
  console.log(this)
  this.courseSold++;
}

//document.querySelector('.buy').addEventListener('click',metaCourse.courseCount) // here this points to Button Element

document.querySelector('.buy').addEventListener('click',metaCourse.courseCount.bind(metaCourse))
console.log(metaCourse) // here now this points to metaCourse object


// one use case for Bind: can also used for partial application 
const addTax = (rate,value) => value + value * rate;
console.log(addTax(.1,200)) // 220

const addVAT = addTax.bind(null,.23) // so here we reset the value for rate(.23) which is common for all course and 

//VAT is different for each states when you buy course so we can call addVAT here like
console.log(addVAT(100)) // 123
console.log(addVAT(23)) // 28.29



// Coding challenge

const poll = {
  question:'What is your favourite programming language?',
  options:['0:javascript','1:Phython','2:Rust','3:C++'],
  answers:new Array(4).fill(0), // [0,0,0,0]
  registerNewAnswer(){
    console.log(this)
    let ques = this.question+ '\n';

    this.options.forEach(function(item){
      ques +=  item + '\n'
    })
    
    const myQuestion = prompt(ques);
    if(myQuestion>=0 && myQuestion <this.options.length) {
      const ans = Number(myQuestion)
      this.answers[ans]++;
    }else{
      alert('only allowed answe between 0-3')
    }
    this.displayResult()
    this.displayResult('string')
  },
  displayResult(type='array'){
    if(type === 'array') {
      console.log(this)
      console.log( "answer :", this.answers)
      return;
    }
    console.log( "poll results are:", ...this.answers.join(','))
  }
}

// 1. create a method called 'registerNewAnswer' on the 'Poll' object. the method does 2 things:
/*1.1 Display a prompt window for user to input the number of the selected option. the prompt should look like this:
What is your favourite programming language?
0:javascript
1:Phython
2:Rust 
3: C++

1.2 Based on the input number, update the answer array. For Example, if option is 3,increase the value AT Position 3 of the array by 1.Make sure to check if the input is number and if the number make sense (e.g answer 52 would not make sense, right?)

2. Call this method whenever user clicks the  "Answer poll" button
3. create a displayResult method which display the poll results. the method take string as an input (called 'type'), which can be either 'string' or 'array'. if type is array, simply display the results array as it is, using console.log(). this should be the default options. if type is string, display a string like "Poll results are  13,2,5,1".
4. Run the 'displayResult' method at the end of each 'registerNewAnswer' method call.
*/


document.querySelector('.poll').addEventListener('click',poll.registerNewAnswer.bind(poll))

poll.displayResult.call({answers:[5,2,3]})
poll.displayResult.call({answers:[5,2,3]},'string')