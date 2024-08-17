const btnNextButton = document.getElementById("btn-next");
const btnPreviousButton = document.getElementById("btn-previous");
const contactDetailsForm = document.getElementById("contact-details-form");
const personalDetailsForm = document.getElementById("personal-details-form");

function displaycontactDetailsForm () {
    contactDetailsForm.style.display = "block";
    personalDetailsForm.style.display = "none";
};

function displaypersonalDetailsForm () {
    contactDetailsForm.style.display = "none";
    personalDetailsForm.style.display = "block";
};

btnNextButton.addEventListener("click", displaycontactDetailsForm);
btnPreviousButton .addEventListener("click", displaypersonalDetailsForm);
