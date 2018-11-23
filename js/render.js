class Users extends Model{

    constructor( url ) {
        super(url);
        this.apiSkills = new FeaturesModel( 'https://cv-mobile-api.herokuapp.com/api/skills' );
        this.apiLangs = new FeaturesModel( 'https://cv-mobile-api.herokuapp.com/api/langs' );
        this.renderModal = this.renderModal.bind(this);
    }

    /* Return an array that represent a page of the inital array.
    As argument you should pass it the initial array, how many
    elementes do you need per page and the page nº that you need.*/
    pagination (arr, perpage, page) {     
        return arr.slice(perpage*(page-1), perpage*page);
    }

    createHtmlUserCard(user, skills, langs) {

        let card = (`
            <div class="card mx-1 my-1 card-user shadow list-group-item-action" id="card_${user._id}" style="width: 18rem;">
                <div class="card-body text-center">
                <div class="row mb-4">        
                    <div class="d-flex justify-content-between align-self-end mt-3 mx-auto">
                        <button type="button" class="btn-edit btn btn-info btn-sm mx-1" id="" data-toggle="modal"
                        data-target="#ModalCenter">Edit</button>
                        <button type="button" class="btn btn-info btn-modal btn-sm mx-1" id="${user._id}" data-toggle="modal"
                            data-target="#ModalCenter">Detail</button>
                        <button type="button" class="btn btn-cobalt btn-sm mx-1">Delete</button>
                    </div>
                </div>
                    <div class="row">
                        <div class="d-flex flex-column mx-auto justify-content-center mb-3">
                            <div class="d-flex mx-auto profile-picture mb-1">
                                <img class="img-user rounded-circle" src="${user.avatar}">
                            </div>
                            <h5 class="card-title d-inline user-name text-capitalize">${user.name}</h5>
                        </div>
                    </div>   
                    <div class="row px-3">    
                        <div class="d-flex flex-column flex-nowrap text-left my-2">
                            <h6 class="card-subtitle mb-3 text-center">Contact information</h6>
                            ${user.address.city ? '<span class="m-0 text-capitalize"><strong>City: </strong>' + user.address.city + '</span>' : ''}
                            ${user.address.country ? '<span class="m-0 text-capitalize"><strong>Country: </strong>' + user.address.country + '</span>' : ''}
                            ${user.address.state ? '<span class="m-0 text-capitalize"><strong>State: </strong>' + user.address.state + '</span>' : ''}
                            ${skills.length > 0 ? '<span class="m-0 font-italic text-capitalize"><strong>Skills: </strong>' + skills.join(', ') + '</span>' : ''}
                            ${langs.length > 0 ? '<span class="m-0 font-italic text-capitalize"><strong>Languages: </strong>' + langs.join(', ') + '</span>' : ''}
                            <p class="m-0"><strong>Email: </strong><a href="mailto:${user.email}">${user.email}</a></p>
                        </div>
                    </div>    
                </div>
            </div>
            `)
            
        return card;
    }

    renderUsers(arrayUsers, skills, langs) {

        let feature = new FeaturesModel;

        arrayUsers.forEach((user) => {
            let skillsLabels = feature.returnUserPropertyLabels(user.skills, skills);
            let langsLabels = feature.returnUserPropertyLabels(user.languages, langs);
            document.getElementById('card-container').innerHTML += this.createHtmlUserCard(user, skillsLabels, langsLabels);
        });

        document.getElementById('card-container').innerHTML += "<div id='loader'><div>";                
    }

    createHtmlUserModal(user, skills, langs) {

        let bodyModal = (`
            <h4 class="modal-subtitle card-subtitle text-center mb-3">Detail information</h4>
            <span class="d-block d-flex mt-2 card-text text-capitalize"><strong>Username: </strong><span class="pl-1" id="username-modal">${user.username}</span></span>
            <span class="d-block mt-2 card-text"><strong>Email: </strong><a class="pl-1" href="mailto:${user.email}" id="email-modal">${user.email}</a></span>
            <span class="d-block d-flex mt-2 card-text text-capitalize"><strong>Country: </strong><span class="pl-1" id="country-modal">${user.address.country}</span></span>
            ${user.address.city ? '<span class="d-block d-flex mt-2 card-text text-capitalize"><strong>City: </strong><span class="pl-1" id="city-modal">' + user.address.city + '</span></span>' : '' }
            ${user.address.street ? '<span class="d-block d-flex mt-2 card-text text-capitalize"><strong>Street: </strong><span class="pl-1" id="street-modal">' + user.address.street + '</span></span>' : ''}
            <span class="d-block d-flex mt-2 card-text"><strong>Experience: </strong><span class="pl-1" id="experience-modal"> ${user.experience ? user.experience : 'Has no experience'}</span></span>
            ${user.company ? '<span class="d-block d-flex mt-2 card-text text-capitalize"><strong>Company: </strong><span class="pl-1" id="company-modal">' + user.company + '</span></span>' : ''}
            ${user.jobTitle ? '<span class="d-block d-flex mt-2 card-text text-capitalize"><strong>Job Title: </strong><span class="pl-1" id="jobtitle-modal">' + user.jobTitle + '</span></span>' : ''}
            ${user.website ? '<span class="d-block d-flex mt-2 card-text"><strong>Website: </strong><a class="pl-1" target="blank" href="' + user.website + '" id="website-modal">' + user.website + '</a></span>' : ''}
            ${skills.length > 0 ? '<span class="d-block d-flex mt-2 card-text text-capitalize"><strong>Skills: </strong><span class="pl-1" id="skills-modal">' + skills.join(', ') + '</span></span>' : ''}
            ${langs.length > 0 ? '<span class="d-block d-flex mt-2 card-text text-capitalize"><strong>Language: </strong><span class="pl-1" id="language-modal">' + langs.join(', ') + '</span></span>' : ''}
        `);

        return bodyModal;
    }

    setListenerModal(element, arr, skills, langs, callback){ 
        var self = this;    
        $(element).click((e) =>{
            callback(e, arr, skills, langs);
        });
    }

    /*Change the data of the modal when click on a user card.*/
    renderModal(e, arr, skills, langs) {

        let feature = new FeaturesModel;

        arr.forEach( (user) => {

            
            if(user._id == e.target.id){
                let skillsLabel = feature.returnUserPropertyLabels(user.skills, skills);
                let langsLabel = feature.returnUserPropertyLabels(user.languages, langs);
    
                $('#profilePicture').attr("src", `${user.avatar}`);
                    
                $('#ModalCenterTitle').empty().html(user.name);
                    
                $('.modal-user-body').empty().html(this.createHtmlUserModal(user, skillsLabel, langsLabel));
                
            }
        });
        

    }
    
    createFormEditUser(user) {
        
        let bodyModal = (`
            <h4 class="modal-subtitle card-subtitle text-center mb-3">Edit information</h4>
            <form id="form-edit-user">
                <label class="d-block d-flex mt-3 card-text"><strong>Email </strong><input value="${user.email}" required type="email" class="pl-1 ml-auto" id="email-edit"></label>
                <label class="d-block d-flex mt-3 card-text"><strong>Username </strong><input value="${user.username}" required type="text" class="pl-1 ml-auto" id="username-edit"></label>
                <label class="d-block d-flex d-flex mt-3 card-text text-capitalize"><strong>Country </strong><input value="${user.address.country}" required type="text" class="pl-1 ml-auto" id="country-edit"></label>
                <label class="d-block d-flex d-flex mt-3 card-text text-capitalize"><strong>City </strong><input value="${user.address.city ? user.address.city : ''}" type="text" class="pl-1 ml-auto" id="city-edit"></label>
                <label class="d-block d-flex d-flex mt-3 card-text text-capitalize"><strong>Street </strong><input value="${user.address.street ? user.address.street : ''}" type="text" class="pl-1 ml-auto" id="street-edit"></label>
                <label class="d-block d-flex d-flex mt-3 card-text text-capitalize"><strong>Company </strong><input value="${user.company ? user.company : ''}" type="text" class="pl-1 ml-auto" id="company-edit"></label>
                <label class="d-block d-flex d-flex mt-3 card-text text-capitalize"><strong>Job Title </strong><input value="${user.jobTitle ? user.jobTitle : ''}" type="text" class="pl-1 ml-auto" id="jobtitle-edit"></label>
                <label class="d-block d-flex d-flex mt-3 card-text"><strong>Website </strong><input value="${user.website ? user.website : ''}" type="url" class="pl-1 ml-auto" id="website-edit"></label>
                <span class="d-block d-flex d-flex mt-3 card-text text-capitalize"><strong>Skills </strong></span><div class="d-flex flex-wrap" id="skills-edit">${this.apiSkills.renderCheckBoxesArr('#skills-edit', 'editUser')}</div>
                <span class="d-block d-flex d-flex mt-3 card-text text-capitalize"><strong>Languages </strong></span><div class="d-flex flex-wrap" id="languages-edit">${this.apiLangs.renderCheckBoxesArr('#languages-edit', 'editUser')}</div>
                <label class="d-block d-flex d-flex mt-3 card-text" for="experience-edit"><strong>Experience </strong></label>
                <select class="form-control custom-select" id="experience-edit">
                    <option value="">Years of experience</option>
                    <option value="- 1 Year">-1 Year</option>
                    <option value="1 - 3 Years">1 - 3 Years</option>
                    <option value="3 - 5 Years">3 - 5 Years</option>
                    <option value="+ 5 Years">+5 Years</option>
                </select>
                <div class="mt-4 d-flex btn-edit-container">
                    <button type="submit" class="btn ml-auto mr-auto btn-sm btn-info" id="edit-user-btn">Edit</button>
                </div>
            </form>
        `);

        $('#ModalCenterTitle').empty().html(user.name);
        $('#profilePicture').attr("src", user.avatar);
        $('.user-avatar-container').append(`<label for="edit-avatar" class="position-absolute" style="cursor: pointer; top: 0px; left:245px;" ><i class="fas fa-plus-circle"></i></label> <input style="display:none;" form="form-edit-user" type="file" id="edit-avatar" name="edit-avatar" accept="image/png, image/jpeg">`)
        $('.modal-user-body').empty().html(bodyModal);
    }

    renderEditUsers(e, arr) {
        
        arr.forEach(user => {
            
            if(user._id === e.target.nextElementSibling.id) {
                
                listUsers.createFormEditUser(user);    
            }
        })
    };

    filterUsers( currentPage ){
        
        let userPromise = new Promise((resolve, reject) => this.getEntityApi( resolve ));
        let skillsPromise = new Promise ((resolve) => this.apiSkills.getEntityApi( resolve ));
        let langsPromise = new Promise ((resolve) => this.apiLangs.getEntityApi( resolve ));

        Promise.all([userPromise, skillsPromise, langsPromise]).then((results) => {
            
            let allUsers = results[0];
            let allSkills = results[1];
            let allLangs = results[2];

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
            let experienceSelect = document.querySelector("#experience-search").value.toLowerCase();
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
                var filterByCity = allUsers.filter(user => user.address.city.toLowerCase().indexOf(cityInput) == -1);
                filterByCity.forEach(removeFilteredUser);
            }
            if(countryInput !== '') {
                var filterByCountry = allUsers.filter(user =>  user.address.country.toLowerCase() !== countryInput);
                filterByCountry.forEach(removeFilteredUser);
            }
            if(stateInput !== '') {
                var filterByState = allUsers.filter(user =>  user.address.state.toLowerCase() !== stateInput);
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


            if( allFilters.length === 0 ){
                $( "#card-container" ).empty();
                document.getElementById('card-container').innerHTML += `<h1 id="title-fail-search"> There are not any coincidence </h1>`;
            } else {
                if(currentPage === 1 ){ $( "#card-container" ).empty()}; 
                this.renderUsers( this.pagination(allFilters, 10, currentPage), allSkills, allLangs );
                this.setListenerModal('.btn-modal', allFilters, allSkills, allLangs, this.renderModal );
                this.setListenerModal('.btn-edit', allFilters, allSkills, allLangs, this.renderEditUsers );
                console.log(this.pagination(allFilters, 10, currentPage));
                console.log('Current page: ' + currentPage);
            }

        });
        
    }


}

