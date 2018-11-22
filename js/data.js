/** Contructor to NewUser */
function NewUser(
  name,
  phone,
  zip,
  email,
  gender,
  birthDate,
  username,
  password,
  city,
  country,
  state,
  experience,
  languages,
  skills,
  jobTitle,
  company,
  website,
  profilePicture
) {
  this.name = name;
  this.phone = phone;
  this.zip = zip;
  this.email = email;
  this.gender = gender;
  this.birthDate = birthDate;
  this.username = username;
  this.password = password;
  (this.city = city),
    (this.state = state),
    (this.country = country),
    (this.experience = experience);
  this.languages = languages;
  this.skills = skills;
  this.jobTitle = jobTitle;
  this.company = company;
  this.website = website;
  this.profilePicture = profilePicture;
}

let registered;

/**
 * Listener that take control when show modal with data user.
 */
$("#invalidCheck2").click(function(e) {
  //Check input
  if (!$("#invalidCheck2").is(":checked")) {
    console.log("is not checked.");
    $("#confirm-submit").attr("id", "nosubmit");
  } else {
    console.log("is checked.");
    // Inser content in body:
    $("#nosubmit").attr("id", "confirm-submit");
    console.log("Se muestra Modal");
  }
});

$("#inputGroupPrependPSW").click(function (e) {
  var x = document.getElementById("inputPassword5");
  if (x.type === "password") {
    x.type = "text";
    console.log($(this));
    $("#inputGroupPrependPSW").empty().html('<i id="eyePSW" class="far fa-eye-slash"></i>');
  } else {
    x.type = "password";
    $("#inputGroupPrependPSW").empty().html('<i id="eyePSW" class="far fa-eye"></i>');

  }
});

