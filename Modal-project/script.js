'use strict';

const modal = document.querySelectorAll('.show-modal')
const modalWindow = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModal=document.querySelector('.close-modal');

function hideModal(){
  //modalWindow.style.display='none';
  //overlay.style.display='none';
  
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden')

}

const showModal =() => {
  //modalWindow.style.display='block';
  //overlay.style.display='block';

  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden')

}

modal.forEach(function(btn){
  btn.addEventListener('click',showModal)
})

closeModal.addEventListener('click',hideModal)
overlay.addEventListener('click',hideModal)


document.addEventListener('keydown',function(event){
  if(event.key === 'Escape' && !modalWindow.classList.contains('hidden')){
    hideModal()
  }
})





