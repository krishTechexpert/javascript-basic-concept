console.log('Start Tic tac toe game....')

console.log(Array(9).fill(null));

//first create board

let currentPlayer = "X"; // X starts first
let cells = Array(9).fill(null);//[null,null,null,null,null,null,null,null,null]
const board = document.getElementById("board");
let gameOver=false;
const resetGameBtn = document.getElementById("resetGame")

resetGameBtn.addEventListener('click',resetGame)

// Create 9 cells dynamically

function createBoard(){

  board.innerHTML='';
  cells.forEach((cell,index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.dataset.index=index;
    div.innerText=cell;
    div.addEventListener("click", handleCellClick);
    board.appendChild(div)
  })
}

function handleCellClick(event){
  const index = event.target.dataset.index;

  if(cells[index] === null && !gameOver){
    cells[index]=currentPlayer;
    event.target.innerHTML=currentPlayer;

    if(checkWinner()){
      alert(currentPlayer+" win");
      gameOver=true;
      return;
    }

    if(!cells.includes(null)){
      alert("It's a draw! 😃");
      console.log(cells)
      gameOver=true;
      return;
    }

    //switch player
      if(currentPlayer=='X'){
        currentPlayer='O'
      }else{
        currentPlayer='X'
    
      }
      console.log(cells)

  }
  

}

createBoard();

function checkWinner(){

const wins = [ 
              [0,1,2],[3,4,5],[6,7,8], //rows
              [0,3,6],[1,4,7],[2,5,8], //columns
              [0,4,8],[2,4,6] //diagonal
            ]

      let result = wins.some(check)

      function check(item){
        const [first,second,third] =  item;
        if((cells[first] !==null && cells[first]==cells[second] && cells[first]==cells[third])){
            return true;
          }
       }

      if(result){
        return true
      }

  
  // if(
  //   //rows
  //   (cells[0] !==null && cells[0]==cells[1] && cells[0]==cells[2]) || (cells[3] !==null && cells[3]==cells[4] && cells[3]==cells[5]) || (cells[6]!==null && cells[6]==cells[7] && cells[6]==cells[8]) 

  //   //column

  //   || (cells[0] !==null && cells[0] == cells[3] && cells[0]==cells[6])
  //   || (cells[1] !==null && cells[1] == cells[4] && cells[0]==cells[7])
  //   || (cells[2] !==null && cells[2] == cells[5] && cells[2]==cells[8])

  //   //diagonal
  //   || (cells[0] !==null && cells[0] == cells[4] && cells[0]==cells[8])
  //   || (cells[2] !==null && cells[2] == cells[4] && cells[2]==cells[6])


  //  ){
  //   return true;
  // }
  return false;
}


function resetGame(){
  gameOver=false;
  cells = Array(9).fill(null);
  currentPlayer = "X";
  createBoard();
}