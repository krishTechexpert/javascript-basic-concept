'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// keep in mind accounts array contains address of each object. if you are sharing any accounts and try to update it then  it will also update in all place where you have used updated object
//accounts[0].interestRate = 10;
//console.log(accounts)
//account1.pin = 2000;


// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovments = function(movements,sort=false){
  containerMovements.innerHTML = '';
  const sortedMoves = sort ? movements.slice().sort((a,b) => a-b): movements;
  console.log("sorted",sortedMoves)
  sortedMoves.forEach(function(mov,i){
    const type = mov >0 ? 'deposit':'withdrawal'
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__value">${Math.abs(mov)}€</div>
    </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin',html)

  })
}

const displayBalance = function(amounts){

  const balance = amounts.reduce((acc,currentAmount) => acc + currentAmount,0)
  authUser.balance=balance;
  labelBalance.textContent = `${balance}€`
}

const displaySummary = function(money,interestRate){
  const incomes = money.filter(amt => amt>0).reduce((acc,cur) => acc + cur,0);
  labelSumIn.textContent=`${incomes}€`;
  
  const outIncome = money.filter(amt => amt<0).reduce((acc,cur) => acc + cur,0);
  labelSumOut.textContent=`${Math.abs(outIncome)}€`;

  // calculate interest on each deposit and interest should be atleat 1
  const interest = money
                  .filter(amt => amt>0)
                  .map(deposit => (deposit * interestRate)/100)
                  .filter((int,i,arr) => {// here arr contains interest on each deposit
                    console.log(" interest should be >=1 on each deposit",arr)// [2.4,5.4,36,.84,15.6] so .84 interest exclude it
                    return int >=1
                  })
                  .reduce((acc,cur) => acc + cur,0)
  labelSumInterest.textContent=`${interest}€`;

}

let authUser;

const Login = function(){
  const userName = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  if( !userName || !pin){
    alert('please enter login details');
    return;
  }else{
   authUser = accounts.find(user => user.username === userName && user.pin === pin)
    if(authUser){
      containerApp.style.opacity='1';
      labelWelcome.textContent = `Welcome, ${authUser.owner.substring(0,5)}`;
      labelDate.textContent= new Date().toLocaleDateString();
      updateUI(authUser)
      inputLoginUsername.value='';
      inputLoginPin.value='';
    }else {
      alert('Username and pin wrong')
    }
  
  }
}

//handle Login implementation
btnLogin.addEventListener('click',function(event){
  event.preventDefault();
  Login()
})

function moneyTransfer(){
  const name = inputTransferTo.value;
  const amt = Number(inputTransferAmount.value);
  if(!name || !amt) {
    alert('enter money transfer details')
    return;
  }
  const receiverAcc =  accounts.find(user => user.username === name) // as all account object(Heap memory) store in accouns array so receiverAcc points to same object accoring to name value
  if(amt > 0 && receiverAcc && amt<=authUser.balance && receiverAcc?.username !== authUser.username) {
    authUser.movements.push(-amt)
    receiverAcc.movements.push(amt)
    updateUI(authUser)
    inputTransferTo.value='';
    inputTransferAmount.value='';

    // here no need to create extra shallow copy
    // const existingUser = accounts[receiverAcc];
    // const updateUser = {...existingUser,movements:[...existingUser.movements]} // shallow copy
    // updateUser.movements.push(amt)
    // accounts[receiverAcc] = updateUser;
  }

}

// money transfer implementation
btnTransfer.addEventListener('click',function(event){
  event.preventDefault();
  moneyTransfer()
})

function updateUI(authUser){
  displayBalance(authUser.movements)
  displayMovments(authUser.movements);
  displaySummary(authUser.movements,authUser.interestRate)

}

//handle delete user account

function deleteUserAccount(){
  const userName = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);

  if( !userName || !pin){
    alert('please enter user account that you want to delete');
    return;
  }else if( userName === authUser.username && pin === authUser.pin){
    const index = accounts.findIndex(user => user.username === authUser.username);

      accounts.splice(index,1)
    alert('Successfully Deleted account')
    inputCloseUsername.value='';
    inputClosePin.value='';
    containerApp.style.opacity=0;
    
  }
}

btnClose.addEventListener('click',function(event){
  event.preventDefault();
  deleteUserAccount()
})

// handle loan amount
function loanAmount(){
  const amount = Number(inputLoanAmount.value);

  // check user deposit of 10% loan amount then loan will only approved
  // some method -> check there is any deposit of 10 % loan amount. i.e loan amount 30000 then 3000 amount should be deposit in account already once.

  console.log(authUser.movements.some(mov => mov * amount *.1)) // true
  if(amount> 0 && authUser.movements.some(mov => mov * amount *.1)){
    authUser.movements.push(amount);
    inputLoanAmount.value='';
    updateUI(authUser)
  }
  console.log(accounts)
}

btnLoan.addEventListener('click',function(event){
  event.preventDefault();
  loanAmount()
})

// handle sorting
let sorted = false;
btnSort.addEventListener('click',function(event){
  event.preventDefault();
  displayMovments(authUser.movements,!sorted)
  sorted=!sorted;
})

const createUserNames =function(accs){
  accs.forEach(function(userAccount){
    userAccount.username = userAccount.owner.toLowerCase().split(' ').map(name => name[0]).join('')
  })
}

createUserNames(accounts)

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

