
'use strict'

console.log('******* Sets **************')

// it is same as Object but this is not contain keys values pairs and has contain only unique value such as {4,1,2,3,5,67}

let setObj = new Set()
console.log(setObj) // empty obj{size:0}

setObj.add('a');
setObj.add('b');
setObj.add('c');
console.log(setObj) //{'a', 'b', 'c'}


console.log(setObj.has('a'))

console.log("delete",setObj.delete('c'))

console.log("after delete",setObj)

// unique array

const numUnique = [4,1,2,3,2,5,67,3,4,]

console.log(new Set(numUnique)) // {4,1,2,3,5,67}

console.log([...new Set(numUnique)]) // [4,1,2,3,5,67]

for(let [key,value] of setObj.entries()){
  console.log(key,value) // when there is no key in Set so it consider put value in key
  // a a
  // b b
}

