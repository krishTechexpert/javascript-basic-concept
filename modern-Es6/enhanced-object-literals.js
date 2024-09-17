'use strict';

console.log('*********** Enhanced Object literals ********************')


// const Hours= {
//   thu: {
//     open: 12,
//     close: 22,
//   },
//   fri: {
//     open: 11,
//     close: 23,
//   },
//   sat: {
//     open: 0, // Open 24 hours
//     close: 24,
//   }
// };

// Es6 we can also used compute property dynamic but key should be in string or varaible

const weekDays = ['mon','tues','wed','thu','fri','sat','sun'];

const Hours= {
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  [weekDays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
  ['time']:'10am-10pm'
};

const categories= ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'];


const kkRestaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours:{...Hours,sat:{...hours.sat,open:1}}, // deep shallow copy
  
  
  // ES6 enhanced categories same as {categories:categories}
  categories,

  //Es6 function declaration inside object
  order(startIndex,mainIndex){
    return [this.starterMenu[startIndex],this.mainMenu[mainIndex]]
  },
  orderDelivery({cateIndex=1,time='10:00Pm',address}){
    console.log(`${this.categories[cateIndex]} Order received ! at ${address}: ${time}`)
  },
  // Es5 function declaration
  orderDrink:function(drink1,drink2,drink3){
    console.log(`I get my drinks ${drink1},${drink2},${drink3}`)
  },
};
console.log(kkRestaurant)
console.log(kkRestaurant.order(1,1))
console.log(Hours)