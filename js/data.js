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
  street,
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
  this.street = street,
  this.country = country,
  this.experience = experience;
  this.languages = languages;
  this.skills = skills;
  this.jobTitle = jobTitle;
  this.company = company;
  this.website = website;
  this.profilePicture = profilePicture;
}

/** Render all items from one objetct 
 * @name getAllElements - function return element from object list.
 * @param url - field need fill in html.
*/
getAllElements = function(url) {
  $.ajax({
    url: `https://cv-mobile-api.herokuapp.com/api/`+url,
    dataType: "json"
  }).done(function(data) {
    console.log(data);
    /** checkbox element*/
    /** clean container */
    console.log("¿Scoope?, ", url);
    $('#'+url).empty();
    /** insert value */
    data.forEach(function(val) {
      let check = `
      <div class="form-check custom-checkbox col">
        <input class="form-check-input" type="checkbox" id="${val.label.toLowerCase()}-check" name='${url}[]' value='${val._id}'>
        <label class="form-check-label" for='${val.label.toLowerCase()}-check'>${val.label}</label>
      </div>`;

      document.getElementById(url).innerHTML += check;
    });

    return data;
  });
}

getAllElements("skills");
getAllElements("langs");

/**Specific function to collect the marked checkbox labels.
 * @param name_Input - value of attribute name.
 */
getAllInputsLabel = function (name_Input) {
    return $(`input[name="${name_Input}"][type="checkbox"]:checked`)
      .map(function() {
        return $(this).prop('id').split('-check').join("");
      })
      .get();
  }

let registered;

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

/** Listener to show o hidden password */
$("#inputGroupPrependPSW").click(function (e) {
  var x = document.getElementById("inputPassword5");
  if (x.type === "password") {
    x.type = "text";
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
  
  let labelslangs = getAllInputsLabel("langs[]");
  let labelsskills = getAllInputsLabel("skills[]");

  console.log("labels:", labelslangs);

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

  /** Take values from NewUser object to create formBody
   * @param userJson - It's NewUser object to build Json
   */
  function createRequestBody(userJson) {
    let userData = {};

    userData = {
      name: userJson.name,
      username: userJson.username,
      email: userJson.email,
      phone: userJson.phone,
      gender: userJson.gender,
      address: {
        country: userJson.country,
        city: userJson.city,
        street: userJson.street,
        zipcode: userJson.zip
      },
      company: userJson.company,
      jobTitle: userJson.jobTitle,
      languages: userJson.languages,
      skills: userJson.skills,
      experience: userJson.experience,
      website: userJson.website,
      birthDate: userJson.birthDate
    };

    return userData;
  }

  /** Send info to API */
  function sendNewUser() {
    let userBody = createRequestBody(registered);
    console.log(typeof userBody, userBody);

    fetch("https://cv-mobile-api.herokuapp.com/api/users", {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        let pong = response;
        let fileForm = new FormData();
        fileForm.append("img", registered.profilePicture);
        let id_user = response._id;
        console.log("ID: ", id_user, ". Pong: ", pong);
        fetch(`https://cv-mobile-api.herokuapp.com/api/files/upload/user/${id_user}`, {
          method: "POST",
          body: fileForm
        })
          .then(response => {console.log("Sucess new User:", response);
          if (response.status==200) {
            alert('Enviado correctamente');
            document.getElementById("registerSubmit").reset();
            $(".close").trigger('click');
            $("#modal-confirm").empty().html("...");
            $("#confirm-submit").attr("id", "nosubmit");
            $("#preview").attr("src", "");
          } else {
            alert(`Error en el envio. ${response.statusText}`);
          }})
          .catch(error => console.log("Error upload picture:", error.message));
      })
      // .then(response => console.log("Sucess:", JSON.stringify(response._id)))
      .then(response => console.log("Sucess New user with picture:", response))
      .catch(error => console.log("Error Fulluser:", error.message));
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

  /**
   * Function to sanitaze strings before to input.
   * @param {string} string 
   * @returns {string} string sanitaze.
   */
  function sanitarize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
  }

  let password = sanitarize($("#inputPassword5").val());
  let name = sanitarize($("#validationname").val());
  let phone = $("#InputPhone").val();
  let zip = sanitarize($("#validationZip").val());
  let email = $("#validationInputEmail").val();
  let gender = $('#genders input[type="radio"]:checked').val();
  let birthDate = $("#validationbirthDate").val();
  let username = sanitarize($("#validationUsername").val());
  let city = sanitarize($("#validationCity").val());
  let country = sanitarize($("#validationCountry").val());
  let street = sanitarize($("#validationStreet").val());
  let experience = sanitarize($("#experience").val());

  let languages = getCheckedBox("#langs");
  let skills = getCheckedBox("#skills");

  let jobTitle = sanitarize($("#validationJobTitle").val());
  let company = sanitarize($("#validationCompany").val());
  let website = sanitarize($("#validationRepository").val());

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
  //   street,
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
      street,
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
        <div class="col mb-1">
          <fieldset class="mx-auto">
            <legend>Login data</legend>
            <div id="imgavatar" class="col-6 mb-4"></div>
            <div class="col">
              <p><strong>Username: </strong>${registered.username}</p>
              <p><strong>Password: </strong>${registered.password}</p>
              <p><strong>Name and surname: </strong>${registered.name}</p>
              <p><strong>Birth Date: </strong>${registered.birthDate}</p>
              <p><strong>Gender: </strong>${registered.gender}</p>
            </div>
          </fieldset>
          <address class="mx-auto">
            <legend>Contact data</legend>
            <div class="col">
              <div class="row">
                <div class="col">
                  <p><strong>City: </strong>${registered.city}</p>
                  <p><strong>Country: </strong>${registered.country}</p>
                </div>
                <div class="col">
                  <p><strong>Street: </strong>${registered.country}</p>
                  <p><strong>Zip: </strong>${registered.zip}</p>
                </div>
              </div>
            </div>
            <div class="col">
              <p><strong>Phone: </strong>${registered.phone}</p>
              <p><strong>Email: </strong>${registered.email}</p>
            </div> 
          </address>
          <fieldset class="mx-auto">
            <legend>Experience data</legend>
            <div class="col">
              <p><strong>Laboral Experience: </strong>${registered.experience}</p>
              <p><strong>Job Title: </strong>${registered.jobTitle}</p>
              <p><strong>Skills: </strong>${labelslangs.join(", ").replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase())}</p>
              <p><strong>Languages: </strong>${labelsskills.join(", ").replace(/^(.)|\s(.)/g, ($1) => $1.toUpperCase())}</p>
            </div>
          </fieldset>
        </div>
      <div>
      `;
      
      $("#modal-confirm")
      .empty()
      .html(confirmBody);

      $( "#preview" ).clone().appendTo( "#imgavatar" );
    }

    renderModalConfirm();

    // Need check the send info before.
    // let confirm = false;
    // !confirm ? console.log("No se envia") : sendNewUser();
    
    $("#userConfirmed").click(function() {
      sendNewUser();
      // document.getElementById("registerSubmit").reset();
      // $(".close").trigger('click');
      // $("#modal-confirm").empty().html("...");
      // $("#confirm-submit").attr("id", "nosubmit");
      // $("#preview").attr("src", "");

    })
    
    // Change class in submit to no luncha again modal.
    return registered;
  }
});

console.log(NewUser);
