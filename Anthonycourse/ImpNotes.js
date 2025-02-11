Some basic javascript project list
https://bankist.netlify.app


Some very Javascript important concept Notes.

/***** 1. Lexical Scope */

Does an Object Create a Lexical Scope?
❌ No! Objects do not create their own lexical scope.
✔ Only functions create lexical scope.

An object only stores properties and methods, but it does not act as a scope. 
The lexical scope is determined by the function where the code is written.

Final Conclusion
✅ Lexical scope is created inside a function, not an object.
✅ Arrow functions inherit this from their lexical scope (the function where they were defined).
✅ Objects do not create lexical scope; they are just data structures.




const obj = {
  value: 10,
  arrowFunction() {
      const innerArrow = () => {
          console.log(this.value); // What is `this` here?
      };
      innerArrow();
  }
};

obj.arrowFunction(); // Output: 10


What is the Surrounding Scope of innerArrow()?
innerArrow() is an arrow function.

Arrow functions do not have their own this.
Instead, they inherit this from their surrounding (lexical) scope.
Where is innerArrow() defined?

It is defined inside arrowFunction(), which is a regular function (not an arrow function).
In regular functions, this refers to the object that called them.
What is this inside arrowFunction()?

Since arrowFunction() is called as obj.arrowFunction(), this refers to obj.
What does innerArrow() inherit?

Since innerArrow() is an arrow function, it inherits this from arrowFunction(), meaning this still refers to obj. i.e innerArrow ka surrounding scope(Lexical scope) is arrowFunction becoz innerArrow is written inside arrowFunction.
Final Conclusion:

this.value inside innerArrow() refers to obj.value, which is 10.

/***** 2. Lexical Environment  */

What is a Lexical Environment?
A Lexical Environment is created whenever a function runs or a block {} is executed. It consists of:

Local variables inside that function or block.
References to its outer (parent) environment, allowing access to variables from outer scopes.


/**** 3. Global Execution Context *****/

In JavaScript, an execution context is the environment in which JavaScript code is evaluated and executed. It defines the scope, variables, and functions available at a particular point in the program's execution. An execution context environment is created by javascript engine.

Types of Execution Contexts
JavaScript has three main types of execution contexts:

Global Execution Context (GEC)

Created when a JavaScript file starts execution.
It creates the global object (window in browsers, global in Node.js) and the special this keyword (which refers to the global object in the global scope).
There is only one GEC per JavaScript program.
Function Execution Context (FEC)

Created whenever a function is called.
Each function gets its own execution context.
A new execution context is created and pushed onto the call stack when the function starts execution and is removed when it finishes.
Eval Execution Context (rarely used)

Created when eval() is used to execute a string of JavaScript code.
Generally avoided due to security and performance concerns.


Phases of Execution Context
Each execution context goes through two main phases:

1. Creation Phase
The execution context is created. it has following items set for us. such as 
a.) The Variable Environment (memory allocation for variables and functions) is set up.
b.) set the value of this keyword (The this keyword is determined.)
c.) outer environment ( if inner function hs no varaible then it goes to parent scope )
d.) 'arguments': which hold all the values passed to function

A Lexical Environment (scope chain) is created.

in Short ,
creation phase: it contains global object,this,Outer Environment, Setup Memory space for varaible and function "Hoisting" at compile time


2. Execution Phase
Code inside the execution context is executed line by line.
Variables are assigned values.
Functions are executed when called.

/******************** */
Call Stack and Execution Context
JavaScript uses a call stack to manage execution contexts:

When a script starts, the Global Execution Context is pushed onto the stack.
When a function is called, a Function Execution Context is created and pushed onto the stack.
When the function finishes, its execution context is popped off the stack.
The process continues until the stack is empty.


Summary
The execution context is the environment in which JavaScript code runs.
The Global Execution Context is created first.
Function Execution Contexts are created whenever a function is invoked.
The call stack manages execution contexts in a Last In, First Out (LIFO) manner.
Execution has two phases: creation and execution.


/******* 4. Javascript is single threaed *********/
Yes, JavaScript is single-threaded, meaning it executes code one line at a time in a single main thread. This means JavaScript can only do one task at a time and cannot run multiple pieces of code in parallel like multi-threaded languages.

