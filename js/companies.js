class Companies extends Model{

    constructor( url, summaryContainer ) {
        super( url );
        this.summaryContainer = summaryContainer;
        this.createHtmlCompanyModal = this.createHtmlCompanyModal.bind(this);
    }

    pagination (arr, perpage, page) {     
        return arr.slice(perpage*(page-1), perpage*page);
    }

    createLinksToSocialMedia(company) {
        let arrayLinks = [];
        let urls = company.socialUrls;
        urls.forEach(social => {
            switch (social.platform) { 
                case 'twitter':
                    arrayLinks.push(`<a href="${social.url}" title="Go to ${social.url} page" target="_blank" class="mr-1"><i class="fab fa-twitter"></i></a>`);
                    break;
                case 'facebook':
                    arrayLinks.push(`<a href="${social.url}" title="Go to ${social.url} page" target="_blank" class="mr-1"><i class="fab fa-facebook"></i></a>`);
                    break;
                case 'instagram':
                    arrayLinks.push(`<a href="${social.url}" title="Go to ${social.url} page" target="_blank" class="mr-1"><i class="fab fa-instagram"></i></a>`);
                    break;
                case 'linkedin':
                    arrayLinks.push(`<a href="${social.url}" title="Go to ${social.url} page" target="_blank" class="mr-1"><i class="fab fa-linkedin"></i></a>`);
                    break;
                case 'youtube':
                    arrayLinks.push(`<a href="${social.url}" title="Go to ${social.url} page" target="_blank" class="mr-1"><i class="fab fa-youtube"></i></a>`);
                    break;
                default:
                    arrayLinks.push(`<a href="${social.url}" title="Go to ${social.url} page" target="_blank" class="mr-1"><i class="fab fa-${social.platform.toLowerCase()}"></i></a>`);
                    break;
            }
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
                            <img class="logo img-user rounded-circle" src="${company.logo}" alt="logo company">
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
                                ${company.address.city ? `<p class="m-0 text-capitalize"><strong>city: </strong>${company.address.street}</p>` : ''}
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
                                    ${company.socialUrls.length > 0 ? this.createLinksToSocialMedia(company).join(' ') : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="col">
                            <h6>About us</h6>
                            ${company.bio ? `<p class="card-text">${company.bio}</p>` : '' }
                        </div>
                    </div>
                    <div class="row">
                    <div class="row pl-5">
                        <!--Only show when have Offert Jobs o search employees-->
                        <p class="mr-3"><i class="fas fa-search mr-2"></i><a href="url">Search employees</a></p>
                        ${company.jobOffers.length > 0 ? `<p class="mr-2"><i class="fas fa-file-signature mr-2"></i><a href="url">Offert job: ${company.jobOffers.length}</a></p>`: ''}
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
                        ${company.socialUrls.length > 0 ? this.createLinksToSocialMedia(company).join(' ') : ''}
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

    filterCompany(currentPage) {
        
        new Promise((resolve) => this.getEntityApi(resolve))
        .then(result => {

            let form = document.querySelector('#adv-search-company').elements;
            let arrayForm = [];
            for (let i = 0; i < form.length; i++) {
                arrayForm.push(form[i]);
            }

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

            }

        });
    };

}

const company = new Companies('https://cv-mobile-api.herokuapp.com/api/companies');
const scroll = new ScrollInfinite(company ,'filterCompany').initScroll();

$( "#adv-search-company" ).on( "submit", function(e) {
    //Don't refresh the page when submit
    e.preventDefault();
    company.filterCompany(1);
    
});