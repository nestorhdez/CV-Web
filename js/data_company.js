function NewCompany(
    name,
    phone,
    email,
    docType, // CIF-NIF
    docNumber, // String
    zip,
    street,
    city,
    country,
    website,
    logo,
    bio,
    employes, // Numbers
    socialUrls) { // Array de objectos
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.docType = docType; // CIF-NIF
    this.docNumber = docNumber;// String
    this.zip = zip;
    this.street = street;
    this.city = city;
    this.country = country;
    this.website = website;
    this.logo = logo;
    this.bio = bio;
    this.jobOffers = []; // Objeto?
    this.employes = employes; // Numbers
    this.socialUrls = socialUrls; // Array de objectos
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

$("#registerCompanySubmit").submit(function(e) {
  e.preventDefault();
  //console.log("submit actived.");
  let inputtrue = true;

  $(".input-validate").each(function(index, element){
    // console.log($(this));
    if($(this)[0].validity.valid == false){
      console.log($(element)[0].validationMessage);
      $(element).addClass("border-danger").prop('title', $(element)[0].validationMessage);
      $(element).tooltip('enable').tooltip('show').focus();
      inputtrue = false;
    } else {
      $(element).removeClass("border-danger is-invalid");
      $(element).tooltip('disable');
    };

  });

  // Need check CIF-NIF
  /** Checking CIF-NIF validate */
  function checkNIF(nif) {
    nif = nif.toUpperCase().replace(/[\s\-]+/g, '');
    if(/^(\d|[XYZ])\d{7}[A-Z]$/.test(nif)) {
        var num = nif.match(/\d+/);
        num = (nif[0]!='Z'? nif[0]!='Y'? 0: 1: 2)+num;
        if(nif[8]=='TRWAGMYFPDXBNJZSQVHLCKE'[num%23]) {
            return /^\d/.test(nif)? 'DNI': 'NIE';
        }
    }
    else if(/^[ABCDEFGHJKLMNPQRSUVW]\d{7}[\dA-J]$/.test(nif)) {
        for(var sum=0,i=1;i<8;++i) {
            var num = nif[i]<<i%2;
            var uni = num%10;
            sum += (num-uni)/10+uni;
        }
        var c = (10-sum%10)%10;
        if(nif[8]==c || nif[8]=='JABCDEFGHI'[c]) {
            return /^[KLM]/.test(nif)? 'ESP': 'CIF';
        }
    }
    return false;
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

  let name = sanitarize($("#validationCompname").val());
  let phone = $("#InputPhone").val();
  let email = $("#validationInputEmail").val();
  let docType = $("#SelectDocType").val().toLowerCase(); // CIF-NIF
  let docNumber = sanitarize($("#docNumber").val());// String
  let zip = sanitarize($("#validationZip").val());
  let street = sanitarize($("#validationStreet").val());
  let city = sanitarize($("#validationCity").val());
  let country = sanitarize($("#validationCountry").val());
  let website = $("#validationWebsite").val();
  let logo = document.querySelector("input[type=file]").files[0];;
  let bio = sanitarize($("#validationBio").val());
  let jobOffers = []; // Objeto?
  let employes = $("#validationemployees").val(); // Numbers

  let socialUrls = [];

  $("input[type=url]").each(function() {
    let key = $(this).attr("name");
    let url = $(this).val();
    if (url != "") {
      socialUrls.push({"platform": key, "url": url});
    }
  })

  if (!(checkNIF(docNumber))) {
    $("#docNumber")
      .addClass("border-danger is-invalid").prop('title', 'No valid number.')
      .focus();
      $('[data-toggle="tooltip"]').tooltip('show');
    // $("#passwordHelpBlock")
    //   .removeClass("text-muted")
    //   .addClass("text-danger");
  } else {
    if ($("#docNumber").hasClass("border-danger")) {
      $("#docNumber").removeClass("border-danger is-invalid").prop('title', '');
      // $("#passwordHelpBlock")
      //   .addClass("text-muted")
      //   .removeClass("text-danger");
    }

  registered = new NewCompany(
    name,
    phone,
    email,
    docType,
    docNumber,
    zip,
    street,
    city,
    country,
    website,
    logo,
    bio,
    employes,
    socialUrls,
  )

  /** Render list links about social media inputs fill.
   * @param {array} company is array of plataform and url
   * @returns {array} array with all html to render.
   */
  function renderSocialLinks(company) {
    let arrayLinks = [];
    let urls = company.socialUrls;
    urls.forEach(social => {
        arrayLinks.push(`<a href="${social.url}" title="Go to ${social.url}" id="${social.platform.toLowerCase()}-link" class="icon-link mr-1" target="_blank"><i class="fab fa-${social.platform.toLowerCase()}"></i></a>`);
    })
    return arrayLinks;
  }

  /** Render html modal with data  confirm for send. */
  function renderModalConfirm() {
    console.log("Inserted modal html.");
    let confirmBody = `
    <div class="container-fluid">
      <div class="col mb-1">
        <fieldset class="mx-auto">
          <legend>Company</legend>
          <div id="imgavatar" class="col-6 mb-4"></div>
          <div class="col">
            <p><strong>Name: </strong>${registered.name}</p>
          </div>
        </fieldset>
        <address class="mx-auto">
          <legend>Address data</legend>
          <div class="col">
            <div class="row">
              <div class="col">
                <p><strong>City: </strong>${registered.city}</p>
                <p><strong>Country: </strong>${registered.country}</p>
                <p><strong>Street: </strong>${registered.street}</p>
                <p><strong>Zip: </strong>${registered.zip}</p>
              </div>
            </div>
          </div>            
        </address>
        <fieldset class="mx-auto">
          <legend>Contact data</legend>
          <div class="col">
            <p><strong>Phone: </strong>${registered.phone}</p>
            <p><strong>Email: </strong>${registered.email}</p>
            <p><strong>Social Media: </strong>${registered.socialUrls.length > 0 ? renderSocialLinks(registered).join(' ') : ''}</p>                  
          </div>
        </fieldset>
        <fieldset class="mx-auto">
          <legend>Bio info:</legend>
          <div class="col">
            <p><strong>Employees: </strong>${registered.employes}</p>
            <p><strong>About us: </strong>${registered.bio}</p>
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

  /** Constructor objet to send JSON */
  function createRequestBody() {
    let body = {
    "name": registered.name,
    "phone": registered.phone,
    "email": registered.email,
    "docType": registered.docType,
    "docNumber": registered.docNumber,
    "address": {
      "country": registered.country,
      "street": registered.street,
      "city": registered.city,
      "zipcode": registered.zip,
    },
    "website":registered. website,
    "logo": "",
    "bio": registered.bio,
    "employes": registered.employes,
    "socialUrls": registered.socialUrls,
    }
    return body;
  }

  /** Function to send New Company */
  function sendNewCompany() {
    let BodyCompany = createRequestBody();

    fetch("https://cv-mobile-api.herokuapp.com/api/companies", {
        method: "POST",
        body: JSON.stringify(BodyCompany),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      .then(response => {
        let pong = response;
        let fileForm = new FormData();
        fileForm.append("img", registered.logo);
        let id_company = response._id;
        console.log("ID: ", id_company, ". Pong: ", pong);
        fetch(`https://cv-mobile-api.herokuapp.com/api/files/upload/company/${id_company}`, {
          method: "POST",
          body: fileForm
        })
        .then(response => {console.log(response);
        if (response.status==200) {
          alert('Registered information.');
          document.getElementById("registerCompanySubmit").reset();
          $(".close").trigger('click');
          $("#modal-confirm").empty().html("...");
          $("#preview").attr("src", "");
          window.location.pathname = "../html/landpage-comp.html";
        } else {
          alert(`Error when sending. ${response.statusText}`);
        }
        })
        .catch(error => console.log(error.message));
  })}

  if (inputtrue) {
    renderModalConfirm(); 
    $("#confirm-submit").modal('show');
    $("#CompanyConfirmed").click(function() {
      console.log("Confirmed.")
      sendNewCompany();
    });
  };
}})
