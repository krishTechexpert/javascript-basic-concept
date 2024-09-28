'use strict';

/////////////////////////////////////////////////
// BANKIST APP
// https://bankist.netlify.app/
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-09-24T17:01:17.194Z',
    '2024-09-25T23:36:17.929Z',
    '2024-09-26T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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


const now =new Date();
const day = `${now.getDate()}`.padStart(2,0);// yha per max length 2 hai it means agar value length 2 s kam hai toh 0 add ker do like 02 otherwise mat add kro , only as it as value show ker do like 26
const month=`${now.getMonth()+1}`.padStart(2,0);
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2,0);
const seconds=`${now.getSeconds()}`.padStart(2,0);

const currentDate = `${day}/${month}/${year} ${hour}:${seconds}`
console.log(currentDate) // 26/09/2024

/////////////////////////////////////////////////
// Functions

function dateFormate(date){

  function calDaysDifference(date1,date2){
    return Math.round(Math.abs((date1 - date2)/(1000 * 60 * 60 * 24)))
  }
  const daysPassed=calDaysDifference(new Date(),date)

  if(daysPassed === 0) return "Today";
  if(daysPassed === 1) return "Yesterday";
  if(daysPassed <=7) return `${daysPassed} days ago`;

  const day = `${date.getDate()}`.padStart(2,0);
  const month=`${now.getMonth()+1}`.padStart(2,0);
  const year = now.getFullYear();
  return `${day}/${month}/${year}`
  
}

const formatCurrency = (value,locale,currency) => {
  return new Intl.NumberFormat(locale,{style:'currency',currency:currency}).format(value)
}

let timeId;

function startLogoutTimer(){
  let time=120; //140 sec
  const tick = () => {
    const min=`${Math.floor(time/60)}`.padStart(2,0)
    const sec = `${Math.floor(time%60)}`.padStart(2,0)
    labelTimer.textContent = `${min}:${sec}`
    if(time === 0) {
      clearInterval(timeId)
      labelWelcome.textContent = `Log in to get started`
      containerApp.style.opacity = 0;
    }
    time--
  }
  tick()
 timeId=setInterval(tick,1000)
 return timeId
}
//startLogoutTimer()
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i])
    const displayDate =dateFormate(date)
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1 
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <!-- <div class="movements__value">${mov.toFixed(2)}€</div>
       </div>-->
      <div class="movements__value">${formatCurrency(mov,acc.locale,acc.currency)}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};




const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  //labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = `${formatCurrency(acc.balance,acc.locale,acc.currency)}`;

  
  const options = {
    hour:'numeric',
    minute:'numeric',
    day:'numeric',
    month:'numeric',
    year:'numeric',
    //weekday:'long'
  }
  const internationalDate = new Intl.DateTimeFormat(acc.locale,options).format(new Date())

  labelDate.textContent= internationalDate // show current date as per different accoun
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  //labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumIn.textContent = `${formatCurrency(incomes,acc.locale,acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  //labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  labelSumOut.textContent = `${formatCurrency(out,acc.locale,acc.currency)}`;


  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  //labelSumInterest.textContent = `${interest.toFixed(2)}€`;
   labelSumInterest.textContent = `${formatCurrency(interest,acc.locale,acc.currency)}`;

};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    
    if(timeId) {
      clearInterval(timeId)
    }
    timeId=startLogoutTimer()

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add fund transfer date
    currentAccount.movementsDates.push(new Date().toISOString())
    receiverAcc.movementsDates.push(new Date().toISOString());


    // Update UI
    updateUI(currentAccount);

    // reset timer
    clearInterval(timeId)
    timeId=startLogoutTimer()

  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    
    // add loan date
    currentAccount.movementsDates.push(new Date().toISOString())
    
    // Update UI
    updateUI(currentAccount);


    // reset timer
    clearInterval(timeId)
    timeId=startLogoutTimer()
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const randomInt = function(min,max){
  const a =Math.trunc(Math.random() * (max-min) +1)+min
  console.log(a)
  // math.random() gives values between 0-1 such as 0.40
}
//console.log(randomInt(20,10))
randomInt(8,12)

