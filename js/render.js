//Object List of Users
function ListUsers(summaryContainer) {
    this.summaryContainer = summaryContainer;
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
                <div class="card mx-1 my-1 card-user shadow list-group-item-action" style="width: 18rem;">
                    <div class="card-body text-center">
                    <div class="row mb-4">        
                        <div class="d-flex justify-content-between align-self-end mt-3 mx-auto">
                            <button type="button" class="btn btn-info btn-sm mx-1">Edit</button>
                            <button type="button" class="btn btn-info btn-modal btn-sm mx-1" id="${val._id}" data-toggle="modal"
                                data-target="#ModalCenter">Detail</button>
                            <button type="button" class="btn btn-cobalt btn-sm mx-1">Delete</button>
                        </div>
                    </div>
                        <div class="row">
                            <div class="d-flex flex-column mx-auto justify-content-center mb-3">
                                <div class="d-flex mx-auto profile-picture mb-1">
                                    <img class="img-user rounded-circle" src="${val.profilePicture}">
                                </div>
                                <h5 class="card-title d-inline user-name text-capitalize">${val.name}</h5>
                            </div>
                        </div>   
                        <div class="row px-3">    
                            <div class="d-flex flex-column flex-nowrap text-left my-2">
                                <h6 class="card-subtitle mb-3 text-center">Contact information</h6>
                                <p class="m-0 text-capitalize"><strong>City: </strong>${val.location.city}</p>
                                <p class="m-0 text-capitalize"><strong>Country: </strong>${val.location.country}</p>
                                <p class="m-0 text-capitalize"><strong>State: </strong>${val.location.state}</p>
                                <p class="m-0 font-italic text-capitalize"><strong>Skills: </strong>${val.skills.join(', ')}</p>
                                <p class="m-0"><strong>Email: </strong><a href="mailto:${val.email}">${val.email}</a></p>
                            </div>
                        </div>    
                    </div>
                </div>
                `)

        document.getElementById('card-container').innerHTML += card;

        });
        
        document.getElementById('card-container').innerHTML += "<div id='loader'><div>";
        
    }.bind(this);//Bind to ListUsers object.

    /*Change the data of the modal when click on a user card.*/
    this.renderModal = function(arr) {
        $('.btn-modal').click(function(e){
            console.log('click done');
            console.log('User id ' + e.target.id);
            arr.forEach( function(val){
                // console.log("val_id: ", val._id);
                // console.log("e.id: ", e.target.id);
                if(val._id == e.target.id){
                    let user = val;

                    $('#profilePicture').attr("src", "../img/default-profile-picture.jpg").attr("src", user.profilePicture);
                    
                    $('#ModalCenterTitle').empty().html(user.name);

                    $('#city').empty().html(user.location.city);

                    $('#country').empty().html(user.location.country);
                    
                    $('#state').empty().html(user.location.state);

                    $('#language').empty().html(user.languages.join(', '));

                    $('#email').empty().html(user.email);

                    $('#jobTitle').empty().html(user.jobTitle);
                    
                    $('#website').empty().html(user.website);

                    $('#company').empty().html(user.company);

                    $('#skills-modal').empty().html(user.skills.join(', '));
                    console.log("skills? ", user.skills.join(', '));
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
 
    function renderSummaryUsers(allFilters, summaryContainer) {
        $(summaryContainer).html("<br><span class=' badge bg-badge-summ text-badge-summ text-white ml-3'>The search result is: " + allFilters.length + "</span>");
    };
    
    this.filterUsers = function ( currentPage ){

        new Promise((resolve, reject) => {
            //Passing the resolve as a callback.
            this.getAllUsers( resolve );

        }).then((allUsers) => {

            console.log(allUsers);
            // Inputs
            let nameInput = document.querySelector("#input-name").value.toLowerCase();
            let usernameInput = document.querySelector("#validationusername").value.toLowerCase();
            let emailInput = document.querySelector("#validationemail").value.toLowerCase();
            let genderSelect = document.querySelector("#gender").value.toLowerCase();
            let cityInput = document.querySelector("#city-option").value.toLowerCase();
            let countryInput = document.querySelector("#validationCountry").value.toLowerCase();
            let stateInput = document.querySelector("#validationState").value.toLowerCase();
            let companyInput = document.querySelector("#validationcompany").value.toLowerCase();
            let jobTitleInput = document.querySelector("#validationjob").value.toLowerCase();
            let experienceSelect = document.querySelector("#experience").value.toLowerCase();
            //CheckBoxes
            let languages = document.querySelectorAll('#languages .form-check-input');
            let checkedLanguages = [...languages].filter(lang => lang.checked == true ).map(lang => lang.defaultValue.toLowerCase());
            let skills = document.querySelectorAll('#skills .form-check-input');
            let checkedSkills = [...skills].filter(skill => skill.checked == true).map(skill => skill.defaultValue.toLowerCase());

            function removeFilteredUser(user){
                if(allFilters.includes(user)){
                    let i = allFilters.indexOf(user);
                    allFilters.splice(i, 1);
                }
            }

            let allFilters = allUsers;
            //Filters
            if(nameInput !== '') {
                var filterByName = allUsers.filter(user => user.name.toLowerCase().indexOf(nameInput) == -1);
                filterByName.forEach(removeFilteredUser);
            }
            if(usernameInput !== '') {
                var filterByusername = allUsers.filter(user => user.username.toLowerCase().indexOf(usernameInput) == -1);
                filterByusername.forEach(removeFilteredUser)
            }
            if(emailInput !== '') {
                var filterByEmail = allUsers.filter(user => user.email.toLowerCase().indexOf(emailInput) == -1);
                filterByEmail.forEach(removeFilteredUser)
            }
            if(genderSelect !== '') {
                var filterByGender = allUsers.filter(user => user.gender !== genderSelect);
                filterByGender.forEach(removeFilteredUser);
            }
            if(cityInput !== '') {
                var filterByCity = allUsers.filter(user => user.location.city.toLowerCase().indexOf(cityInput) == -1);
                filterByCity.forEach(removeFilteredUser);
            }
            if(countryInput !== '') {
                var filterByCountry = allUsers.filter(user =>  user.location.country.toLowerCase() !== countryInput);
                filterByCountry.forEach(removeFilteredUser);
            }
            if(stateInput !== '') {
                var filterByState = allUsers.filter(user =>  user.location.state.toLowerCase() !== stateInput);
                filterByState.forEach(removeFilteredUser);
            }
            if(companyInput !== '') {
                var filterByCompany = allUsers.filter(user => user.company.toLowerCase().indexOf(companyInput) == -1);
                filterByCompany.forEach(removeFilteredUser);
            }
            if(jobTitleInput !== '') {
                var filterByJobTitle = allUsers.filter(user => user.jobTitle.toLowerCase().indexOf(jobTitleInput) == -1);
                filterByJobTitle.forEach(removeFilteredUser);
            }
            if(experienceSelect !== '') {
                var filterByExperience = allUsers.filter(user => user.experience.toLowerCase() !== experienceSelect);
                filterByExperience.forEach(removeFilteredUser);
            }
            if(checkedLanguages.length > 0) {
                
                var filterByLanguages = allUsers.filter(user => {

                    let langControl = [];

                    checkedLanguages.forEach( lang => {
                        langControl.push(user.languages.includes(lang));
                    })
    
                    if(langControl.includes(false)){
                        return true;
                    } else {
                        return false;
                    }
                    
                });

                filterByLanguages.forEach(removeFilteredUser);
            }
            if(checkedSkills.length > 0) {
                
                var filterBySkills = allUsers.filter(user => {

                    let skillsControl = [];

                    checkedSkills.forEach( skill => {
                        skillsControl.push(user.skills.includes(skill));
                    })
    
                    if(skillsControl.includes(false)){
                        return true;
                    } else {
                        return false;
                    }
                    
                });
                filterBySkills.forEach(removeFilteredUser);
            }
            
            // console.log( allFilters );
            // console.log( allFilters[0].gender );
            // console.log(this);
            renderSummaryUsers(allFilters , this.summaryContainer);

            if( allFilters.length === 0 ){
                $( "#card-container" ).empty();
                document.getElementById('card-container').innerHTML += `<h1 id="title-fail-search"> There are not any coincidence </h1>`;
            }else if( allFilters.length < 10 ) {
                $( "#card-container" ).empty();
                this.renderUsers( this.pagination(allFilters, 10, 1) );
                console.log("less than 10 users");
            }else {
                let titleFailSearch = document.querySelector('#title-fail-search');
                titleFailSearch ? titleFailSearch.remove() : null;
                this.renderUsers( this.pagination(allFilters, 10, currentPage) );
                console.log(this.pagination(allFilters, 10, currentPage));
                console.log('Current page: ' + currentPage);
            }

            this.renderModal(allUsers);

        });
        
    }.bind(this);//Bind ListUsers object

}

let list = new ListUsers( "#searchSummaryContainer" );
let scroll = new Scrollinfinite(list.filterUsers).initScroll();

//Calling the FilterUsers functions and render users on form's submit
$( "#adv-search-form" ).on( "submit", function(e) {
    //Don't refresh the page when submit
    e.preventDefault();
    //The argument passed is the nº of the page that you want to print.
    list.filterUsers(1);
});
