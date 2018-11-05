//Object List of Users
function ListUsers() {

    this.url = "https://cv-mobile-api.herokuapp.com/api/users";

    //Call the ajax and get the list of users
    this.getAllUsers = function ( callback ) {

         $.ajax ({   
            url: this.url,
            dataType: "json"
        }).done( function(data) {
            
            if(typeof callback == "function" ){
                callback( data );
                console.log("Callback parameter is a function");
            }else{
                console.log("Callback parameter isn't a function");
            }

            return data;
        });
    };
    

    this.renderUsers = function ( arr ) {
        // console.log(arr);
        
        //Create a card for each user
        arr.forEach(function(val) {
            
        //     let card = (`

        //         <div class="card mr-3 mb-3 card-user shadow list-group-item-action" style="width: 18rem;">
        //             <div class="card-body text-center">
        //                 <div class="d-flex flex-column justify-content-center mb-3">
        //                     <div class="d-flex mx-auto profile-picture mb-1">
        //                         <img class="img-user rounded-circle" src="${val.profilePicture}">
        //                     </div>
        //                     <h5 class="card-title d-inline user-name">${val.name}</h5>
        //                 </div>
        //                 <div class="d-flex flex-column flex-nowrap text-left my-2">
        //                     <h6 class="card-subtitle mb-3 text-center">Contact information</h6>
        //                     <p class="m-0 city-user"><b>City: </b>${val.location.city}</p>
        //                     <p class="m-0"><b>Email: </b><a href="mailto:${val.email}">${val.email}</a></p>
        //                     <p><b>Website: </b>${val.website}</p>

        //                     <div class="d-flex justify-content-between align-items-end">
        //                         <button type="button" class="btn btn-info btn-sm">Edit</button>
        //                         <button type="button" class="btn btn-modal btn-info btn-sm" id="${val._id}" data-toggle="modal" data-target="#ModalCenter">Detail</button>
        //                         <button type="button" class="btn btn-primary btn-sm">Delete</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        // `);

            let card = (`
            <div class="card mx-1 my-1 card-user shadow list-group-item-action" style="width: 18rem;">
                <div class="card-body text-center">
                <div class="row mb-4gi">        
                    <div class="d-flex justify-content-between align-self-end mt-3 mx-auto">
                        <button type="button" class="btn btn-info btn-sm mx-1">Edit</button>
                        <button type="button" class="btn btn-info btn-sm mx-1" id="fulldata" data-toggle="modal"
                            data-target="#ModalCenter">Detail</button>
                        <button type="button" class="btn btn-cobalt btn-sm mx-1">Delete</button>
                    </div>
                </div>
                    <div class="row">
                        <div class="d-flex flex-column mx-auto justify-content-center mb-3">
                            <div class="d-flex mx-auto profile-picture mb-1">
                                <img class="img-user rounded-circle" src="${val.profilePicture}">
                            </div>
                            <h5 class="card-title d-inline user-name">${val.name}</h5>
                        </div>
                    </div>   
                    <div class="row px-3">    
                        <div class="d-flex flex-column flex-nowrap text-left my-2">
                            <h6 class="card-subtitle mb-3 text-center">Contact information</h6>
                            <p class="m-0"><strong>City: </strong>${val.location.city}</p>
                            <p class="m-0"><strong>Country: </strong>${val.location.country}</p>
                            <p class="m-0"><strong>State: </strong>${val.location.state}</p>
                            <p class="m-0 font-italic"><strong>Skills: </strong>${val.skills.join(', ')}</p>
                            <p class="m-0"><strong>Email: </strong><a href="mailto:${val.email}">${val.email}</a></p>
                        </div>
                    </div>    
                </div>
            </div>
            `)

        document.getElementById('card-container').innerHTML += card;

        });
        
        document.getElementById('card-container').innerHTML += "<div id='loader'><div>";
        this.renderModal(arr);
        
    }.bind(this);//Bind to ListUsers object.

    /*Change the data of the modal when click on a user card.
    It's indise of renderUsers because it only has to work with the cards that are already rendered.*/
    this.renderModal = function(arr) {
        $('.btn-modal').click(function(e){
            // console.log('click done');
            // console.log('User id ' + e.target.id);
            arr.forEach( function(val){
                if(val._id == e.target.id){
                    let user = val;

                    $('#ModalCenterTitle').empty().html(user.name);

                    $('#city').empty().html(user.location.city);

                    $('#street').empty().html(user.location.street);
                    
                    $('#zipcode').empty().html(user.location.zipcode);

                    $('#email').empty().html(user.email);

                    $('#phone').empty().html(user.phone);
                    
                    $('#website').empty().html(user.website);

                    $('#company').empty().html(user.company.name);
                }
            });

        })
    }

    /* Return an array that represent a page of the inital array.
    As argument you should pass it the initial array, how many
    elementes do you need per page and the page nº that you need.*/
    this.pagination = function (arr, perpage, page) {     
        return arr.slice(perpage*(page-1), perpage*page);
    }


    this.filterName = function ( currentPage ){

        new Promise((resolve, reject) => {
            //Passing the resolve as a callback.
            this.getAllUsers( resolve );

        }).then((allUsers) => {

            console.log(allUsers);

            let nameInput = document.querySelector("#input-name").value.toLowerCase();
            
            let filterByName = allUsers.filter(user => user.name.toLowerCase().indexOf(nameInput) != -1);

            console.log( filterByName );  

            if(filterByName.length < 10 ) {
                $( "#card-container" ).empty();
                this.renderUsers( this.pagination(filterByName, 10, 1) );
                console.log("less than 10 users");
            }else {
                
                this.renderUsers( this.pagination(filterByName, 10, currentPage) );
                console.log(this.pagination(filterByName, 10, currentPage));
                console.log('Current page: ' + currentPage);
            }
        });
        
    }.bind(this);//Bind ListUsers object

}

let list = new ListUsers;
let scroll = new Scrollinfinite(list.filterName).initScroll();

//Calling the FilterUsers functions and render users on form's submit
$( "#adv-search-form" ).on( "submit", function(e) {
    //Don't refresh the page when submit
    e.preventDefault();
    //The argument passed is the nº of the page that you want to print.
    list.filterName(1);
});