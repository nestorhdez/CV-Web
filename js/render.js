//Request the JSON document
req=new XMLHttpRequest();
req.open("GET",'https://jsonplaceholder.typicode.com/users',true);
req.send();
req.onload=function(){
    //Parse make the data become to an JS object
    var json = JSON.parse(req.responseText);

    // Create the structure of the card with the json data

    json.forEach(function(val) {

        //Create a card
        let card = (`

            <div class="card mr-3 mb-3 card-user" style="width: 18rem;">
                <div class="card-body text-center">
                    <div class="mb-3">
                        <i class="fas fa-user" style="font-size: 2rem;"></i> <br>
                        <h5 class="card-title d-inline user-name">${val.name}</h5>
                    </div>
                    <h6 class="card-subtitle mb-3 text-muted">City: ${val.address.city}</h6>
                    <p class="card-text">
                        Phone: ${val.phone}
                    </p>
                </div>
            </div>
        `);

         //Add the user tu a card
        document.getElementById('card-container').innerHTML += card;

    });

};

//Filter data with the form


let list = document.querySelector('#card-container');

let searchBar = document.querySelector('#adv-search-form');

console.log(list);
console.log(searchBar);

//Make the filter when submit the form
searchBar.addEventListener('submit', function(e){
    //Don't refresh the page when submit
    e.preventDefault();
    
    //Put the value of the input name in lower case into a variable
    let term = document.querySelector('#input-name').value.toLowerCase();
    
    let users = list.getElementsByClassName('card-user');

    console.log(e);
    console.log(users);

    //Create a loop through the cards
    Array.from(users).forEach(function(user){
        
        //Put every user name into a var
        let title = user.querySelector('.user-name').textContent;
            console.log(title);
            
        //If the user has some character equal to the search of the
        //input it will be display block
        if (title.toLowerCase().indexOf(term) != -1){
            user.style.display = 'block';
            } else {
                user.style.display = 'none';
            }
    })
})