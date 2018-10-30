function NewUser(
  name,
  //  phone,
  //  zip,
  email,
  gender,
  birthDate,
  username,
  //  password,
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
  //  this.phone = phone;
  //  this.zip = zip;
  this.email = email;
  this.gender = gender;
  this.birthDate = birthDate;
  this.username = username;
  //  this.password = password;
  this.location = {
    city: city,
    state: state,
    country: country
  };
  this.experience = experience;
  this.languages = languages;
  this.skills = skills;
  this.jobTitle = jobTitle;
  this.company = company;
  this.website = website;
  this.profilePicture = profilePicture;
}

// {
//     "languages": [ "english", "spanish" ],
//     "skills": [ "html", "css", "javascript", "node", "express" ],
//     "_id": "5bbcd6c233daa000153cc81e",
//     "name": "Patricia Lebsack",
//     "username": "Kariannes",
//     "email": "Julianne.OConner@kory.com",
//     "gender": "male",
//     "location": { "city": "Leith", "state": "Edimburg", "country": "United Kingdom" },
//     "company": "Robel-Corkery",
//     "jobTitle": "Fullstack Developer",
//     "website": "lebsack.info",
//     "birthDate": "1986-02-25T00:00:00.000Z",
//     "experience": "- 1 year",
//     "registeredDate": 1534149132000,
//     "profilePicture": "https://cv-mobile-api.herokuapp.com/uploads/500_9.jpeg",
//     }

let registered;

$("#registerSubmit").submit(function(e) {
  console.log("submit actived...");
  e.preventDefault();
  let password = $("#inputPassword5").val();
  let name = $("#validationname").val();
  let phone = $("#InputPhone").val();
  let zip = $("#validationZip").val();
  let email = $("#validationInputEmail").val();
  let gender = $('#genders input[type="radio"]:checked').val();
  let birthDate = $('#validationbirthDate').val();
  let username = $("#validationUsername").val();
  let city = $("#validationCity").val();
  let country = $("#validationCountry").val();
  let state = $("#validationState").val();
  let experience = $("#experience").val();

  let languages = $('#languages input[type="checkbox"]:checked')
    .map(function() {
      return $(this)
        .next("label")
        .text()
        .toLowerCase()
        .split(" ")
        .join("%20");
    })
    .get();

  // Exist this method like alone function to call with id.    
  let skills = $('#skills input[type="checkbox"]:checked')
    .map(function() {
      return $(this)
        .next("label")
        .text()
        .toLowerCase()
        .split(" ")
        .join("%20");
    })
    .get();
  let jobTitle = $("#validationJobTitle").val();
  let company = "Test Company"; // Create field if it's necesary.
  let website = $("#validationRepository").val();
  // let profilePicture = $("#profilePicture").files[0];
  let profilePicture = document.querySelector("input[type=file]").files[0];

  console.log(
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
      // phone,
      // zip,
      email,
      gender,
      birthDate,
      username,
      // password,
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
    // let testBody = createRequestBody();
    sendNewUser();
    this.reset();
    $("#preview").attr("src", "");
    return registered;
  }
});

function createRequestBody() {
  let formElement = document.getElementById("registerSubmit");

  let formData = new FormData(formElement);

  // Sent as a string
  formData.append("name", validationname.value);

  // Sent as a string
  formData.append("username", validationUsername.value);

  // Sent as a string with email validation
  formData.append("email", validationInputEmail.value);

  // Sent as a string
  formData.append("city", validationCity.value);

  // Sent as a string
  formData.append("gender", $('#genders input[type="radio"]:checked').value);

  // Sent as a string
  formData.append("country", validationCountry.value);

  // Sent as a string
  formData.append("jobTitle", validationJobTitle.value);

  // Sent as a string
  formData.append("website", validationRepository.value);

  // Sent as a string
  formData.append("company", validationCompany.value);

  // Sent as a string. Choose a value from below.
  formData.append("experience", experience.value);

  // Pick the value from an input(type="date")
  formData.append("birthDate", validationbirthDate.value);

  // Pick the value from an input(type="file") that accepts only jpeg and png formats and files under 3MB size
  formData.append("profilePicture", profilePicture.files[0]);

  // Store all the values selected in the form inside an Array and parse it as a string
  formData.append("languages", languages.value);

  // Store all the values selected in the form inside an Array and parse it as a string
  formData.append("skills", skills.value);

  return formData;
}

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

function sendNewUser() {
  let formBody = registered;
  // let formBody = createRequestBody();
  console.log("This is formBody to send: " + formBody);
  fetch('https://cv-mobile-api.herokuapp.com/api/users', {
    method: "POST",
    body: formBody
  })
    .then(res => res.json())
    .then(data => console.log("SendNewUser(), data: " + data))
    .catch(error => console.log(error.message));
}

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
