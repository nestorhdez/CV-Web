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

            <div class="card mr-3 mb-3" style="width: 18rem;">
                <div class="card-body text-center">
                    <div class="mb-3">
                        <i class="fas fa-user" style="font-size: 2rem;"></i> <br>
                        <h5 class="card-title d-inline">${val.name}</h5>
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