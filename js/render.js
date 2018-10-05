
function getJsonUsers(){

    $.ajax ({
        url: "https://jsonplaceholder.typicode.com/users",
        dataType: "json"
    }).done( function(data){
        data.forEach(function(val) {
            let card = (`

                <div class="card mr-3 mb-3 card-user" style="width: 18rem;">
                    <div class="card-body text-center">
                        <div class="mb-3">
                            <i class="fas fa-user mb-3" style="font-size: 2rem;"></i> <br>
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
        })
    })
};

getJsonUsers();

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