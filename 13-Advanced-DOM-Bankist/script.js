'use strict';

//https://bankist-dom.netlify.app/
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

//header.prepend(message)// put it on first child of header
//header.append(message) // put it on last child of header . if you used prepend and append both same time then append will overwrite prepeand.. 
//header.append(message.cloneNode(true)) // create new sepeare message element last child of header

//header.before(message)//sibling of header and put it before header
//header.after(message) // slibling of header and put it after  header

// traversing going down

 const h1 =  document.querySelector('h1')
// console.log(h1.querySelectorAll('.highlight'))
// console.log(h1.childNodes)
// console.log(h1.children)
// console.log(h1.firstChild); // return the first child node
// h1.firstElementChild.style.color='red'; // return first child that is an element
// h1.lastElementChild.style.color='black';
// console.log(h1.lastChild)

//Going upwards: parents

console.log(h1.parentNode)
console.log(h1.parentElement)

//The closest() method searches up the DOM tree for elements which matches a specified CSS selector.

//h1.closest('.header').style.background='var(--gradient-secondary)'

// Going sideways :siblings
console.log(h1.previousElementSibling) // null
console.log(h1.nextElementSibling);// h4 element
// to get all sibling
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function(e1){
console.log(e1)
})


// const html =  `<div>hello world</div>`
// header.insertAdjacentHTML('afterbegin',html)

// delete element

// document.querySelector('.btn--close-cookie').addEventListener('click',function(){
//   //message.parentElement.removeChild(message) // old way and it will remove from DOM
//   message.remove() // new way and it will remove from DOM 
// })

//change color in :root variable in css
document.documentElement.style.setProperty('--color-primary','#5ec576')

console.log(document.getElementById('logo').dataset.versionNumber)//3.0 (sversionNumber hould be camelCase)

//classes
header.classList.add('a','b');
header.classList.remove('a','b');
header.classList.toggle('c');
header.classList.contains('c')

header.className='abc' // this way directly add class on header and existing class will be overwrite. only show 1 classname


// smotth scrolloing

const btnScroll = document.querySelector('.btn--scroll-to');
const scrollToSection=document.getElementById('section--1')

btnScroll.addEventListener('click',function(e){
  // old way
  console.log("learn more button=",e.target.getBoundingClientRect())
  const s1coords=scrollToSection.getBoundingClientRect()

  console.log("section-1 coordinate=",s1coords)

  console.log("Current scroll (X/Y) position",window.pageXOffset,window.pageYOffset)//

  console.log("viewport width/height",document.documentElement.clientWidth,document.documentElement.clientHeight)

  console.log("document height",document.documentElement.scrollHeight)

  // yah per section1 ki height k sath scroll ki position bi add kerni hogi..
  //s1coords.top+window.pageYOffset = document ki top s height calculate ho jye gi till section-1
  window.scrollTo({
    left:s1coords.left+window.pageXOffset,
    top: s1coords.top+window.pageYOffset, // imp note: s1coords.top + document position from top till scroll position 
    behavior:'smooth'
  })
  // new modern way
//  scrollToSection.scrollIntoView({ behavior: "smooth"})

})



//implement event bubbling and capturing


const navLink = document.querySelector('.nav__link');
const navLink_UL= document.querySelector('.nav__links');
const nav = document.querySelector('.nav');

//The target property returns the element on which the event occurred, opposed to the currentTarget property, which returns the element whose event listener triggered the event.

// e.target rturn krega us element ko jis element  per sabsy phely event fired hwa hai..

// const randomInt = (min,max) => {
//   return Math.floor(Math.random() * (max-min+1)+min)
// }
// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`


// navLink.addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor()
//   console.log('nav link clicked',e.target,e.currentTarget)
//   console.log(e.currentTarget === this) //true
//   e.stopPropagation()
// })

// navLink_UL.addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor()
//   console.log('navigation UL clicked',e.target,e.currentTarget)
// })

// nav.addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor()

//   console.log('nav header clicked',e.target,e.currentTarget)
// })


// Page Navigation without event delegation // yha per problem hai ki event is attached on each item individuals which takes lots of memory, this approach is not good for performance optimization
const allNavLink = document.querySelectorAll('.nav__link');
// allNavLink.forEach(function(item){
//   item.addEventListener('click',function(event){
//     event.preventDefault()
//     const id=e.target.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior:'smooth'})
//   })
// })

// page navigation with event delegation
navLink_UL.addEventListener('click',function(e){
  e.preventDefault()
  if(e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  }
})

// implement tabbing
const tabsParent=document.querySelector('.operations__tab-container')
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent=document.querySelectorAll('.operations__content')

tabsParent.addEventListener('click', function(e){
  const clicked=e.target.closest('.operations__tab')

  if(!clicked) return;

  // remove active class
    tabs.forEach(t => t.classList.remove('operations__tab--active'))
    tabsContent.forEach(c => c.classList.remove('operations__content--active'))

  //active tab
  clicked.classList.add('operations__tab--active')
  const id=clicked.dataset.tab;
  console.log('id=',id)

  //active tab content
  const t1=document.querySelector(`.operations__content--${id}`)
  t1.classList.add('operations__content--active')
})

