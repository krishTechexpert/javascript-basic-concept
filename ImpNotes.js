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

Since innerArrow() is an arrow function, it inherits this from arrowFunction(), meaning this still refers to obj.
Final Conclusion:

this.value inside innerArrow() refers to obj.value, which is 10.

/***** 2. Lexical Environment  */

What is a Lexical Environment?
A Lexical Environment is created whenever a function runs or a block {} is executed. It consists of:

Local variables inside that function or block.
References to its outer (parent) environment, allowing access to variables from outer scopes.
