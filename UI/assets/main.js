let collapsibleBox = document.querySelector('header.front .bottom-header .box');
let mobileMenu = document.querySelector('header.front .bottom-header ul');

collapsibleBox.addEventListener('click', () =>{
    mobileMenu.classList.toggle('show');
});

// pop up notification

let signUpModal = document.querySelector('.modal-box.signup');
let logInModal = document.querySelector('.modal-box.login');
let logInLink = document.querySelectorAll('.log-in-link');
let signUpLink = document.querySelectorAll('.sign-up-link');
let closeBtn = document.querySelectorAll('.close-button');

// function to add show class to the sign up modal
let showSignUpModal = () => signUpModal.classList.add('show');

// function to add show class to the login modal
let showlogInModal = () => logInModal.classList.add('show');

// function to add show class to the sign up modal
let showsignUpModal = () => signUpModal.classList.add('show');

// function to remove modal from login and sign up modal
let closeModal = () => {
    signUpModal.classList.remove('show');
    logInModal.classList.remove('show');
};

// attach event listener to the log in links and add show class on click
logInLink[0].addEventListener('click', showlogInModal);
signUpLink[0].addEventListener('click', showsignUpModal);

// logInLink[1].addEventListener('click', showlogInModal);
signUpLink[1].addEventListener('click', showsignUpModal);

// logInLink[2].addEventListener('click', showlogInModal);
// signUpLink[2].addEventListener('click', showsignUpModal);

closeBtn[0].addEventListener("click", closeModal);
closeBtn[1].addEventListener("click", closeModal);


// sign up and login redirects to profile page
let logInButton = document.getElementById("login-button");
logInButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'dashboard/profile.html'
});
let signUpButton = document.getElementById("signup-button");
signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'dashboard/profile.html'
});


let formOne = document.querySelector('form .one');
let formTwo = document.querySelector('form .two');

let formNextButton = document.getElementById('next');
formNextButton.addEventListener('click', (e) => {
   e.preventDefault();
   formOne.classList.remove('show');
   formTwo.classList.add('show');
});

let formprevButton = document.getElementById('prev');
formprevButton.addEventListener('click', (e) => {
    e.preventDefault();
    formTwo.classList.remove('show');
    formOne.classList.add('show');
});