function NewUser(name, lastname, phone, zip, email, username, city, street, state, explab, languages, skills, repository) {
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.zip = zip;
    this.email = email;
    this.username = username;
    this.city = city;
    this.street = street;
    this.state = state;
    this.explab = explab;
    this.languages = languages;
    this.skills = skills;
    this.repository = repository;
}

let registered;

$("#registerSubmit").submit(function(event) {
    console.log("submit send...");
    event.preventDefault();

    let name = $("#validationname").val();
    let lastname = $("#validationlastname").val();
    let phone = $("#InputPhone").val();
    let zip = $("#validationZip").val();
    let email = $("#InputEmail").val();
    let username = $("#validationUsername").val();
    let city = $("#validationCity").val();
    let street = $("#validationStreet").val();
    let state = $("#validationState").val();
    let explab = $("#experience").val();

    let languages = $('#languages input[type="checkbox"]:checked').map(function() {
        return $(this).next("label").text().split(' ').join('%20');
    }).get();

    let skills = $('#skills input[type="checkbox"]:checked').map(function() {
        return $(this).next("label").text().split(' ').join('%20');
    }).get();

    let repository = $("#validationRepository").val();

    console.log(name, lastname, phone, zip, email, username, city, street, state, explab, languages, skills, repository);

    registered = new NewUser(name, lastname, phone, zip, email, username, city, street, state, explab, languages, skills, repository);
    
    return registered;
    });

console.log(NewUser);
