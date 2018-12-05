class Companies extends Model{

    constructor( url, summaryContainer ) {
        super( url );
        this.summaryContainer = summaryContainer;
        this.createHtmlCompanyModal = this.createHtmlCompanyModal.bind(this);
    }

    pagination (arr, perpage, page) {     
        return arr.slice(perpage*(page-1), perpage*page);
    }

    createArrayOfForm(form, array) {
        for (let i = 0; i < form.length; i++) {
            array.push(form[i]);
        }
    }

    createLinkSocial(social) {
        return `<a href="${social.url}" title="${social.url}" id="${social.platform.toLowerCase()}-link" class="icon-link mr-3" target="_blank"><i class="fab fa-${social.platform.toLowerCase()}"></i></a>`;
    }

    addLinkOnEditCompany() {
        let platform = document.querySelector('#platform-edit').value;
        let url = document.querySelector('#url-edit').value;
        let social = {
            platform: platform,
            url: url,
        }
        platform && url !== '' ? document.querySelector('.edit-link-container').innerHTML += this.createLinkSocial(social) : '';
        document.querySelector('#platform-edit').value = '';
        document.querySelector('#url-edit').value = '';
        this.addDeleteBtnLinks();
        $('.delete-link').click((e) => {
            e.preventDefault();
            this.deleteSocialLinks(e);
        });
    }

    addDeleteBtnLinks() {
        let links = document.querySelectorAll('.edit-link-container')[0].childNodes;
        links.forEach((link) => {

            if(link.childNodes.length <= 1) {
                link.className += ' position-relative';
                link.innerHTML += (`
                    <button class="delete-link position-absolute btn-transparent btn-delete-link" style="">
                        <i class="icon-delete-link far fa-times-circle"></i>
                    </button>
                `);
            }
        });
    }

    deleteSocialLinks(e) {
        e.target.parentNode.parentNode.remove();
    }

    renderLinkSocial(company) {
        let arrayLinks = [];
        let urls = company.socialUrls;
        urls.forEach(social => {
            arrayLinks.push(this.createLinkSocial(social));
        })
        return arrayLinks;
    }

    createHtmlCardCompany(company) {
        let card = (`
            <div class="card my-1 mx-1 card-company shadow list-group-item-action" id="card_${company._id}" style="width: 20rem;">
                <div class="card-header">
                    <div class="d-inline-flex justify-content-between mx-2 mb-1">        
                        <button type="button" class="btn-edit btn btn-gray btn-sm mx-1" id="" data-toggle="modal"
                        data-target="#ModalCompany">Edit</button>
                        <button type="button" class="btn btn-gray btn-modal btn-sm mx-1" id="${company._id}" data-toggle="modal"
                        data-target="#ModalCompany">Detail</button>
                        <button type="button" class="btn btn-delete btn-cobalt btn-sm mx-1">Delete</button>
                        </div>
                    </div>
                    <div class="card-header d-inline-flex justify-content-start align-items-center">
                        <div class="profile-picture mr-3">
                            <img class="logo profile-picture rounded-circle" src="${company.logo}" alt="logo company">
                        </div>
                        <h5 class="card-title company-name text-capitalize">${company.name}</h5>
                    </div>  
                    
                    <div class="card-body">
                    <div class ="row mb-2">
                        <div class="col mb-3">
                            <h6 class="mb-2">Address data</h6>
                            <div class="card-text">
                                ${company.address.country ? `<p class="m-0 text-capitalize"><strong>country: </strong>${company.address.country}</p>` : ''}
                                ${company.address.street ? `<p class="m-0 text-capitalize"><strong>street: </strong>${company.address.street}</p>` : ''}
                                ${company.address.city ? `<p class="m-0 text-capitalize"><strong>city: </strong>${company.address.city}</p>` : ''}
                                ${company.address.zipcode ? `<p class="m-0 text-capitalize"><strong>zipcode: </strong>${company.address.zipcode}</p>` : ''}
                            </div>  
                        </div>
                        <div class="col mb-3">
                            <h6 lass="mb-2">Contact</h6>
                            <div class="card-text">
                                ${company.email ? `<p class="m-0 text-capitalize"><strong>Email: </strong>${company.email}</p>`: ''}
                                ${company.phone ? ` <p class="m-0 text-capitalize"><strong>Phone: </strong>${company.phone}</p>` : '' }
                                ${company.website ? `<p class="m-0"><strong>Website: </strong><a href="${company.website}" target="_blank" title="Know us">${company.website}</a></p>` : ''}
                                <label class="mb-1"><strong>Social Media:</strong></label>
                                <div class="col pl-0">
                                    <!--Only need show when have url -->
                                    ${company.socialUrls.length > 0 ? this.renderLinkSocial(company).join(' ') : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `)
        return card;
    }

    renderCompaniesCards(arrayCompanies) {
        arrayCompanies.forEach(company => {
            document.querySelector("#cards-container").innerHTML += this.createHtmlCardCompany(company);
        })
    }

    setListenerModal(element, arr, callback){     
        $(element).click((e) =>{
            callback(e, arr);
        });
    }

    createHtmlCompanyModal(company) {
        let bodyModal = (`
            <div class ="row mb-2">
                <div class="col mb-3">
                    <h6 class="mb-2">Address data</h6>
                    <div class="card-text">
                        ${company.address.country ? `<p class="m-0 text-capitalize"><strong>country: </strong>${company.address.country}</p>` : ''}
                        ${company.address.street ? `<p class="m-0 text-capitalize"><strong>street: </strong>${company.address.street}</p>` : ''}
                        ${company.address.city ? `<p class="m-0 text-capitalize"><strong>city: </strong>${company.address.city}</p>` : ''}
                        ${company.address.zipcode ? `<p class="m-0 text-capitalize"><strong>zipcode: </strong>${company.address.zipcode}</p>` : ''}
                    </div>  
                </div>
            <div class="col mb-3">
                <h6 lass="mb-2">Contact</h6>
                <div class="card-text">
                    ${company.email ? `<p class="m-0 text-capitalize"><strong>Email: </strong>${company.email}</p>` : ''}
                    ${company.phone ? `<p class="m-0 text-capitalize"><strong>Phone: </strong>${company.phone}</p>` : ''}
                    ${company.url ? `<p class="m-0"><strong>Website: </strong><a href="${company.url}" target="_blank" title="Know us">${company.url}</a></p>` : ''}
                    <label for=""><strong>Social Media:</strong></label>
                    <div class="col">
                        <!-- Only need show when have url-->
                        ${company.socialUrls.length > 0 ? this.renderLinkSocial(company).join(' ') : ''}
                    </div>
                </div>
            </div>
            </div>
            <div class="row mb-2">
                <div class="col">
                    <h6>About us:</h6>
                    ${company.bio ? `<p class="card-text">
                        ${company.bio}
                    </p>` : '<p class="card-text"> No info. </p>'}
                </div>
            </div>
            <div class="row">
                <div class="row mx-auto">
                    <!-- Only show when have Offert Jobs o search employees -->
                    <div class="col">
                        <p class="mr-3"><i class="fas fa-search mr-2"></i><a href="url">Search employees</a></p>
                        <p class="form-control my-2"> Content about Search employes.</p>
                    </div>
                    <div class="col">
                    ${company.jobOffers.length > 0 ? `<p class="mr-2"><i class="fas fa-file-signature mr-2"></i><a href="url">Offert job: ${company.jobOffers.length}</a></p><p class="form-control my-2"> Content about Offert job.</p>`: '<p class="mr-2"><i class="fas fa-file-signature mr-2"></i>Offert job: None by currently</p>'}
                    </div>
                </div>
            </div>       
        `);

        return bodyModal;
    }

    renderCompanyModal(e, arrayCompanies) {

        const comp = new Companies();
        arrayCompanies.forEach( (company) => {
            
            if(company._id == e.target.id){
    
                $('#logo-company').attr("src", `${company.logo}`);
                $('.icon-container') ? $('.icon-container').remove() : '';
                $('#avatar-edit') ? $('#avatar-edit').remove() : '';          
                $('#Title-company').empty().html(company.name);
                $('.modal-company-body').empty().html(comp.createHtmlCompanyModal(company));
                
            }
        });
    }

    deleteCompany(e) {
        console.log("click done.");
        console.log(
            "User will be delete: ",
            $(e.target)[0].previousElementSibling.id
        );
        let companydelete = $(e.target)[0].previousElementSibling.id;
        const del = new Companies();
        del.sendDeleteCompany(companydelete);
        console.log("Company deleted.");
        console.log("This: ", $(e.target));
        $("#card_" + companydelete).remove();
    }  

    sendDeleteCompany(user) {
        fetch("https://cv-mobile-api.herokuapp.com/api/companies/" + user, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(jsonResponse => console.log(jsonResponse))
            .catch(error => console.error("Error:", error));
    }

    createFormEditCompany(company) {
        
        let bodyModal = (`
            <h4 class="modal-subtitle card-subtitle text-center mb-3">Edit information</h4>
            <form id="form-edit-company">
                <label class="d-block d-flex mt-3 card-text"><strong>Email </strong><input name="email" value="${company.email}" required type="email" class="pl-1 input-default edit-input form-control ml-auto" id="email-edit"></label>
                <label class="d-block d-flex mt-3 card-text"><strong>Phone </strong><input name="phone" value="${company.phone}" type="tel" class="pl-1 input-default edit-input form-control ml-auto" id="phone-edit"></label>
                <label class="d-block d-flex mt-3 card-text text-capitalize"><strong>Country </strong><input name="address-country" value="${company.address.country}" required type="text" class="pl-1 input-default edit-input form-control ml-auto" id="country-edit"></label>
                <label class="d-block d-flex mt-3 card-text text-capitalize"><strong>City </strong><input name="address-city" value="${company.address.city ? company.address.city : ''}" type="text" class="pl-1 input-default edit-input form-control ml-auto" id="city-edit"></label>
                <label class="d-block d-flex mt-3 card-text text-capitalize"><strong>Street </strong><input name="address-street" value="${company.address.street ? company.address.street : ''}" type="text" class="pl-1 input-default edit-input form-control ml-auto" id="street-edit"></label>
                <label class="d-block d-flex mt-3 card-text text-capitalize"><strong>Zip </strong><input name="address-zipcode" value="${company.address.zipcode ? company.address.zipcode : ''}" type="text" class="pl-1 input-default edit-input form-control ml-auto" id="zip-edit"></label>
                <label class="d-block d-flex mt-3 card-text"><strong>Website </strong><input name="website" value="${company.website ? company.website : ''}" type="text" class="pl-1 input-default edit-input form-control ml-auto" id="website-edit"></label>
                <label class="d-block d-flex mt-3 card-text" for="docType-edit"><strong>Document type </strong>
                    <select name="docType" id="docType-edit" class="ml-auto form-control input-default edit-input custom-select">
                        <option value="">Doc type</option>
                        <option value="nif">NIF</option>
                        <option value="cif">CIF</option>
                    </select>
                </label>
                <label class="d-block d-flex mt-3 card-text"><strong>Document number</strong><input name="docNumber" value="${company.docNumber ? company.docNumber : ''}" type="text" class="pl-1 input-default edit-input form-control ml-auto" id="docNumber-edit"></label>
                <label for="bio-edit" name="bio" class="d-block d-flex mt-3 card-text"><strong>Bio</strong></label>
                <textarea name="bio" id="bio-edit" rows="4" cols="50" class="pl-1 input-default form-control">${company.bio ? company.bio : ''}</textarea>
                <p class="mt-3 font-weight-bold card-text" > Social Media </p>
                <div class="d-flex flex-column social-edit-container">
                <label class="d-block d-flex mt-3 card-text" for="platform-edit"><strong class="align-self-center">Platform</strong> <input name="" value="" placeholder="Facebook, Twitter..." type="text" id="platform-edit" class="pl-1 input-default edit-input form-control ml-auto"></label>
                <label class="d-block d-flex mt-1 card-text" for="url-edit"><strong class="align-self-center">URL</strong> <input name="" value="" type="text" id="url-edit" class="pl-1 input-default edit-input form-control ml-auto"></label>
                <button id="btn-add-social" class="btn-transparent">Add link  <i class="fas fa-plus-circle"></i></button>
                ${company.socialUrls.length > 0 ? `<div class="edit-link-container d-flex mt-2 mb-2">${this.renderLinkSocial(company).join(' ')}</div>` : ''}
                </div>
                <div class="mt-4 d-flex btn-edit-container">
                    <button type="" class="btn ml-auto mr-auto btn-sm btn-info" id="edit-company-btn">Save</button>
                </div>
            </form>
        `);

        $('#Title-company').empty().html(`<input name="name" value="${company.name}" class="input-default edit-title form-control text-center" form="form-edit-company" required type="text" class="pl-1 ml-auto" id="name-edit"></label>`);
        $('#logo-company').attr("src", company.logo);
        $('.company-logo-container').append(`<label for="avatar-edit" class="icon-container position-absolute d-flex"><i title="Choose image" class=" icon-photo m-auto fas fa-camera"></i></label> <input style="display:none;" type="file" id="avatar-edit" name="avatar-edit" accept="image/png, image/jpeg">`)
        $('.modal-company-body').empty().html(bodyModal);
        company.docType !== '' ? document.querySelector('#docType-edit').value = company.docType : '';

        this.addDeleteBtnLinks();

        $('#btn-add-social').click((e) => {
            e.preventDefault();
            this.addLinkOnEditCompany();
        });
        $('.delete-link').click((e) => {
            e.preventDefault();
            this.deleteSocialLinks(e);
        });
    }

    createObjectEditCompany(company) {
        let companyEdited = company;
        let form = document.querySelector('#form-edit-company').elements;
        let arrayForm = [];
        this.createArrayOfForm(form, arrayForm);

        arrayForm.forEach((input) => {

            if(input.name !== ''){

                let name = input.name.split('-')[0]
                switch (name) {
                    case  'address':
                        companyEdited[input.name.split('-')[0]][input.name.split('-')[1]] = input.value;
                        break;
                    default:
                        companyEdited[input.name] = input.value;
                        break;
                }   
            }
        });

        let socialEditedArray = [];
        let platformEditedArray = [];
        document.querySelector('.edit-link-container').querySelectorAll('.icon-link').forEach(social => socialEditedArray.push(social));
        let platformCompanyArray = [];
        let urlCompanyArray = [];

        companyEdited.socialUrls.forEach(social => {
            platformCompanyArray.push(social.platform); 
            urlCompanyArray.push(social.url);
        });

        socialEditedArray.forEach(social => {
            let platformEditedSocial = social.id.split('-')[0];
            platformEditedArray.push(platformEditedSocial);
            if(platformCompanyArray.includes(platformEditedSocial)){
                urlCompanyArray.includes(social.title) ? '' : companyEdited[platformCompanyArray.indexOf(platformEditedSocial)].url = social.title;
            }else{
                let newSocial = {
                    platform: platformEditedSocial,
                    url: social.title,
                }
                companyEdited.socialUrls.push(newSocial);
            }
        }); 
        platformCompanyArray.forEach(platform => {
            platformEditedArray.includes(platform) ? '' : companyEdited.socialUrls.splice(platformCompanyArray.indexOf(platform), 1);
        })
        console.log("Edited: ", companyEdited);
        return companyEdited;
    }

    sendEditedCompany(company) {
        
        fetch(`https://cv-mobile-api.herokuapp.com/api/companies/${company._id}`, {
            method: 'PUT',
            body: JSON.stringify(company),
            headers: { "Content-Type": "application/json; charset=utf-8" }
        })
        .then( res => res.json())
        .then( response => console.log(response));
    }

    sendEditedImg(company) {
        let imgInput = document.querySelector('#avatar-edit');
        if(imgInput.files.length > 0){
            let formData = new FormData();
            formData.append('img', imgInput.files[0]);
            
            fetch(`https://cv-mobile-api.herokuapp.com/api/files/upload/company/${company._id}`, {
                method: 'POST',
                body: formData,
            })
            .then( res => res.json())
            .then( response => console.log(response));
        }
    }

    renderEditCompany(e, arr) {
        
        arr.forEach(company => {
            
            if(company._id === e.target.nextElementSibling.id) {
                
                listCompany.createFormEditCompany(company);

                $('#edit-company-btn').click((e) =>{
                    e.preventDefault();
                    listCompany.sendEditedCompany(listCompany.createObjectEditCompany(company));
                    listCompany.sendEditedImg(company);
                });   
            }
        })
    };

    filterCompany(currentPage) {
        
        new Promise((resolve) => this.getEntityApi(resolve))
        .then(result => {

            let form = document.querySelector('#adv-search-company').elements;
            let arrayForm = [];
            this.createArrayOfForm(form, arrayForm);

            function removeFilteredCompany(company){
                if(filteredCompanies.includes(company)){
                    let i = filteredCompanies.indexOf(company);
                    filteredCompanies.splice(i, 1);
                }
            }

            let filteredCompanies = result;

            arrayForm.forEach(input => {
                let propertyOfInput = input.id.split('-')[0];

                filteredCompanies.forEach(() => {

                    switch (propertyOfInput) {
                        case 'address':
                            let propertyAddress = input.id.split('-')[1];
                            let filterAddress = filteredCompanies.filter(company => company[propertyOfInput][propertyAddress].toLowerCase().indexOf(input.value.toLowerCase()) == -1);
                            filterAddress.forEach(company => removeFilteredCompany(company));
                            break;
                        case 'jobOffers':
                            if( input.checked ) {;
                                let filterJobOffers = filteredCompanies.filter(company => company.jobOffers.length === 0 );
                                filterJobOffers.forEach(company => removeFilteredCompany(company));
                            }  
                            break;
                        case 'social':
                            if(input.value !== ''){
                                let filterSocial = filteredCompanies.filter(company => {
                                    let socialControl = []
                                    company.socialUrls.forEach(social => socialControl.push(social.platform.includes(input.value)));
                                    
                                    if(socialControl.includes(true)){ 
                                        return false
                                    } else {
                                        return true
                                    }
                                });
                                filterSocial.forEach(company => removeFilteredCompany(company));
                            };
                            break;
                        default:
                            let filterDefault = filteredCompanies.filter(company => company[propertyOfInput] !== undefined ? company[propertyOfInput].toLowerCase().indexOf( input.value.toLowerCase() ) == -1 : '');
                            filterDefault.forEach(company => removeFilteredCompany(company));
                            break;
                    }
                });
            });

            if( filteredCompanies.length === 0 ){
                $( "#cards-container" ).empty();
                document.getElementById('cards-container').innerHTML += `<h1 id="title-fail-search"> There are not any coincidence </h1>`;
            } else {
                currentPage === 1 ? $( "#cards-container" ).empty() : '';
                
                if(this.pagination(filteredCompanies, 10, currentPage).length === 0){
                    let title = document.getElementById('end-of-companies');
                    title ? '' : document.getElementById('cards-container').innerHTML += `<p id="end-of-companies" class="text-center col-12 mt-3"> There are not more companies to show </p>`;
                } else {
                this.renderCompaniesCards( this.pagination(filteredCompanies, 10, currentPage) );
                }

                this.setListenerModal('.btn-modal', filteredCompanies, this.renderCompanyModal );
                this.setListenerModal('.btn-delete', filteredCompanies, this.deleteCompany );
                this.setListenerModal('.btn-edit', filteredCompanies, this.renderEditCompany );
            }

        });
    };

}

const listCompany = new Companies('https://cv-mobile-api.herokuapp.com/api/companies');
const scroll = new ScrollInfinite(listCompany ,'filterCompany').initScroll();

$( "#adv-search-company" ).on( "submit", function(e) {
    //Don't refresh the page when submit
    e.preventDefault();
    listCompany.filterCompany(1);  
});