// bigInt number

console.log(2 ** 53-1) // 9007199254740991 this is the maximum number in javascript
console.log(Number.MAX_SAFE_INTEGER) // same as  9007199254740991
// but if we add some more number it show some unsafe number which is not acceptable by javascript
console.log(2 ** 53+0) // 9007199254740992
console.log(2 ** 53+1) //9007199254740992 not undertsand this number 
console.log(2 ** 53+2) // 9007199254740994
console.log(2 ** 53+3) //9007199254740996

// ES2020 introduce new primitive type BigInt 
console.log(BigInt(77398789327894738947298749387)) // 77398789327894740695177494528n
console.log(77398789327894738947298749387n) // here represent bigInt number // 77398789327894738947298749387n till same as 13 digit

// Bigint  operation  but Math opeartion not work on bigint
console.log(10000n+ 10000n) // 20000n
console.log(734837472398479823749842379823n*100000n) // 73483747239847982374984237982300000n

console.log(20n === 20) //false
console.log(typeof 20n) //bigint

//Math opeartion not work on bigint
//console.log(Math.sqrt(16n)) // error Uncaught TypeError: Cannot convert a BigInt value to a number

// divison
console.log(11n/3n) // 3n, cut decimal part and show nearest number
console.log(12n/3n) // n
console.log(10n/3n) // 3n
console.log(11/3) //3.6666666666666665


// Date
console.log(new Date(0)) //  Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)
console.log(new Date()) //Thu Sep 26 2024 11:35:24 GMT+0530 (India Standard Time)
console.log(new Date('26 sept 2024'))
console.log(new Date().getFullYear()) //2024
console.log(new Date().getMonth())//8
console.log(new Date().getDate()) // 26 [day in month]
console.log(new Date().getDay())//4 // weak days
console.log(new Date().getHours())//11
console.log(new Date().getMinutes())//32
console.log(new Date().getSeconds()) //44
console.log(new Date().getMilliseconds()) //796
console.log(new Date().getTime()) // 1727331352643 return timestamp in miliseconds since from Jan 01 1970
console.log(new Date(1727331352643)) // Thu Sep 26 2024 11:45:52 GMT+0530 (India Standard Time)
console.log(new Date().toISOString()) // 2024-09-26T06:13:39.809Z
console.log(new Date(account1.movementsDates[0])) //Tue Nov 19 2019 03:01:17 GMT+0530 (India Standard Time)
console.log(new Date(2024,8,26,11,32,20)) //Thu Sep 26 2024 11:32:20 GMT+0530 (India Standard Time)

// three day after 1 jan 1970 + next 3 days // Sun Jan 04 1970 05:30:00 GMT+0530 (India Standard Time)
console.log(new Date(3*24*60*60*1000)) // 3 * 24 hour * 60 mintue * 1 mintue * 1 second(1000 ms)

// To get current timestamp // 1727331550893
//Returns the number of milliseconds elapsed since midnight, January 1, 1970 Universal (UTC)
console.log(Date.now()) //1727331550893

//Math operation i.e get the difference of two dates

function caldaysDifference(date1,date2){
  return Math.abs((date1 - date2)/(1000 * 60 * 60 * 24))// here Math.abs convert negative to positive value from -2 to 2
}
const remainDays=caldaysDifference(new Date(24,8,26),new Date(24,8,28)) // 2 days
console.log(remainDays)

// 1000 -> convert miliseconds to seconds
// 60 -> convert seconds to  mintue
// 60 -> convert  mintue to  hour
// 24 -> convert hour to days

// International date(INTL) api which convert dated according to countries  different language

const options = {
  hour:'numeric',
  minute:'numeric',
  day:'numeric',
  month:'long',
  year:'numeric',
  weekday:'long'
} 

//const internationalDate=new Intl.DateTimeFormat('en-US',options).format(new Date())
const locales= navigator.language;

const internationalDate=new Intl.DateTimeFormat(locales,options).format(new Date())

console.log(internationalDate) //Thursday, 26 September 2024 at 19:09

