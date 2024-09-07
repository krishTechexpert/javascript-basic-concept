'use strict';

// generate random number
function randomNumberFn(){
  return Math.trunc(Math.random() * 20) + 1 //0-19
}
let randomNumber = Number(randomNumberFn())

// access Html element
const showRandomNumber=document.querySelector('.number');
const inputElement=document.querySelector('.guess');
const checkInput = document.querySelector('.check');
const scoreElement=document.querySelector('.score');
const higherScore=document.querySelector('.highscore');
const againElement=document.querySelector('.again')

// default value
let lastScore=0; 
let stop=false;
console.log(randomNumber)

// generate new Html Element
function generateNewHtmlElement(text){
  const div=document.createElement('div');
  div.textContent=`You ${text}!`
  div.id='result';
  div.style.color= (text==='win'?'green':'red');
  div.style.paddingTop='10px';
  div.style.paddingBottom='10px';
  document.querySelector('h1').append(div)
}


// check handler
checkInput.addEventListener('click',function(){
  const userInput = Number(inputElement.value)

  if(userInput<=0){
    return;
  }
  if(userInput<=20 && !stop){
    
    if(randomNumber === userInput){
      const higherS=Number(higherScore.textContent);
      const score=Number(scoreElement.textContent)
      lastScore= higherS < score ? score : higherS;
      higherScore.textContent=lastScore;
      stop=true;
      showRandomNumber.textContent=randomNumber;
      generateNewHtmlElement('win')
      }
    else {
      if(scoreElement.textContent == 0){
       
      scoreElement.textContent=0;
      showRandomNumber.textContent=randomNumber;
      generateNewHtmlElement('loss')
      stop=true
      return;
      }
      scoreElement.textContent--
    }
  }
})

// retry again
againElement.addEventListener('click',function(){
  const userInput = Number(inputElement.value)
  randomNumber = Number(randomNumberFn())
  console.log(randomNumber)
    inputElement.value='';
    stop=false;
    higherScore.textContent=lastScore;
    showRandomNumber.textContent='?';
    scoreElement.textContent=20;
    document.getElementById('result')?.remove()

})
