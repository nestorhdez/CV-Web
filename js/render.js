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
            
            let card = (`

                <div class="card mr-3 mb-3 card-user shadow list-group-item-action" style="width: 18rem;">
                    <div class="card-body text-center">
                        <div class="d-flex flex-column justify-content-center mb-3">
                            <div class="d-flex mx-auto profile-picture mb-1">
                                <img class="img-user rounded-circle" src="${val.profilePicture}">
                            </div>
                            <h5 class="card-title d-inline user-name">${val.name}</h5>
                        </div>
                        <div class="text-left">
                            <h6 class="card-subtitle mb-3 text-center">Contact information</h6>
                            <p class="m-0 city-user"><b>City: </b>${val.location.city}</p>
                            <p class="m-0"><b>Email: </b><a href="mailto:${val.email}">${val.email}</a></p>
                            <p><b>Website: </b>${val.website}</p>

                            <div class="d-flex justify-content-between align-items-end">
                                <button type="button" class="btn btn-info btn-sm">Edit</button>
                                <button type="button" class="btn btn-modal btn-info btn-sm" id="${val._id}" data-toggle="modal" data-target="#ModalCenter">Detail</button>
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


    this.filterUsers = function ( currentPage ){

        new Promise((resolve, reject) => {
            //Passing the resolve as a callback.
            this.getAllUsers( resolve );

        }).then((allUsers) => {

            console.log(allUsers);
            // Inputs
            let nameInput = document.querySelector("#input-name").value.toLowerCase();
            let surnameInput = document.querySelector("#validationlastname").value.toLowerCase();
            let cityInput = document.querySelector("#city-option").value.toLowerCase();
            let countryInput = document.querySelector("#validationCountry").value.toLowerCase();
            let stateInput = document.querySelector("#validationState").value.toLowerCase();
            let experienceSelect = document.querySelector("#experience").value.toLowerCase();
            //CheckBoxes
            let languages = document.querySelectorAll('#languages .form-check-input');
            let checkedLanguages = [...languages].filter(lang => lang.checked == true ).map(lang => lang.defaultValue.toLowerCase());
            let skills = document.querySelectorAll('#skills .form-check-input');
            let checkedSkills = [...skills].filter(skill => skill.checked == true).map(skill => skill.defaultValue.toLowerCase());
      
            let allFilters = [];
            //Filters
            if(nameInput !== '') {
                var filterByName = allUsers.filter(user => user.name.split(' ')[0].toLowerCase().indexOf(nameInput) != -1);
            }
            if(surnameInput !== '') {
                var filterBySurname = allUsers.filter(user => user.name.split(' ')[1].toLowerCase().indexOf(surnameInput) != -1);
            }
            if(cityInput !== '') {
                var filterByCity = allUsers.filter(user => user.location.city.toLowerCase().indexOf(cityInput) != -1);
            }
            if(countryInput !== '') {
                var filterByCountry = allUsers.filter(user =>  user.location.country.toLowerCase() === countryInput);
            }
            if(stateInput !== '') {
                var filterByState = allUsers.filter(user =>  user.location.state.toLowerCase() === stateInput);
            }
            if(experienceSelect !== '') {
                var filterByExperience = allUsers.filter(user => user.experience.toLowerCase() === experienceSelect);
            }
            if(checkedLanguages.length > 0) {
                
                var filterByLanguages = allUsers.filter(user => {

                    let langControl = [];

                    checkedLanguages.forEach( lang => {
                        langControl.push(user.languages.includes(lang));
                    })
    
                    if(langControl.includes(false)){
                        return false;
                    } else {
                        return true;
                    }
                    
                });

            }
            if(checkedSkills.length > 0) {
                
                var filterBySkills = allUsers.filter(user => {

                    let skillsControl = [];

                    checkedSkills.forEach( skill => {
                        skillsControl.push(user.skills.includes(skill));
                    })
    
                    if(skillsControl.includes(false)){
                        return false;
                    } else {
                        return true;
                    }
                    
                });

            }
            
            // let listFilteredUser = new Set(allFilters);

            console.log( allFilters );  

            if( listFilteredUser.length === 0 ){
                $( "#card-container" ).empty();
                document.getElementById('card-container').innerHTML += `<h1> There are not any coincidence </h1>`;
            }else if( listFilteredUser.length < 10 ) {
                $( "#card-container" ).empty();
                this.renderUsers( this.pagination(listFilteredUser, 10, 1) );
                console.log("less than 10 users");
            }else { undefined
                this.renderUsers( this.pagination(listFilteredUser, 10, currentPage) );
                console.log(this.pagination(listFilteredUser, 10, currentPage));
                console.log('Current page: ' + currentPage);
            }
        });
        
    }.bind(this);//Bind ListUsers object

}

let list = new ListUsers;
let scroll = new Scrollinfinite(list.filterUsers).initScroll();

//Calling the FilterUsers functions and render users on form's submit
$( "#adv-search-form" ).on( "submit", function(e) {
    //Don't refresh the page when submit
    e.preventDefault();
    //The argument passed is the nº of the page that you want to print.
    list.filterUsers(1);
});