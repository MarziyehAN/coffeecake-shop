document.addEventListener('DOMContentLoaded', function(){
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

loginLink.addEventListener('click', () => {
    wrapper.classList.add('active');
    



})

registerLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
})
const btnPopup = document.querySelector('#sign-in-icon');
btnPopup.addEventListener('click', () => {
    wrapper.classList.toggle('active-popup');
})
const iconClose = document.querySelector('.bi-x-square-fill');
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
})

});