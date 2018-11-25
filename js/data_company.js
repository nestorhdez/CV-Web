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


$("#registerCompanySubmit").submit(function(e) {
  console.log("sumit actived.");
  e.preventDefault();
  
  // Need check CIF-NIF

  let name = $("#validationCompname").val();
  let phone = $("#InputPhone").val();
  let email = $("#validationInputEmail").val();
  let docType = $("#SelectDocType").val(); // CIF-NIF
  let docNumber = $("#docNumber").val();// String
  let zip = $("#validationZip").val();
  let street = $("#validationStreet").val();
  let city = $("#validationCity").val();
  let country = $("#validationCountry").val();
  let website = $("#validationWebsite").val();
  let logo = document.querySelector("input[type=file]").files[0];;
  let bio = $("#validationBio").val();
  let jobOffers = []; // Objeto?
  let employes = $("#validationemployees").val(); // Numbers

  let socialUrls = [];
  $("input[type=url]").each(function() {
    let key = $(this).attr("name");
    let url = $(this).val();
    socialUrls.push({plataform: key, url: url});
  })
  console.log("SM", socialUrls);
  // let socialUrls = []

  

  console.log(
    name,
    phone,
    email,
    docType,
    docNumber,
    zip,
    street,
    city,
    country,
    "web: ", website,
    logo,
    "bio", bio,
    jobOffers,
    employes,
    socialUrls,
  );

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

})
