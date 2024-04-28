// Reference link
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#creating_closures_in_loops_a_common_mistake

// when we used var in foor loop. then each loop exceuted with onfocus clousure captured and also setupHelp method lexical scope attached along with.
//and i ki final value=3 will be shared to all loop iteration.

// jab  for loop run hota hai toh i defined as var, i ki final value 3 hogi when loop finished.
// here i scope is function scope it means i is abailable in loop as well as setupHelp method.
// i ki value determine hogi when onfocus method run. si i=3,
//that's why in helpText[3]=no item exists.

//so when you write inputs.length-1 then i ki final value 1=2;
// helpText[2]=Your age (you must be over 16)
//that;s why it points to last index value

// Solutions 1
// used with let
// used let i=0; i has block scope and used only in loop.
// for each iteration, i ki value will be sepearted b'coz it creates a new lexical environment for each loop

function showHelp(help) {}
var helpText = [
  { help: 'Your email address' },
  { help: 'Your full name' },
  { help: 'Your age (you must be over 16)' },
];
function setupHelp() {
  const inputs = document.querySelectorAll('input');

  // problem statement
  //var i;
  // for ( var i = 0; i < inputs.length-1; i++) {
  //   inputs[i].onfocus = function () {
  //     document.getElementById('help').textContent = helpText[i].help;
  //   };
  // }

  // solution statement
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].onfocus = function () {
      document.getElementById('help').textContent = helpText[i].help;
    };
  }

  document.getElementById('page').textContent = i;
}

setupHelp();

// solution 2: using closure with another example for creating new scope for each iteration
const helpText1 = [
  "Type 'help' for assistance.",
  "Type 'quit' to exit the program.",
  "Type 'save' to save your progress.",
];

function makeHelpCallback(index) {
  // Within this function, a new lexical environment is created
  return function () {
    // This inner function captures the 'index' variable from the outer lexical environment
    console.log(helpText1[index]);
  };
}

// Create an array to hold the callback functions
const helpCallbacks = [];

// Iterate over each help message and create a corresponding callback
for (var i = 0; i < helpText1.length; i++) {
  // Create a callback function using makeHelpCallback and pass the current index
  const callback = makeHelpCallback(i);
  // Push the callback function to the array
  helpCallbacks.push(callback);
}

// Invoke the first help callback
helpCallbacks[0](); // This will log: "Type 'help' for assistance."

// Invoke the second help callback
helpCallbacks[1](); // This will log: "Type 'quit' to exit the program."

// Invoke the third help callback
helpCallbacks[2](); // This will log: "Type 'save' to save your progress."
