import "./reset.css";
import "./style.css";

let submitButton = document.querySelector('button[type="submit"]');

let form = document.querySelector('form');
let email = form.querySelector('#mail');
let country = form.querySelector("#country");
let zipCode = form.querySelector('#zip-code');
let password = form.querySelector('#pass');
let confirmPassword = form.querySelector('#confirm-pass');

email.addEventListener('input', () => {
    let emailCheck = form.querySelector('#mail');
    emailCheck.placeholder = '';
    if (emailCheck.checkValidity()) {
        emailCheck.className = 'valid';
        removeErrorMessage('mail');
    } else {
        emailCheck.className = 'invalid';
        displayMailError();
    }
})

country.addEventListener('input', () => {
    let countryCheck = document.querySelector("#country");
    countryCheck.placeholder = '';
    if (countryCheck.checkValidity()) {
        countryCheck.className = 'valid';
        removeErrorMessage('country');
    } else {
        countryCheck.className = 'invalid';
        displayCountryError();
    }
})

zipCode.addEventListener('input', () => {
    let zipCodeCheck = document.querySelector("#zip-code");
    let zipCodeError = document.querySelector('#zip-code + .error');
    zipCodeCheck.placeholder = '';
    let zipCodeType = /^[0-9]+$/;
    let zipCodeNumOfDigits = /^\d{6}$/;
    console.log(zipCodeCheck.value)
    console.log(zipCodeType.test(zipCodeCheck.value));
    console.log(typeof(zipCodeCheck.value));
    if (zipCodeCheck.value == '') {
        zipCodeCheck.className = 'invalid';
        zipCodeError.textContent = 'Zip code required';
        zipCodeError.className = 'error display-error';
    } else if (!zipCodeType.test(zipCodeCheck.value)) {
        zipCodeCheck.className = 'invalid';
        zipCodeError.textContent = 'Zip code can contain only numeric digits';
        zipCodeError.className = 'error display-error';   
    } else if (!zipCodeNumOfDigits.test(zipCodeCheck.value)) {
        zipCodeCheck.className = 'invalid';
        zipCodeError.textContent = 'Zip code must be of 6 digits';
        zipCodeError.className = 'error display-error';
    } else {
        zipCodeCheck.className = 'valid';
        zipCodeError.textContent = '';
        zipCodeError.className = 'error';
    }
})

password.addEventListener('input', () => {
    let passwordCheck = document.querySelector('#pass');
    passwordCheck.placeholder = '';
    let passwordNumOfChars = /^.{4,}$/;
    let error = document.querySelector('#pass + .error');
    if (passwordCheck.validity.valueMissing) {
        error.textContent = 'password required';
        error.className = 'error display-error';
        passwordCheck.className = 'invalid';
    } else if (passwordCheck.validity.patternMismatch) {
        error.textContent = 'password can contain only letters and numbers';
        error.className = 'error display-error';
        passwordCheck.className = 'invalid';
    } else if (!passwordNumOfChars.test(passwordCheck.value)) {
        error.textContent = 'password must contain at least 4 characters'
        error.className = 'error display-error';
        passwordCheck.className = 'invalid';
    } else {
        error.textContent = '';
        error.className = 'error';
        passwordCheck.className = 'valid';
    }

    let confirmPass = document.querySelector('#confirm-pass');
    let confirmPassError = document.querySelector('#confirm-pass + .error')
    if (comparePassAndConfirmPass()) {
        confirmPass.className = 'valid';
        confirmPassError.textContent = '';
        confirmPassError.className = 'error';
    } else {
        confirmPass.className = 'invalid';
        confirmPassError.textContent = 'Passwords do not match';
        confirmPassError.className = 'error display-error';
    }
})

confirmPassword.addEventListener('input', () => {
    let confirmPass = document.querySelector('#confirm-pass');
    confirmPass.placeholder = '';
    let confirmPassError = document.querySelector('#confirm-pass + .error')
    if (comparePassAndConfirmPass()) {
        confirmPass.className = 'valid';
        confirmPassError.textContent = '';
        confirmPassError.className = 'error';
    } else {
        confirmPass.className = 'invalid';
        confirmPassError.textContent = 'Passwords do not match';
        confirmPassError.className = 'error display-error';
    }
})

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let errors = 0;
    let empty = 0;
    let inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
        if (input.classList.contains('invalid')) {
            errors++;
        } else if (input.className == '') {
            input.placeholder = 'required';
            empty++;
        }
    })

    if ((errors == 0) && (empty == 0)) {
        alert('Form successfully submitted');
    } else {
        alert('Please submit correct details');
    }
})

function displayMailError() {
    let email = document.querySelector('#mail');
    let errorMessage = document.querySelector('#mail + .error')
    if (email.validity.valueMissing) {
        errorMessage.textContent = 'email required';
    } else if (email.validity.patternMismatch) {
        errorMessage.textContent = 'email must be of the form some_mail123@gmail.com';
    }
    errorMessage.className = 'error display-error';
}

function displayCountryError() {
    let country = document.querySelector("#country");
    let errorMessage = document.querySelector('#country + .error');
    if (country.validity.valueMissing) {
        errorMessage.textContent = 'Country name required';
    } else if (country.validity.patternMismatch) {
        errorMessage.textContent = 'Country name should contain only letters with no spaces';
    }
    errorMessage.className = 'error display-error';
}

function removeErrorMessage(element) {
    switch(element) {
        case 'mail':
            let mailError = document.querySelector('#mail + .error');
            mailError.textContent = '';
            mailError.className = 'error';
            break;
        case 'country':
            let countryError = document.querySelector('#country + .error');
            countryError.textContent = '';
            countryError.className = 'error';
    }
}

function comparePassAndConfirmPass() {
    let pass = document.querySelector('#pass');
    let confirmPass = document.querySelector('#confirm-pass');
    if (pass.value == confirmPass.value) {
        return true;
    } else return false;
}