// fade navigation animation

const hover = function(e) {
  //console.log("this=",this)// .5,1
  const hover = e.target.classList.contains('nav__link');
  if(hover){
    const link=e.target;
    const siblings=link.closest('.nav').querySelectorAll('.nav__link');
    const logo  = link.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(item =>{
      if(item !== link){
        item.style.opacity=this;
        logo.style.opacity=this;
      }
    })
  }
}

nav.addEventListener('mouseover',hover.bind(.5))
nav.addEventListener('mouseout',hover.bind(1))

// sticky navifation
// not good approach to sticky
// const firstSection=scrollToSection.getBoundingClientRect();
// console.log(firstSection)
// window.addEventListener('scroll',function(){
//   if(window.scrollY > firstSection.top){
//     nav.classList.add('sticky')
//   }else {
//     nav.classList.remove('sticky')
//   }
// })

//Sticky navigation : Intersection Oberver api
//https://blog.webdevsimplified.com/2022-01/intersection-observer/

// example1
// const changeColorCallBack= (entries) => {
//   entries.forEach(entry => {
//     const intersecting=entry.isIntersecting
//     entry.target.style.backgroundColor=intersecting ? 'blue':'red'
//     entry.target.innerText = `${Math.round(entry.intersectionRatio * 100)}%`

//   })
// }

// const option = {
//   root:null,
//   threshold:0.1
// }

// const observer = new IntersectionObserver(changeColorCallBack,option)
// observer.observe(scrollToSection)

//example 2 sticky header
const myHeader =document.querySelector('.abc')
const navHeight=nav.getBoundingClientRect().height;
const stickyHeader=(entires) => {
  const [entry]= entires; // yha per only one threshold value hai esliye entires[0]
  if(!entry.isIntersecting){
    nav.classList.add('sticky')
  }else{
    nav.classList.remove('sticky')
  }
}

// threshold to 1 which means 100% of the element must be visible before it will be considered intersecting so now our color only changes to blue when the entire element is in the viewport.

const headerObserver = new IntersectionObserver(stickyHeader,{root:null,threshold:0,rootMargin:`-${navHeight}px`})
headerObserver.observe(myHeader)

// example-3 Reveal section on scrolling
const allSectionContent = document.querySelector('.section');

const revealSection = (entries,observer) => {
  const entry = entries[0]// we have not used array as threshold so there is only one threshold so only 1 entry it will give.
  //console.log(entry)
  if(!entry.isIntersecting) return;
  
  entry.target.classList.remove('section-hidden')
  observer.unobserve(entry.target)
}


const sectionObserver = new IntersectionObserver(revealSection,{root:null,threshold:0.15})
allSections.forEach(function(item){
  //sectionObserver.observe(item)
  // /item.classList.add('section-hidden')
})

// example 4 image lazy loading...

const allLazyImages = document.querySelectorAll('img[data-src]')

const lazyloadingImages = function(entries,observe){
  const [entry] = entries;
  console.log(entry)
  if(!entry.isIntersecting) return;

  entry.target.src=entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
    entry.target.classList.remove('lazy-img')// when image load then it remove lazy img
  })

  observe.unobserve(entry.target)
}


const imgObserver = new IntersectionObserver(lazyloadingImages,{root:null,threshold:0,margin:'200px'})
allLazyImages.forEach((img) => {
  //imgObserver.observe(img)
})


// implement Slider

const slides = document.querySelectorAll('.slide');
const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right');
const slider =document.querySelector('.slider');
const dotsContainer = document.querySelector('.dots')

let currentSlide=0;
const maxLength=slides.length-1;

const createDots = function(){
  slides.forEach(function(_s,i){
    const html = `<button class="dots__dot" data-slide="${i}"></button>`
    dotsContainer.insertAdjacentHTML('beforeend',html)
  })
}

const activeDot = function(slide){
  document.querySelectorAll('.dots__dot').forEach(s => s.classList.remove('dots__dot--active'))
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}


function goToSlide(slide){
  //slide=1
  slides.forEach((s,i) => (s.style.transform = `translateX(${100 * (i-slide)}%)`))
  //0-1=-1*100=-100
  //1-1=0*100=0
  //2-1=1*100=100
  //3-1=2*100=200
}


function nextToSlide(){
  // currentslide=1: -100% 0 100% 200%
  if(currentSlide === maxLength) {
    currentSlide=0;
  }else {
    currentSlide++;
  }
  goToSlide(currentSlide)
  activeDot(currentSlide)

}

function prevToSlide(){
  if(currentSlide === 0) {
    currentSlide = maxLength;
  }else {
    currentSlide--;
  }
  goToSlide(currentSlide)
  activeDot(currentSlide)

}

function init(){
  goToSlide(0)
  createDots()
  activeDot(0)
}
init();

//event handler
btnRight.addEventListener('click',nextToSlide)
btnLeft.addEventListener('click',prevToSlide)

document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft') prevToSlide();
  e.key === 'ArrowRight' && nextToSlide()
})

dotsContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset
    goToSlide(slide)
    activeDot(slide)
  }
})








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