const listUsers = new Users( 'https://cv-mobile-api.herokuapp.com/api/users');

const scroll = new ScrollInfinite(listUsers ,'filterUsers').initScroll();

//Calling the FilterUsers functions and render users on form's submit
$( "#adv-search-form" ).on( "submit", function(e) {
    //Don't refresh the page when submit
    e.preventDefault();

    listUsers.filterUsers(1);
});

// for (let key in user){
        //     // console.log(key);
        //     switch (key) {
        //         case '_id':
        //         case 'registeredDate':
        //         case 'profilePicture':
        //         case '__v':
        //             null
        //             break;
        //         case 'skills':
        //             $('#skills-modal').empty();
        //             this.renderCheckBoxArr('#skills-modal', 'skills');
        //             break;
        //         case 'languages':
        //             $('#language').empty();
        //             this.renderCheckBoxArr('#language', 'langs');
        //             break;
                    
        //         case 'address':
        //             for (let val in user[key]) {
        //                 let addressKey = user[key];
        //                 $(`#${val}`).empty().html(`<input style="display: block" value="" name="${val}" placeholder="${addressKey[val]}"></input>`)
        //             }
        //             break;
                
        //         default:
        //         $(`#${key}`).empty().html(`<input style="display: block" value="" name="${key}" placeholder="${user[key]}"></input>`);
        //             break;
        //     }
        // }
        
        // <input value="${skills.length > 0 ? skills.join(', ') : ''}" class="pl-1 ml-auto" id="skills-modal"></input>