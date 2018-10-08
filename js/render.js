//Variable to storage the data of the json
//To use it is needed set a timeout because the asynchronous of the ajax
let jsonData;

function getJsonUsers(){

    $.ajax ({
        url: "https://jsonplaceholder.typicode.com/users",
        dataType: "json",
        data: JSON.stringify,
        contentType: 'application/json'
    }).done( function(data) {
        jsonData = data;
        console.log(data);
    });

};

function createCard() {

    jsonData.forEach(function(val) {
        let card = (`

            <div class="card mr-3 mb-3 card-user" style="width: 18rem;">
                <div class="card-body text-center">
                <div class="d-flex flex-column justify-content-center mb-3">
                <div class="d-flex mx-auto profile-picture mb-1"><a href="#" class="d-flex profile-picture" id="${val.id}"
                        data-toggle="modal" data-target="#ModalCenter"><img class="img-user rounded-circle" src="../img/default-profile-picture.jpg"></a>
                </div>
                        <h5 class="card-title d-inline user-name">${val.name}</h5>
                    </div>
                    <div class="text-left">
                        <h6 class="card-subtitle mb-3">Contact information</h6>
            
                        <p class="m-0 city-user"><b>City: </b>${val.address.city}</p>
                        <p class="m-0"><b>Email: </b><a href="mailto:${val.email}">${val.email}</a></p>
                        <p><b>Phone: </b>${val.phone}</p>

                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Card link</a>
                        
                    </div>
                </div>
            </div>
        `);

        document.getElementById('card-container').innerHTML += card;
    });
};

//Execute the function of the call to the json data
getJsonUsers();

//Create cards
setTimeout( function() { createCard(); }, 1000 );


//Filter users with the form

let list = document.querySelector("#card-container");

$( "#adv-search-form" ).on( "submit", function(e) {
    //Don't refresh the page when submit
    e.preventDefault();

    let nameInput = document.querySelector("#input-name").value.toLowerCase();
    let cityInput = document.querySelector("#city-option").value.toLowerCase();

    let users = list.querySelectorAll(".card-user");

    users.forEach(function( user ) {
        let userName = user.querySelector(".user-name").textContent;
        let userCity = user.querySelector(".city-user").textContent;

        //If the user has some character equal to the search of the
        //input it will be display block
        if (userName.toLowerCase().indexOf(nameInput) != -1 && userCity.toLowerCase().indexOf(cityInput) != -1) {
            user.style.display = "block";
        } else {
            user.style.display = "none";
        };
    });
});