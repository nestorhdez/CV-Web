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
            <div class="card mx-1 my-1 card-company shadow list-group-item-action" id="card_${company._id}" style="width: 18rem;">
                <div class="card-body text-center">
                    <div class="row mb-4">        
                        <div class="d-flex justify-content-between align-self-end mt-3 mx-auto">
                            <button type="button" class="btn-edit btn btn-info btn-sm mx-1" id="" data-toggle="modal"
                            data-target="#ModalCenter">Edit</button>
                            <button type="button" class="btn btn-info btn-modal btn-sm mx-1" id="${company._id}" data-toggle="modal"
                            data-target="#ModalCenter">Detail</button>
                            <button type="button" class="btn btn-delete btn-cobalt btn-sm mx-1">Delete</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="d-flex flex-column mx-auto justify-content-center mb-3">
                            <div class="d-flex mx-auto profile-picture mb-1">
                                <img id="logo-company-card" class="img-company rounded-circle" style="max-width: 100%;" src="${company.logo}" onerror="setDefaultImgOnError(this)">
                            </div>
                            <h5 class="card-title d-inline company-name text-capitalize">${company.name}</h5>
                            <h6 class="card-subtitle mb-3 text-center">Contact information</h6>
                        </div>
                    </div>   
                    <div class="row px-3">    
                        <div class="d-flex flex-column flex-nowrap text-left my-2">
                            ${company.address.city ? '<p class="m-0 text-capitalize"><strong>City: </strong>' + company.address.city + '</p>' : ''}
                            ${company.address.country ? '<p class="m-0 text-capitalize"><strong>Country: </strong>' + company.address.country + '</p>' : ''}
                            ${company.address.street ? '<p class="m-0 text-capitalize"><strong>Street: </strong>' + company.address.street + '</p>' : ''}
                            <p class="m-0"><strong>Email: </strong><a href="mailto:${company.email}">${company.email}</a></p>
                            ${company.website ? '<p class="m-0 text-capitalize"><strong>Website: </strong>'+'<a href="'+ company.website +'" target="_blank">' + company.website + '</a></p>' : ''}
                            ${company.socialUrls.length > 0 ? '<div class="d-flex mt-2">' + this.renderLinkSocial(company).join(' ') + '</div>' : ''}
                        </div>
                    </div>    
                </div>
            </div>
            `)
        return card;
    }

    renderCompaniesCards(arrayCompanies) {
        arrayCompanies.forEach(company => {
            document.querySelector("#card-container").innerHTML += this.createHtmlCardCompany(company);
        })
    }

    setListenerModal(element, arr, callback){     
        $(element).click((e) =>{
            callback(e, arr);
        });
    }

    createHtmlCompanyModal(company) {
        let bodyModal = (`
            <h4 class="modal-subtitle card-subtitle text-center mb-3">Detail information</h4>
            ${company.bio ? '<p class="d-block d-flex mt-2 mb-0 card-text text-capitalize"><strong>Description: </strong><p class="pl-1" id="bio-modal">' + company.bio + '</p></p>' : ''}
            <p class="d-block mt-2 card-text"><strong>Email: </strong><a class="pl-1" href="mailto:${company.email}" id="email-modal">${company.email}</a></p>
            <p class="d-block d-flex mt-2 card-text text-capitalize"><strong>Country: </strong><span class="pl-1" id="country-modal">${company.address.country}</span></p>
            ${company.address.city ? '<p class="d-block d-flex mt-2 card-text text-capitalize"><strong>City: </strong><span class="pl-1" id="city-modal">' + company.address.city + '</span></p>' : '' }
            ${company.address.street ? '<p class="d-block d-flex mt-2 card-text text-capitalize"><strong>Street: </strong><span class="pl-1" id="street-modal">' + company.address.street + '</span></p>' : ''}
            ${company.company ? '<p class="d-block d-flex mt-2 card-text text-capitalize"><strong>Company: </strong><span class="pl-1" id="company-modal">' + company.company + '</span></p>' : ''}
            ${company.jobTitle ? '<p class="d-block d-flex mt-2 card-text text-capitalize"><strong>Job Title: </strong><span class="pl-1" id="jobtitle-modal">' + company.jobTitle + '</span></p>' : ''}
            ${company.website ? '<p class="d-block d-flex mt-2 card-text"><strong>Website: </strong><a class="pl-1" target="blank" href="' + company.website + '" id="website-modal">' + company.website + '</a></p>' : ''}
            ${company.phone ? '<p class="d-block d-flex mt-2 card-text text-capitalize"><strong>Phone Number: </strong><span class="pl-1" id="phone-modal">' + company.phone + '</span></p>' : ''}
            ${company.socialUrls.length > 0 ? '<div class="d-flex mt-2">' + this.renderLinkSocial(company).join(' ') + '</div>' : ''}
            ${company.jobOffers.length > 0 ? '<p class="d-block d-flex mt-2 card-text text-capitalize"><strong>Job Offers:  ' + company.jobOffers.length + '</strong></p>' : ''}
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
                    
                $('#ModalCenterTitleCompany').empty().html(company.name);
                    
                $('.modal-company-body').empty().html(comp.createHtmlCompanyModal(company));
                
            }
        });
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
                <label class="d-block d-flex mt-3 card-text text-capitalize"><strong>Zip </strong><input name="address-zipcode" value="${company.address.zip ? company.address.zip : ''}" type="text" class="pl-1 input-default edit-input form-control ml-auto" id="zip-edit"></label>
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
                ${company.socialUrls.length > 0 ? '<div class="edit-link-container d-flex mt-2 mb-2">' + this.renderLinkSocial(company).join(' ') + '</div>' : ''}
                </div>
                <div class="mt-4 d-flex btn-edit-container">
                    <button type="" class="btn ml-auto mr-auto btn-sm btn-info" id="edit-company-btn">Save</button>
                </div>
            </form>
        `);

        $('#ModalCenterTitleCompany').empty().html(`<input name="name" value="${company.name}" class="input-default edit-title form-control text-center" form="form-edit-company" required type="text" class="pl-1 ml-auto" id="name-edit"></label>`);
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

    renderEditCompany(e, arr) {
        
        arr.forEach(company => {
            
            if(company._id === e.target.nextElementSibling.id) {
                
                listCompany.createFormEditCompany(company);
               
                $('#edit-company-btn').click((e) =>{
                    e.preventDefault();
                    listCompany.sendEditedCompany(listCompany.createObjectEditCompany(company));
                    // listCompany.sendEditedImg(company);
                });   
            }
        })
    };

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
        console.log(companyEdited);
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
                $( "#card-container" ).empty();
                document.getElementById('card-container').innerHTML += `<h1 id="title-fail-search"> There are not any coincidence </h1>`;
            } else {
                currentPage === 1 ? $( "#card-container" ).empty() : '';
                
                if(this.pagination(filteredCompanies, 10, currentPage).length === 0){
                    let title = document.getElementById('end-of-companies');
                    title ? '' : document.getElementById('card-container').innerHTML += `<p id="end-of-companies" class="text-center col-12 mt-3"> There are not more companies to show </p>`;
                } else {
                this.renderCompaniesCards( this.pagination(filteredCompanies, 10, currentPage) );
                }
                this.setListenerModal('.btn-modal', filteredCompanies, this.renderCompanyModal );
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