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

$("#registerSubmit").submit(function(event) {
  console.log("submit actived...");
  event.preventDefault();
  let password = $("#inputPassword5").val();
  let name = $("#validationname").val();
  let phone = $("#InputPhone").val();
  let zip = $("#validationZip").val();
  let email = $("#validationInputEmail").val();
  let gender = $('#genders input[type="radio"]:checked').val();
  let birthDate = "1986-02-25T00:00:00.000Z";
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
      website,
      profilePicture
    );
    this.reset();
    sendNewUser();
    return registered;
  }
});

function CheckPassword(inputtxt) {
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  if (inputtxt.match(passw)) {
    alert("Correct, try another...");
    return true;
  } else {
    alert("Wrong...!");
    return false;
  }
}

function sendNewUser() {
  let formBody = registered;

  fetch("https://cv-mobile-api.herokuapp.com/api/users", {
    method: "POST",
    body: formBody
  })
    .then(res => res.json())
    .then(response => console.log(response));
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
