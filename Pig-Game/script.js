'use strict';

const button = document.querySelectorAll('.btn');
const discImage  = document.querySelector('.dice');

// player 1
const player1 = document.querySelector('.player--0')
const  playerOneScore= document.getElementById('current--0')
const playerOneTotalscore = document.getElementById('score--0')

//player2
const player2 = document.querySelector('.player--1')
const  playerTwoScore= document.getElementById('current--1')
const playerTwoTotalscore = document.getElementById('score--1')


// default
let playerTurn;
let playerOneTotal=0;
let playerTwoTotal=0;


button.forEach(function(item){
  item.addEventListener('click',() => {
    
    if(item.classList.contains('btn--hold')){
      if(playerOneTotal >=100 || playerTwoTotal >=100) {
        return;
      }
      if(playerTurn === 'player-1') {
        updatePlayerOneScore()
        return;
      }
      if(playerTurn === 'player-2') {
        updatePlayerTwoScore()
        return;
      }
    }
    if(item.classList.contains('btn--roll')){
      if(playerOneTotal >=100 || playerTwoTotal >=100) {
        return;
      }
      const number = randomDisc()
      changeDiscImage(number)
      if(playerTurn === 'player-1') {
        calculatePlayer1Score(number)
        return;
      }
      if(playerTurn === 'player-2') {
        calculatePlayer2Score(number)
        return;
      }

    }
    if(item.classList.contains('btn--new')){
      discImage.classList.add('hidden')
      player2.classList.remove('player--active');
      player1.classList.add('player--active');
      GameStart()
      playerOneScore.textContent=Number(0)
      playerTwoScore.textContent=Number(0)
      playerOneTotal=0;
     playerTwoTotal=0;
     playerOneTotalscore.textContent=Number(0)
     playerTwoTotalscore.textContent=Number(0)
     player1.classList.remove('player--winner')
     player2.classList.remove('player--winner')

    }
  })
})

function randomDisc(){
  return  Math.trunc(Math.random() * 6)+1;
}


function changeDiscImage(number){
  discImage.classList.remove('hidden')
  discImage.src= `dice-${number}.png`;
}

function GameStart(){
      if(player1.classList.contains('player--active')){
          playerTurn='player-1'
      }
}
GameStart()

function updatePlayerOneScore(){
  playerOneTotal += Number(playerOneScore.textContent)
  playerOneTotalscore.textContent = playerOneTotal;
  if(playerOneTotal >=100) {
    player1.classList.add('player--winner')
    return;
  }
  moveToPlayer2();
}

function updatePlayerTwoScore(){
  playerTwoTotal += Number(playerTwoScore.textContent)
  playerTwoTotalscore.textContent = playerTwoTotal;
  if(playerTwoTotal >=100) {
    player2.classList.add('player--winner')
    return;
  }
  moveToPlayer1();
}


function calculatePlayer1Score(score){

  if(score == 1){
    moveToPlayer2()
  }else {
    playerOneScore.textContent = Number(playerOneScore.textContent) + score
  }
}

function calculatePlayer2Score(score){
  if(score == 1){
    moveToPlayer1()
  }else {
    playerTwoScore.textContent = Number(playerTwoScore.textContent) + score
  }
}


function moveToPlayer1(){
  player2.classList.remove('player--active');
  player1.classList.add('player--active');
  playerTurn='player-1';
  playerTwoScore.textContent=Number(0)

}

function moveToPlayer2(){
  
  player1.classList.remove('player--active');
  player2.classList.add('player--active');
  playerTurn='player-2';
  playerOneScore.textContent=Number(0)
}

