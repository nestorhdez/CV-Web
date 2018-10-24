
//Object List of Users
function ListUsers() {

    this.url = "https://jsonplaceholder.typicode.com/usersgi";

    //Call the ajax and get the list of users
    this.getAllUsers = function ( url, callback, val ) {

        $.ajax ({
            url: url,
            dataType: "json"
        }).done( function(data) {

            //this control do optional the callback
            if(typeof callback == "function" ){
                callback( data, val );
                console.log("Callback parameter is a function");
            }else{
                console.log("Callback parameter isn't a function");
            }

        });

    };

    this.renderUsers = function ( arr ) {
        console.log(arr);
        
        //Create a card for each user
        arr.forEach(function(val) {
            
            let card = (`

                <div class="card mr-3 mb-3 card-user shadow list-group-item-action" style="width: 18rem;">
                    <div class="card-body text-center">
                        <div class="d-flex flex-column justify-content-center mb-3">
                            <div class="d-flex mx-auto profile-picture mb-1">
                                <img class="img-user rounded-circle" src="../img/default-profile-picture.jpg">
                            </div>
                            <h5 class="card-title d-inline user-name">${val.name}</h5>
                        </div>
                        <div class="text-left">
                            <h6 class="card-subtitle mb-3 text-center">Contact information</h6>
                            <p class="m-0 city-user"><b>City: </b>${val.address.city}</p>
                            <p class="m-0"><b>Email: </b><a href="mailto:${val.email}">${val.email}</a></p>
                            <p><b>Phone: </b>${val.phone}</p>

                            <div class="d-flex justify-content-between align-items-end">
                                <button type="button" class="btn btn-info btn-sm">Edit</button>
                                <button type="button" class="btn btn-modal btn-info btn-sm" id="${val.id}" data-toggle="modal" data-target="#ModalCenter">Detail</button>
                                <button type="button" class="btn btn-primary btn-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
        `);

        document.getElementById('card-container').innerHTML += card;

        });
        
        document.getElementById('card-container').innerHTML += "<div id='loader'><div>";
        this.renderModal(arr);
        
    }.bind(this);

    //Change the data of the modal when click on a user card
    //It's indise of renderUsers because it only has to work with the cards that are already rendered.
    this.renderModal = function(arr) {
        $('.btn-modal').click(function(e){
            console.log('click done');
            console.log(arr[e.target.id - 1]);
            console.log('User id ' + e.target.id);
            let user = arr[e.target.id - 1];
            $('#ModalCenterTitle').empty().html(user.name);

            $('#city').empty().html(user.address.city);

            $('#street').empty().html(user.address.street);
            
            $('#zipcode').empty().html(user.address.zipcode);

            $('#email').empty().html(user.email);

            $('#phone').empty().html(user.phone);
            
            $('#website').empty().html(user.website);

            $('#company').empty().html(user.company.name);

        })
    }

    //The callback parameter has to be passed on the getAllUsers function
    this.filterName = function ( arr, callback ){

        let nameInput = document.querySelector("#input-name").value.toLowerCase();

        let filterName = arr.filter(user => user.name.toLowerCase().indexOf(nameInput) != -1);
        console.log(filterName);
        
        if(filterName.length > 0 ){
            $( "#card-container" ).empty();
            this.renderUsers( filterName );
        }else{
            $( "#card-container" ).empty().html("<h1>There are not any coincidence</h1>");
        }
        
    }.bind(this);

}

//Calling the FilterUsers and createCards functions on form submit
let list = new ListUsers;

$( "#adv-search-form" ).on( "submit", function(e) {
    //Don't refresh the page when submit
    e.preventDefault();

    list.getAllUsers(list.url, list.filterName);
})