Why is JavaScript Single-Threaded?
JavaScript was designed to run in web browsers, primarily for handling user interactions (like clicks, inputs, etc.) and updating the UI efficiently. A single-threaded model prevents issues like race conditions and complex synchronization problems that arise in multi-threaded environments.

IMP NOTES: Since JavaScript is single-threaded, it does not pause the execution for setTimeout(). Instead, it delegates the task to the Web API and continues execution.

How JavaScript Handles Execution?
JavaScript executes code using the call stack:

1.When JavaScript starts executing, it creates a Global Execution Context and pushes it onto the Call Stack.
2.When a function is called, a Function Execution Context is created and pushed onto the Call Stack.
3.JavaScript executes functions one at a time, following a Last In, First Out (LIFO) approach.
4.When a function completes, its execution context is popped off the Call Stack.
5.This continues until all code has executed.

Example of Single-Threaded Execution

function first() {
  console.log("First function");
}

function second() {
  console.log("Second function");
}

first();
second();
console.log("End of script");

Execution Order:

1. first() is called → "First function" is logged.
2. second() is called → "Second function" is logged.
3. "End of script" is logged.
The code runs sequentially, one task at a time.

OK Got it.

What About Asynchronous Operations?
Even though JavaScript is single-threaded, it can handle asynchronous operations like:

setTimeout()
setInterval()
Promises & async/await
AJAX (fetch API)
Event Listeners
This is made possible by JavaScript’s Event Loop & Callback Queue.

How JavaScript Handles Asynchronous Code?
JavaScript uses the Event Loop with Web APIs (provided by the browser) and a Callback Queue.

Example:
console.log("Start");

setTimeout(() => {
    console.log("Timeout callback");
}, 2000);

console.log("End");

Execution Order:

1.) "Start" is logged.
2.) setTimeout() is called → The timer starts in the Web API environment.
3.) "End" is logged.
4.) After 2 seconds, the callback (console.log("Timeout callback")) moves to the Callback Queue.
5.) The Event Loop moves it to the Call Stack when it's empty.
6.) "Timeout callback" is logged.

Since JavaScript is single-threaded, it does not pause the execution for setTimeout(). Instead, it delegates the task to the Web API and continues execution.

Summary
✅ JavaScript is single-threaded, meaning it executes one task at a time.
✅ It uses a call stack to manage execution.
✅ Asynchronous operations (like setTimeout, Promises) are handled via Event Loop.
✅ This model helps keep JavaScript fast and efficient for web development.

/******* 5. Event Loop  */

What is the Event Loop?
Since JavaScript is single-threaded, it uses the Event Loop to handle asynchronous operations efficiently. The Event Loop allows JavaScript to execute non-blocking code (like setTimeout, fetch, and event listeners) while still maintaining a single-threaded environment.

Key Components of the Event Loop

1.) Call Stack (Handles synchronous code execution)

Works in Last In, First Out (LIFO) order.
When a function is called, it is pushed onto the Call Stack.
When a function completes, it is popped off the stack.

2.)Web APIs (Handles asynchronous operations)

The browser provides APIs for tasks like setTimeout, fetch, DOM events, and Promises.
These tasks run outside the Call Stack and are handled by the browser.

3.) Callback Queue (Stores completed asynchronous tasks)

Once an asynchronous operation (e.g., a setTimeout callback) is ready, it moves to the Callback Queue.
Callbacks are added to the queue in First In, First Out (FIFO) order.

4.) Microtask Queue (For Promises & async/await)

Contains higher priority tasks like Promise callbacks (.then, .catch, async/await).
Always executed before tasks in the Callback Queue.

5.) Event Loop (Manages the execution flow)

The Event Loop continuously checks:
a.) If the Call Stack is empty, it moves tasks from the Microtask Queue first.
b.) If the Microtask Queue is empty, it moves tasks from the Callback Queue.

How the Event Loop Works: Step-by-Step Example

console.log("Start");

setTimeout(() => {
    console.log("Timeout callback");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise callback");
});

console.log("End");

Execution Flow
1.) "Start" is logged (synchronous → Call Stack).
2.) setTimeout() is called and sent to the Web API.
3.) Promise.resolve().then(...) is executed and added to the Microtask Queue.
4.) "End" is logged (synchronous → Call Stack).
5.) The Call Stack is empty, so the Event Loop:
    a.) Processes Microtasks first → Logs "Promise callback".
    b.) Then processes Callback Queue → Logs "Timeout callback".
