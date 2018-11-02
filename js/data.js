
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
  this.city = city,
  this.state = state,
  this.country = country,
  this.experience = experience;
  this.languages = languages;
  this.skills = skills;
  this.jobTitle = jobTitle;
  this.company = company;
  this.website = website;
  this.profilePicture = profilePicture;
}

let registered;

/** Listener event to submit*/
$("#registerSubmit").submit(function(e) {
  console.log("submit actived...");
  e.preventDefault();

  /** 
  * @name getCheckedBox  Create array with checked inputs in checkbox input. 
  * @param {string} idinput - id input checkbox.
  */
  function getCheckedBox (idinput){
    return $(idinput +' input[type="checkbox"]:checked').map(function() {
      return $(this).val();
    }).get();
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
  let state = $("#validationState").val();
  let experience = $("#experience").val();

  let languages = getCheckedBox('#languages');
  let skills = getCheckedBox('#skills');

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

    // Need check the send info before.

    sendNewUser();
    // this.reset();
    // $("#preview").attr("src", "");
    return registered;
  }
});

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