/** Listener event to submit*/
$("#registerSubmit").submit(function(e) {
  console.log("submit actived...");
  e.preventDefault();

  /**
   * @name getCheckedBox  Create array with checked inputs in checkbox input.
   * @param {string} idinput - id input checkbox.
   */
  function getCheckedBox(idinput) {
    return $(idinput + ' input[type="checkbox"]:checked')
      .map(function() {
        return $(this).val();
      })
      .get();
  }

  /** Check Password format
   * @param {string} inputtxt */

  function CheckPassword(inputtxt) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if (inputtxt.match(passw)) {
      // alert("Correct, try another...");
      return true;
    } else {
      // alert("Wrong...!");
      return false;
    }
  }

  let password = $("#inputPassword5").val();
  let name = $("#validationname").val();
  let phone = $("#InputPhone").val();
  let zip = $("#validationZip").val();
  let email = $("#validationInputEmail").val();
  let gender = $('#genders input[type="radio"]:checked').val();
  let birthDate = $("#validationbirthDate").val();
  let username = $("#validationUsername").val();
  let city = $("#validationCity").val();
  let country = $("#validationCountry").val();
  let state = $("#validationStreet").val();
  let experience = $("#experience").val();

  let languages = getCheckedBox("#languages");
  let skills = getCheckedBox("#skills");

  let jobTitle = $("#validationJobTitle").val();
  let company = $("#validationCompany").val();
  let website = $("#validationRepository").val();

  let profilePicture = document.querySelector("input[type=file]").files[0];

  // *** CHECK variables ****
  // console.log(
  //   name,
  //   phone,
  //   zip,
  //   email,
  //   gender,
  //   birthDate,
  //   username,
  //   password,
  //   city,
  //   country,
  //   state,
  //   experience,
  //   languages,
  //   skills,
  //   jobTitle,
  //   company,
  //   website,
  //   profilePicture
  // );


  if (!CheckPassword(password)) {
    $("#inputPassword5")
      .addClass("border-danger is-invalid")
      .focus();
    $("#passwordHelpBlock")
      .removeClass("text-muted")
      .addClass("text-danger");
  } else {
    if ($("#inputPassword5").hasClass("border-danger")) {
      $("#inputPassword5").removeClass("border-danger is-invalid");
      $("#passwordHelpBlock")
        .addClass("text-muted")
        .removeClass("text-danger");
    }

    /** Take all values in NewUser */
    registered = new NewUser(
      name,
      phone,
      zip,
      email,
      gender,
      birthDate,
      username,
      password,
      city,
      country,
      state,
      experience,
      languages,
      skills,
      jobTitle,
      company,
      website,
      profilePicture
    );

    console.log(registered);

    function renderModalConfirm() {
      console.log("Inserted modal html.");
      let confirmBody = `
      <div class="container-fluid">
        <div class="row mb-1">
          <fieldset>
            <legend>Login data</legend>
            <div class="col">
              <p><strong>Username: </strong>${registered.username}</p>
              <p><strong>Password: </strong>${registered.password}</p>
              <p><strong>Name and surname: </strong>${registered.name}</p>
              <p><strong>Birth Date: </strong>${registered.birthDate}</p>
              <p><strong>Gender: </strong>${registered.gender}</p>
            </div>
          </fieldset>
        </div>
        <div class="row mb-1">
          <address>
            <legend>Address data</legend>
            <div class="col">
              <div class="row">
                <div class="col">
                  <p><strong>City: </strong>${registered.city}</p>
                  <p><strong>Country: </strong>${registered.country}</p>
                </div>
                <div class="col">
                  <p><strong>Street: </strong>${registered.country}</p>
                  <p><strong>Zip: </strong>${registered.country}</p>
                </div>
              </div>
            </div>
            <div class="col">
              <p><strong>Phone: </strong>${registered.phone}</p>
              <p><strong>Email: </strong>${registered.email}</p>
            </div> 
          </address>
        </div>
        <div class="row mb-1">
          <fieldset>
            <legend>Experience data</legend>
            <div class="col">
              <p><strong>Laboral Experience: </strong>${
                registered.experience
              }</p>
              <p><strong>Job Title: </strong>${registered.jobTitle}</p>
              <p><strong>Skills: </strong>${registered.skills.join(", ")}</p>
              <p><strong>Languages: </strong>${registered.languages.join(
                ", "
              )}</p>
            </div>
          </fieldset>
        </div>
      <div>
      `;
      $("#modal-confirm")
        .empty()
        .html(confirmBody);
    }

    renderModalConfirm();

    /** Take values from NewUser object to create formBody */
    function createRequestBody() {
      let formData = new FormData();

      // Sent as a string
      formData.append("name", registered.name); //* */

      // Sent as a string
      formData.append("username", registered.username); //* */

      // Sent as a string with email validation
      formData.append("email", registered.email); //* */

      // Sent as a string
      formData.append("city", registered.city);

      // Sent as a string
      formData.append("state", registered.state);

      // Sent as a string
      formData.append("gender", registered.gender);

      // Sent as a string
      formData.append("country", registered.country);

      // Sent as a string
      formData.append("jobTitle", registered.jobTitle);

      // Sent as a string
      formData.append("website", registered.website);

      // Sent as a string
      formData.append("company", registered.company);

      // Sent as a string. Choose a value from below.
      formData.append("experience", registered.experience);

      // Pick the value from an input(type="date")
      formData.append("birthDate", registered.birthDate);

      // Pick the value from an input(type="file") that accepts only jpeg and png formats and files under 3MB size
      formData.append("profilePicture", registered.profilePicture);

      // Store all the values selected in the form inside an Array and parse it as a string
      formData.append("languages", JSON.stringify(registered.languages));

      // Store all the values selected in the form inside an Array and parse it as a string
      formData.append("skills", JSON.stringify(registered.skills));

      return formData;
    }

    /** Send info to API */
    function sendNewUser() {
      let formBody = createRequestBody();

      fetch("https://cv-mobile-api.herokuapp.com/api/users", {
        method: "POST",
        body: formBody
      })
        .then(res => res.json())
        .then(response => console.log(response))
        .catch(error => console.log(error.message));
    }
    let confirm = false;
    // Need check the send info before.
    !confirm ? console.log("No se envia") : sendNewUser();
    // this.reset();
    // $("#preview").attr("src", "");
    // Change class in submit to no luncha again modal.
    return registered;
  }
});

/** Create previewFile in form. */
function previewFile() {
  let preview = document.querySelector("#preview");
  let file = document.querySelector("input[type=file]").files[0];
  let reader = new FileReader();

  reader.addEventListener(
    "load",
    function() {
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

console.log(NewUser);