Final Output:
Start
End
Promise callback
Timeout callback

🔹 Even though setTimeout() had 0ms, the Promise's microtask ran first because Microtask Queue has higher priority than the Callback Queue.

Event Loop Diagram
┌──────────────────────┐
│   Call Stack          │
│  (Executes Code)      │
└────────┬──────────────┘
         │
┌────────▼────────┐
│   Web APIs      │
│ (Handles async) │
└────────┬────────┘
         │
┌────────▼───────────┐
│ Callback Queue      │
│ (setTimeout, etc.)  │
└────────┬───────────┘
         │
┌────────▼───────────┐
│ Microtask Queue     │
│ (Promises, async)   │
└────────┬───────────┘
         │
┌────────▼─────────┐
│   Event Loop      │
│ (Manages flow)    │
└──────────────────┘

Key Takeaways
✅ JavaScript executes synchronous code first (Call Stack).
✅ Web APIs handle asynchronous tasks like setTimeout, fetch, and DOM events.
✅ Microtask Queue (Promises, async/await) runs first before the Callback Queue.
✅ The Event Loop moves tasks to the Call Stack when it's empty.

/********** 6. Scope Chain **********/

What is Scope in JavaScript?
scope: Where a varaible is available in your code.
Scope in JavaScript means where a variable can be found and used in your code.

Think of it like rooms in a house:

.Global Scope = The whole house (Everyone can access things here).
.Function Scope = A specific room (Only people inside the room can use the items in it).
.Block Scope = A closet inside the room (Only things inside the closet can be accessed).


What is Scope Chain?
The Scope Chain is how JavaScript looks for variables step by step.

If JavaScript doesn’t find a variable in the current(local) scope, it looks in the parent scope, then the global scope.

Easy Example
let globalVar = "I am Global";  // This is in the global scope

function outerFunction() {
    let outerVar = "I am Outer"; // This is in the function scope

    function innerFunction() {
        let innerVar = "I am Inner"; // This is in the inner function scope

        console.log(innerVar);  // ✅ Found inside innerFunction
        console.log(outerVar);  // ✅ Not in innerFunction, so it looks in outerFunction
        console.log(globalVar); // ✅ Not in outerFunction, so it looks in global scope
    }

    innerFunction();
}

outerFunction();


How JavaScript Searches for Variables
1.) First, JavaScript checks inside the function where the variable is used.
2.) If the variable is not found, it checks the function where the current function was created.
3.) If still not found, it checks the global scope.

Real-Life Example
Imagine you are inside a bedroom (a function), and you need a TV remote (a variable).

Step 1: You look inside the bedroom first.
Step 2: If you don’t find it, you check the living room (parent scope).
Step 3: If still not found, you check the whole house (global scope).
JavaScript follows the same process to find variables!

Scope Chain Diagram
Global Scope
│
├── outerFunction() Scope
│   │
│   ├── innerFunction() Scope


innerFunction() can see outerVar and globalVar because they are in parent scopes.
But outerFunction() cannot see innerVar because it's in a child scope.


What Happens If a Variable Is Not Found?
If JavaScript doesn’t find the variable anywhere, it gives an error:
function test() {
  console.log(notDefinedVar);  // ❌ ReferenceError: notDefinedVar is not defined
}

test();



Summary
✅ Scope = Where a variable can be accessed
✅ Scope Chain = The order JavaScript searches for variables
✅ If a variable isn’t found, JavaScript goes up to the parent scope
✅ If it’s still not found, JavaScript throws an error


How Scope Works in JavaScript
JavaScript uses lexical scoping, which means that a function's scope is determined at the time of its declaration, not at the time of execution. When a variable is accessed inside a function, JavaScript searches for that variable in the following order:

Local Scope – Inside the current function.
Parent Scope (Enclosing Function) – If not found locally, it looks at the function where this function was defined.
Global Scope – If still not found, it looks in the global scope.
If the variable is not found in any scope, JavaScript throws a ReferenceError.


in my desi Language,

lexical scope s pata chlta hai ki function humny kha per likha/(declare kiya) hai..A
you can write function in global scope or 
you can write function in nested function

let us see Example

