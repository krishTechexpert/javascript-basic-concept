'use strict';

console.log('*********** ES6 Features ********************')


// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
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
    },
  },
  order:function(startIndex,mainIndex){
    return [this.starterMenu[startIndex],this.mainMenu[mainIndex]]
  },
  orderDelivery:function({cateIndex=1,time='10:00Pm',address}){
    console.log(`${this.categories[cateIndex]} Order received ! at ${address}: ${time}`)
  },
  orderDrink:function(drink1,drink2,drink3){
    console.log(`I get my drinks ${drink1},${drink2},${drink3}`)
  }
};

// array desctructing
const arr = [1,2,[3,4]];
let [x,,[y,z]]=arr; // nested array [3,4] (, means 2 skip)
[y,z]=[z,y] // swap
console.log(x,y,z)
console.log(restaurant.order(1,2))


//object desctructing

// there is no closed property defined in restaurant object but we can desctruct with default value such as closed='sunday'
const {name:restaurantName,openingHours:hours,categories:tags,closed='Sunday'} = restaurant;
console.log(restaurantName,hours,tags,closed)

// nested object desc
const {fri:{open:oP,close:oL}} = hours; // oP,oL alias name
console.log(oP,oL)

restaurant.orderDelivery({
  cateIndex:2,
  address:'Via Angelo Tavanti 23, Firenze, Italy'
})

// spread operator 

const newArr = [1,2,3];
const badArray = [newArr[0],newArr[1],newArr[2]]
console.log(badArray)

// array shallow copy
const goodArray = [...newArr];
goodArray.push(4)
console.log(goodArray,newArr)

//merge array
const mergeArray = [...restaurant.starterMenu,...restaurant.mainMenu]
console.log(mergeArray)

//iterate string
const str='india';
console.log([...str,'','good country'])
console.log(...str)

// object shallow copy

const newRestaurant = {...restaurant}
newRestaurant.founder='kk';
console.log(newRestaurant,restaurant)

//merge object
const firstName={firstName:'sachin'};
const lastName={lastName:'singh'}
const fullName = {...firstName,...lastName};
console.log(fullName)

// function arguments
const myDrinks=['coke','pepsi','maaza']
restaurant.orderDrink(...myDrinks) // 'coke','pepsi','maaza'


// Rest operator

// here we can say spread work on right hand side of = (assignment) operator
const spreadArr = [1,2,...[3,4]];
console.log(spreadArr) //[1,2,3,4]
console.log(...spreadArr)//1,2,3,4

// now talking about rest operator which work left hand side of = (assignment) operator
const num = [1,2,3,4,5,6];
const [a,b, ...restNum ] = num;
console.log(a,b,restNum) // 1,2,[3,4,5,6]

const [Pasta,pizza,...others] = [...restaurant.mainMenu,...restaurant.starterMenu]
console.log(Pasta,pizza,others)

const {name,...remainProperty} = restaurant;
console.log(name,remainProperty)

const {sat,...weekdays} = restaurant.openingHours;
console.log(weekdays)

// rest operator in function

const add = function(...numbers){
  const sum=numbers.reduce((acc,currentNumber) => acc + currentNumber,0)
  console.log(sum)

}
add(2,2) //4
add(2,2,4,5,6) //19
add(10,20,30,40,50,60,70,80,90,100) //550

let x1=[10,20]
add(x1) //[10,20] numbers=[[10,20]]
add(...x1) // 10,20 numbers = [10,20]

//way to set default value consider (&& and  ||) operator

console.log(3 || true) // 3 jesi hi  truthy value mil jyegi  then next expression will not evaluated
console.log(0 || null || '' || 'hello' || undefined) // hello

console.log(0 && 'hello') // 0  jesi hi  falsy value mil jyegi  then next expression will not evaluated

console.log(123 && null && 'hi') // null

 restaurant.guestcount=20;
 const guest1= restaurant.guestcount || 10;
 console.log(guest1) // 20 but what if guestcount =0/null/''/undefined (any falsy value) then it will set default value 10 which is wrong.

 // solutions is nullish operator ?? b'coz suppose guestcount is only null and undefined then no default value will be set. see below example


// nullish operator ??
 
restaurant.guestcount1=undefined; //so here if value only null /undefined then default value will be set 5 otherwise whatever guestcount11 value show
const guest2= restaurant.guestcount1 ?? 5;
console.log(guest2)


// Coding challenge 1


const game = {
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

/*Task 1
create one player array for each team (variables 'players1' and 'players2')*/

const [players1,players2] = game.players;
console.log("player1",players1)
console.log("player2",players2)

// task 2
const [gk,...fieldPlayers]=players1;
console.log("goal keeper name is",gk)
console.log("remaining players are",fieldPlayers)

// task 3
const allplayers = [...players1,...players2]
console.log(allplayers)

// task 4
const players1Final = [...players1,'Thiago','Coutinho','Perisic'];
console.log(players1Final)

// task 5
//const {team1,x:draw,team2} = game.odds;
//Or
const {odds:{team1,x:draw,team2}}=game;
console.log(team1,draw,team2)

// task 6
function printGoals(...players){
  console.log(`${players.length} goals were scored`)
  players.forEach(function(player){
    console.log(player)
  })
}
printGoals(...game.scored)


// Es6 for-of loop // only get element, not index 
const hotelMenu = [...restaurant.starterMenu,...restaurant.mainMenu]
//console.log([...hotelMenu.entries()])
for (const menu of hotelMenu) console.log(menu)

for (const [index,element] of hotelMenu.entries()) console.log(`${index+1}: ${element}`)