function checkDogs(dogsJulia,dogsKate){
  const checkCatsOrDogs=dogsJulia.slice(1,-2)
  const bothDogs = [...checkCatsOrDogs,...dogsKate]
  bothDogs.forEach(function(dog,index){
    const checkAge = dog<=3 ? 'puppy' : 'adult';
      console.log(`Dog number ${index+1} is an ${checkAge}, and is ${dog} years old`)
    
  })
}

//checkDogs(dogsJulia,dogsKate)
checkDogs([9, 16, 6, 8, 3],[10, 5, 6, 1, 4])

//find maximum value using reduce method 
console.log(movements)
const max= movements.reduce(function(acc,cur){
  if(acc>cur) {return acc}
  else { return cur} // it will put automatically in acc
},movements[0])
console.log(max)




///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/


// function calcAverageHumanAge(ages){
//   const humanAge= ages.map(function(dogAge){
//     if(dogAge <=2) {
//       return 2* dogAge
//     }else {
//       return 16+dogAge*4;
//     }
//   })
//   const adultDog =humanAge.filter(age => age >18 )
//   console.log(adultDog)
//   const averageadultDog = adultDog.reduce(function(acc,cur){
//     return acc+cur
//   },0)
//   console.log(averageadultDog/adultDog.length)
// }


///////////////////////////////////////
// Coding Challenge #3
// convert above calcAverageHumanAge into arrow function with chaining

const calcAverageHumanAge = ages => 
                            ages
                            .map(dogAge => dogAge <=2 ? 2*dogAge : 16+dogAge*4)
                            .filter(adultDog => adultDog >=18) // [36,32,76,48,28]
                            .reduce((acc,cur,i,adultDogResult) => acc + cur / adultDogResult.length,0)
                            // important note: here adultDogResult contains the result of filter adultDog
const avg1=calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])
const avg2=calcAverageHumanAge([16,6,10,5,6,1,4])
console.log("average=",avg1,avg2) //average= 44 47.333333333333336


// some method
console.log(account1.movements.some(mov => mov > 0 )) // true

// every method
//movements: [430, 1000, 700, 50, 90],

console.log(account4.movements.every(mov => mov < 0 )) // false b'coz there is no positive value


// flat method

const arr = [[1,2,3],[4,5,6],7,8] // level 1 array nested
console.log(arr.flat()) // [1,2,3,4,5,6,7,8]

// if you have nested array with deep level 2 means nested inside nested then use flat(2), here 2 show deep level nested

const arrDeep = [[[1,2],3],[4,[5,6]],7,8];
console.log(arrDeep.flat()) // [[1,2],3,4,[5,6],7,8]

// But
console.log(arrDeep.flat(2)) // [1,2,3,4,5,6,7,8]


// useCase suppose you want to calculate total balance of all accounts with all movements array
const allAccounts = JSON.parse(JSON.stringify(accounts)) // copy deep level
allAccounts[0].pin=77777;
console.log(accounts,allAccounts)

const allMovementsBalance = 
  allAccounts.map(mov => mov.movements)
  .flat()
  .reduce((acc,cur) => acc + cur,0 )
console.log(allMovementsBalance) // 17840

// flatMap = flat()+ map() method combination but it will used when there is deep nested array
const allAccounts2 = JSON.parse(JSON.stringify(accounts)) // copy deep level
const allMovementsBalanceDeepLevel = allAccounts2.flatMap(acc => acc.movements).reduce((acc,cur) => acc + cur,0 )
console.log(allMovementsBalanceDeepLevel) // 17840


// Array fill
const x= [1,2,3,4,5,6,7];
const x1=new Array(7) // [empty*7]

const x11=x1.fill(20,2,4) // start position=2, end position=4 end part exclude same work as slice
console.log(x11) // [empty *2,20,20,empty*3]

// Array.from() is also iteratable method
// The Array.from() static method creates a new, shallow-copied Array instance from an iterable or array-like object
const y = Array.from({length:7},() => 1) // [1,1,1,1,1,1,1]

const z = Array.from({length:7},(cur,i) => i+1) // [1,2,3,4,5,6,7] work same as map
//const z = Array.from({length:7},(_,i) => i+1) // here _represent that no need of current element

console.log(Array.from('foo'));
// Expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], (x) => x + x));
// Expected output: Array [2, 4, 6]

//Array from a NodeList
labelBalance.addEventListener('click',function(){
const movementsUI =   Array.from(document.querySelectorAll('.movements__value'),(e1) => Number(e1.textContent.replace('€','')) )
console.log(movementsUI)
})


///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(dog => dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
console.log(dogs) //284,133,191,376
//2
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'))
console.log(sarahDog)
console.log(`Sarah 's dog eating ${sarahDog.curFood > sarahDog.recommendedFood ? 'too much' : 'too little'} `)
//3
const ownersEatTooMuch = dogs.filter(dog => dog.curFood>dog.recommendedFood ).flatMap(dog => dog.owners);
console.log(ownersEatTooMuch)
const ownersEatTooLittle = dogs.filter(dog => dog.curFood<dog.recommendedFood ).flatMap(dog => dog.owners);
console.log(ownersEatTooLittle)

//4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`)
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`)
//5
console.log(dogs.some(dog => dog.curFood === dog.recFood));
// 6.
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));

// 7.
console.log(dogs.filter(checkEatingOkay));

// 8.
// sort it by recommended food portion in an ascending order [1,2,3]
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