function b(){
  console.log(myVar);// there is no myVar exist so it will check where myVar kha per code m likha hai..as function b ko humny global level per defined kiya hai toh myVar points to outer lexical envirment which is global exection context..so myVar will be 1 output.
}
function a(){
  var myVar=2;//only accesible inside a
  b();// hum yha per only call kre rehy hai b() ko, but function b ko toh humny khi other place per lika hai in code i.e global place ,
}
var myVar=1;
a();
Explanation for above code: very very imp
Jab y programe run hoga toh sabsy pheley global execution code(GEC) start hoga inside call stack

GEC contans two phase :
A.) Memory creation phase
in GEC, memory setup hoga for varaible and function a,b 

in memory creation phase, myVar takes memeory with undefined value and function a and b ko bi humny global level per likha hai toh.so y fun bi memory m store hogay with some ReferenceError

b.) Phase-2: code execution phase: where code is executed line by line


function a() is executed, which is put inside call stack and its create own execution context
and call b() function , inside b fun, there is no myVar exist so it will check where myVar kha per code m likha hai..as function b ko humny global level per defined kiya hai toh myVar points to outer lexical envirment which is global exection context..so myVar will be 1 output.

agar aap apna code check krogy toh you will find where function a,b physical written/setting in your code..i.e global level

isliye myVar inside function b points to outer Environment(GEC), not point to a..

Nice above explanatin..check below example 2 you will get clear understanding...

Now try to change code and put function b declartion inside a what will happen.

Example 2:
function a(){
  
  function b(){
    console.log(myVar);//2
  }
  var myVar=2;
  b();
}
var myVar=1;
a(); // function a physically sit on global level
b();//error ,  functin b physically defined nhi kiya hai on global level so it will give error
 
yha per function b physically defined kiya hai inside function a so and function a will create its own lexical envoronment that's why myVar point to 2
isliye myVar points to outer environment which is function a, not globally



Example 3:
function a(){
  
  function b(){
    console.log(myVar);//1 here, myVar is not there in b and function a, so it will check global scope and find it then print 1
  }
  b();
}
var myVar=1;
a(); // function a physically sit on global level
 

 /********** 7. Asynchronous Callbacks **********/
What is an Asynchronous Callback in JavaScript?
An asynchronous callback is a function that is executed later, after an asynchronous operation (like fetching data or waiting for a timer,click event handler listener) is completed.

Understanding Callbacks
A callback function is simply a function passed as an argument to another function. It is called when an operation is finished.

Synchronous Callback: Runs immediately (blocking).
Asynchronous Callback: Runs later, after an asynchronous task completes (non-blocking).

Example 1: Synchronous vs. Asynchronous Callbacks
Synchronous Callback (Runs Immediately)

function greet(name, callback) {
    console.log("Hello, " + name);
    callback(); // Runs immediately
}

function sayGoodbye() {
    console.log("Goodbye!");
}

greet("Alice", sayGoodbye);
Hello, Alice
Goodbye!
👉 Here, sayGoodbye runs immediately after greet.

Asynchronous Callback (Runs Later)

console.log("Start");

setTimeout(() => {
    console.log("This runs after 2 seconds");
}, 2000); // 2000ms (2 seconds)

console.log("End");
Output:
Start
End
This runs after 2 seconds
👉 The setTimeout function delays execution of the callback function.


Example 2: Asynchronous Callback with setTimeout
function fetchData(callback) {
    console.log("Fetching data...");

    setTimeout(() => {
        console.log("Data received");
        callback();
    }, 3000);
}

function processData() {
    console.log("Processing data...");
}

fetchData(processData);

Output:
Fetching data...
(Data received after 3 seconds)
Processing data...
👉 processData runs after fetchData finishes.


Example 3: Asynchronous Callbacks with fetch (API Call)

console.log("Fetching user...");

fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => response.json())  // Asynchronous Callback
    .then(data => console.log("User:", data))
    .catch(error => console.error("Error:", error));

console.log("Other work...");

Output:
Fetching user...
Other work...
User: {id: 1, name: "Leanne Graham", ...}
👉 JavaScript does not wait for the API response and continues executing the next line.

Key Takeaways
✅ Asynchronous Callbacks run after an asynchronous operation completes.
✅ Used in setTimeout, setInterval, event listeners, fetch API, database calls, etc.
✅ JavaScript does not wait for an async task to finish—it continues running other code.
✅ Helps in non-blocking execution, keeping JavaScript fast.