// number format
const num=10000.00
console.log('US:',new Intl.NumberFormat('en-US').format(num)) //US: 10,000
console.log('GERMANY:',new Intl.NumberFormat('de-DE').format(num)) //GERMANY: 10.000
console.log('Syria:',new Intl.NumberFormat('ar-SY').format(num)) // Syria: ١٠٬٠٠٠
console.log('India:',new Intl.NumberFormat('en-In').format(num)) // India: 10,000

// currency
const number1 = 123456.789;

const curOptions = {
  style:'currency',
  currency:'EUR'
}
console.log(new Intl.NumberFormat('en-In',curOptions).format(number1)) // €1,23,456.79


//setTimeout

const exam=['pre','main']

const examTimer=setTimeout((exam1,exam2) => console.log(`you have cleared ${exam1} and ${exam2} exam`),3000,...exam)
console.log('waiting...',examTimer)

if(exam.includes('main2')) clearTimeout(examTimer)

// setInterval



// task-1 get current hour,mintue and seconds
const timerId=setInterval(() =>{
  const now = new Date();
  const hour= `${now.getHours()}`.padStart(2,0)
  const min = `${now.getMinutes()}`.padStart(2,0)
  const sec = `${now.getSeconds()}`.padStart(2,0)
  console.log(`${hour}:${min}:${sec}`)
} ,1000)

// Task-2 logout 10:00 after 10 mintues user should be logout.

//mintue = 120/60=2min
//seconds = 140 % 60 = 2 min 20 sec -> 20 sec

let time1=140; //140 sec

const timEId=setInterval(() => {
  const min=`${Math.floor(time1/60)}`.padStart(2,0)
  const sec = `${Math.floor(time1%60)}`.padStart(2,0)
  console.log(`${min}:${sec}`)
  if(time1 === 0) clearInterval(timEId)
  time1--
},1000)

// Task -3 
let time2 = 3740 // 3740 sec means 1h 2 min 20 seconds =62 min 20 sec
const timeId1=setInterval(() => {
  //3740 sec/ 3600 sec (1 hour=3600 sec) = 1 hour
  const hh=`${Math.floor(time2/(60*60))}`.padStart(2,0)

  const min=`${Math.floor((time2%(60*60)/60))}`.padStart(2,0) //first calculate hour then divide by min such as  hour/divide by mintue(60) 2min

  const sec = `${Math.floor(time2%60)}`.padStart(2,0)
  console.log(`${hh}:${min}:${sec}`)
  if(time2 === 0) clearInterval(timeId1)
  time2--
},1000)

// task-4 

let time3= 90140 // 90140 sec means = 1day 1hour 2 min 20 sec (we can say  25hour 2 min 20 sec)

const timeId2 = setInterval(() => {

  const dd = `${Math.floor(time3/(24*60*60))}`; // 24 hour * 60Min * 60sec

  const hh=`${Math.floor(time3/(60*60))}`.padStart(2,0)

  const min=`${Math.floor((time3%(60*60)/60))}`.padStart(2,0) 

  const sec = `${Math.floor(time3%60)}`.padStart(2,0)
  
  console.log(`${dd}d:${hh}h:${min}mm:${sec}s`)

  if(time3 === 0) clearInterval(timeId2)
  time3--
},1000)

// task -5 sale timer Diwali 2024 special sale offer  20 oct 2024

const saleDate = new Date('20 oct 2024').getTime() // 1729362600000

const saleTimer = setInterval(() => {
  const currentDate = new Date().getTime(); // 1727447622866
  const now = saleDate - currentDate; // 1914905603

  const days = Math.floor(now / (1000 * 60 * 60 * 24));// 22 days
  const hours = Math.floor((now % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // get hour then convert into miliseconds

  const minutes = Math.floor((now % (1000 * 60 * 60)) / (1000 * 60)); // get mintue  convert into miliseconds
  const seconds = Math.floor((now % (1000 * 60)) / 1000);

   console.log(`${days}d:${hours}h:${minutes}mm:${seconds}s`)
  // If the count down is over, write some text 
  if (now < 0) {
    clearInterval(saleTimer);
      console.log("EXPIRED");
  }
},1000)