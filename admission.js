const btnNextButton = document.getElementById("btn-next");
const btnPreviousButton = document.getElementById("btn-previous");
const contactDetailsForm = document.getElementById("contact-details-form");
const personalDetailsForm = document.getElementById("personal-details-form");

function displayContactDetailsForm () {
    contactDetailsForm.style.display = "block";
    personalDetailsForm.style.display = "none";
}

function displayPersonalDetailsForm () {
    personalDetailsForm.style.display = "block";
    contactDetailsForm.style.display = "none";
}

btnNextButton.addEventListener("click", displayContactDetailsForm);
btnPreviousButton.addEventListener("click", displayPersonalDetailsForm);
