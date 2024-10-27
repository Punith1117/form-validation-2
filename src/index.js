import "./reset.css";
import "./style.css";

let submitButton = document.querySelector('button[type="submit"]');

let form = document.querySelector('form');
let email = form.querySelector('#mail');
let country = form.querySelector("#country");
let zipCode = form.querySelector('#zip-code');
let password = form.querySelector('#pass');

email.addEventListener('input', () => {
    let emailCheck = form.querySelector('#mail');

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

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let mail = document.querySelector('#mail');
    if(mail.checkValidity()) {
        alert('form submitted');
    } else {
        alert('form not submitted');
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