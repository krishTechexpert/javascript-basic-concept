'use strict';


console.log('******* Advance DOM **** ')

// selecting elements
console.log(document.documentElement)
console.log(document.head)
console.log(document.body)
const header=document.querySelector('.header')
document.getElementById('section--1')

//NodeList vs HTMLCollection differnce below

const allSections=document.querySelectorAll('.section')
console.log(allSections) // //NodeList(4)[section#section--1,section#section--2,section#section--3,section#section--4]

// return once nodesList array created then  we can not update nodes .ie agar inspect element s node ko select kery delete krogy toh woh delete ho jyega from UI but nodeList array s delete nhi hoga, length will not update

const allButtons= document.getElementsByTagName('button')
console.log(allButtons) // HTMLCollection(9)[button.btn--text.btn--scroll-to,slider__btn slider__btn--left]
//These are HTML Collections are live element which updated when you delete,update etc.


// Creating and inserting element

const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent=' We used cookied for improved funcationality and analytics.'
message.innerHTML= ' We used cookied for improved funcationality and analytics. <button class="btn btn--close-cookie">got it!</button>'

header.prepend(message)// put it on first child of header
//header.append(message) // put it on last child of header . if you used prepend and append both same time then append will overwrite prepeand.. 
//header.append(message.cloneNode(true)) // create new sepeare message element last child of header

//header.before(message)//sibling of header and put it before header
//header.after(message) // slibling of header and put it after  header

// traversing going down

// const h1 =  document.querySelector('h1')
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)
// console.log(h1.firstChild); // return the first child node
// h1.firstElementChild.style.color='red'; // return first child that is an element
// h1.lastElementChild.style.color='black';
// console.log(h1.lastChild)


const html =  `<div>hello world</div>`
header.insertAdjacentHTML('afterbegin',html)

// delete element

document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  //message.parentElement.removeChild(message) // old way and it will remove from DOM
  message.remove() // new way and it will remove from DOM 
})

//change color in :root variable in css
document.documentElement.style.setProperty('--color-primary','#5ec576')

console.log(document.getElementById('logo').dataset.versionNumber)//3.0 (sversionNumber hould be camelCase)

//classes
header.classList.add('a','b');
header.classList.remove('a','b');
header.classList.toggle('c');
header.classList.contains('c')

header.className='abc' // this way directly add class on header and existing class will be overwrite. only show 1 classname


















///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
