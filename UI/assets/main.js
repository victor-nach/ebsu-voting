let collapsibleBox = document.querySelector('header.front .bottom-header .box');
let mobileMenu = document.querySelector('header.front .bottom-header ul');

collapsibleBox.addEventListener('click', () =>{
    mobileMenu.classList.toggle('show');
});

// pop up notification

let signUpModal = document.querySelector('.modal-box.signup');
let logInModal = document.querySelector('.modal-box.login');
let logInLink = document.querySelector('.log-in-link');
let signUpLink = document.querySelector('.sign-up-link');
let closeBtn = document.querySelector('.close-button');

// function to add show class to the sign up modal
let showSignUpModal = () => signUpModal.classList.add('show');

// function to add show class to the login modal
let showlogInModal = () => logInModal.classList.add('show');

// function to add show class to the sign up modal
let showsignUpModal = () => logInModal.classList.add('show');

// function to remove modal from login and sign up modal
let closeModal = () => {
    signUpModal.classList.remove('show');
    logInModal.classList.remove('show');
};

// attach event listener to the log in links and add show class on click
logInLink.addEventListener('click', showlogInModal, );
signUpLink.addEventListener('click', showsignUpModal);

function windowOnClick(event) {
    if (event.target === modal) {
        closeModal();
    }
}

closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", windowOnClick);