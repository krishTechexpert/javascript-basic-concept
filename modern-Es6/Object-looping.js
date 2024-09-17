'use strict'

console.log('***** Object Looping *****');


const workHours= {
  thu: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  }
};

// Object.keys -> retrun array with keys

const hourskey=Object.keys(workHours)
console.log(hourskey) // ['thu','fri','sat]
for(let key of hourskey){
  console.log(key)
}

// Object.values -> return array with values

const hoursValue = Object.values(workHours)
console.log(hoursValue) //[{ "open": 12,"close": 22},{"open": 11,"close": 23},{"open": 0,"close": 24}]

for(let {open,close} of hoursValue){
  console.log(`Your work open:${open} and close: ${close} hours`)
}

// Object.entries() -> return array with [[key,value],[key,value]]
const hoursEntries = Object.entries(workHours)
console.log(hoursEntries) // [ ['thu',{ "open": 12,"close": 22}] ,['fri',{"open": 11,"close": 23}],['sat',{"open": 0,"close": 24}] ]

for (let [dayName,{open,close}] of hoursEntries){
  console.log(`mention your day ${dayName} and open:${open} and close: ${close} working hours`)
}

const gameInfo = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};


/* 1. Loop over the game.scored array and print each player name to console,
alogn with the goal number(Example:"Goal 1:Lewandowski")*/
for (let [index,name] of gameInfo.scored.entries()){ //return value = [[0,'Le'],[1,'Gn'],[2,'Le'],[3,'Hu']]

  console.log(`Goal ${index + 1} : ${name}`)
}



/*2. use a loop to calculate the  average odd and log to it the console */
let avg=0;
let ValueArray = Object.values(gameInfo.odds)
for(let num of ValueArray){
  avg+=num;
};
console.log("average is ",avg/ValueArray.length)

/*3. Print the 3 Odds to the console,but in a nice format and Get the team name directly for the game object */

for(let [keys,value] of Object.entries(gameInfo.odds)){
  // easy and readable ways
  if(gameInfo[keys]){
    console.log(`Odd of ${gameInfo[keys]}:${value}`)
  }else {
    console.log(`Odd of draw:${value}`)
  }
  // short ways
  let checkTeam = gameInfo[keys] ?? 'draw';//only null,undefined value aygi tabi 'draw' print hoga
  console.log(`Odd of ${checkTeam} : ${value}`)
}

/*4. Create an object called 'scorers' which contains name of players who scored as properties, and the numberof goals as value. in this game, it will look like:
{
  Gnarby:1,
  Hummels:1,
  Lewandowski:2
}*/
let record={}
for (let name of Object.values(gameInfo.scored)){ 

 if(record[name]){
    record[name]++
  }else {
    record[name]=1;
  }

}

console.log(record)


// Coding Challenge 2

const bookList = {
  book1:'java',
  book2:'.Net',
  pages:{
    book1:100,
    book2: 120,
    book3:0
  }
}

for(let [keys,values] of Object.entries(bookList.pages)){
  //Method-1
  if(bookList[keys]){
    console.log(`${bookList[keys]} has ${values} pages`)
  }else {
    console.log(`Empty book has ${values} pages`)
  }

  // Method-2
  let Book = bookList[keys] ?? 'Empty book';//only null,undefined value then next expression evaluated
  console.log(`${Book} has ${values} pages`)
}