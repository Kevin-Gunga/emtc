// const btnNextButton = document.getElementById("btn-next");
// const btnPreviousButton = document.getElementById("btn-previous");
// const contactDetailsForm = document.getElementById("contact-details-form");
// const personalDetailsForm = document.getElementById("personal-details-form");

// function displayContactDetailsForm () {
//     contactDetailsForm.style.display = "block";
//     personalDetailsForm.style.display = "none";
// }

// function displayPersonalDetailsForm () {
//     personalDetailsForm.style.display = "block";
//     contactDetailsForm.style.display = "none";
// }

// btnNextButton.addEventListener("click", displayContactDetailsForm);
// btnPreviousButton.addEventListener("click", displayPersonalDetailsForm);

//connect to backend code
document.addEventListener("DOMContentLoaded", () => {
  const btnNextButton = document.getElementById("btn-next");
  const btnPreviousButton = document.getElementById("btn-previous");
  const contactDetailsForm = document.getElementById("contact-details-form");
  const personalDetailsForm = document.getElementById("personal-details-form");

  function displayContactDetailsForm() {
    contactDetailsForm.style.display = "block";
    personalDetailsForm.style.display = "none";
  }

  function displayPersonalDetailsForm() {
    personalDetailsForm.style.display = "block";
    contactDetailsForm.style.display = "none";
  }

  btnNextButton.addEventListener("click", displayContactDetailsForm);
  btnPreviousButton.addEventListener("click", displayPersonalDetailsForm);
  const form = document.getElementById("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    // const username = formData.get('username');
    // const first_name = document.getElementById('first_name').value;
    // const middle_name = document.getElementById('middle_name').value;
    // const last_name = document.getElementById('last_name').value;
    // const email = document.getElementById('email').value;
    // const id_birth = document.getElementById('id_birth').value;
    // const gender = document.getElementById('gender').value;
    // const birth_date = document.getElementById('birth_date').value;
    // const county = document.getElementById('county').value;
    // const year_examination = document.getElementById('year_examination').value;
    // const index_number = document.getElementById('index_number').value;
    // const disabled_person = document.getElementById('disabled_person').value;
    // const attachments = document.getElementById('attachments').value;
    // const postal_address = document.getElementById('postal_address').value;
    // const postal_code = document.getElementById('postal_code').value;
    // const town = document.getElementById('town').value;
    // const phone_number_1 = document.getElementById('phone_number_1').value;
    // const phone_number_2 = document.getElementById('phone_number_2').value;
    const authMsg = document.getElementById("auth-msg");

    try {
      const response = await fetch("/admission", {
        method: "POST",
        // headers: {
        //     // 'Content-Type': 'application/json'
        //     'Content-Type': 'multipart/form-data'
        // },
        // body: JSON.stringify({ first_name, middle_name, last_name, email, id_birth, gender, birth_date, county,
        //                     year_examination, index_number, disabled_person, attachments, postal_address, postal_code,
        //                     town, phone_number_1, phone_number_2
        //                     })
        body: formData,
      });
      if (!response.ok) {
        authMsg.textContent = "check your details!";
        // console.error();
      } else {
        authMsg.textContent = "Application submitted successfully";
        alert("Application submitted successfully");
      }
    } catch (err) {
      console.error(err);
      // authMsg.textContent = 'An error occured'
      alert("An error occurred during submission");
      // console.error(err);
      // console.error()
    }
  });
});
