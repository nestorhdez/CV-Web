function NewUser(
  name,
  phone,
  zip,
  email,
  gender,
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
) {
  this.name = name;
  this.phone = phone;
  this.zip = zip;
  this.email = email;
  this.gender = gender;
  this.username = username;
  this.password = password;
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
  if (!CheckPassword(password)) {
    $('#inputPassword5').addClass('border-danger is-invalid');
  };

  let name = $("#validationname").val();
  let phone = $("#InputPhone").val();
  let zip = $("#validationZip").val();
  let email = $("#validationInputEmail").val();
  let gender = $('#genders input[type="radio"]:checked').val();
  let username = $("#validationUsername").val();
  let password = $("#inputPassword5").val();
  let city = $("#validationCity").val();
  let country = $("#validationCountry").val();
  let state = $("#validationState").val();
  let experience = $("#experience").val();
  let profilePicture = $("#profilePicture").val();

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

  console.log(
    name,
    phone,
    zip,
    email,
    gender,
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

  registered = new NewUser(
    name,
    phone,
    zip,
    email,
    gender,
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
  this.reset();
  return registered;
});

function CheckPassword(inputtxt) {
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (inputtxt.match(passw)) {
    alert("Correct, try another...");
    return true;
  } else {
    alert("Wrong...!");
    return false;
  }
}

console.log(NewUser);
