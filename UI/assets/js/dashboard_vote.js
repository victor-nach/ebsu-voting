// pop up notification

let logInModal = document.querySelector('.modal-box.login');
let logInLink = document.querySelectorAll('.log-in-link');
let closeBtn = document.querySelector('.close-button');


// function to add show class to the login modal
let showlogInModal = () => logInModal.classList.add('show');

// function to add show class to the sign up modal
let showsignUpModal = () => signUpModal.classList.add('show');

// function to remove modal from login and sign up modal
let closeModal = () => {
    logInModal.classList.remove('show');
};

// attach event listener to the log in links and add show class on click
// logInLink.addEventListener('click', showlogInModal);
logInLink.forEach(item => item.addEventListener('click', showlogInModal))

closeBtn.addEventListener("click", closeModal);
