//POJO -> plain old javascript object

const emp = {name:'krish',age:20};
const key="age";
console.log(emp[key])//20
emp[true]="yes";

emp[1]="one";
console.log(emp[1])//one//automatically convert like that emp[1].toString()="one"
console.log(emp["1"]);//one
console.log(emp.true)//yes

emp.add = function(){return "hi"};

console.log(emp)

console.log(3=='3')//true
console.log(3==='3')//false
console.log(['3']=='3');//true b'coz ['3'].toString() automatically convert into '3'
console.log(['3'].toString()=='3')//true
//console.log(['3'] === '3');//false 
/*
Explanation:
['3'] is an array containing a single string element "3".
When using == (loose equality), JavaScript performs type coercion.
The array ['3'] is converted to a string by calling .toString(), which results in "3".
The comparison then becomes "3" == "3", which is true.*/
