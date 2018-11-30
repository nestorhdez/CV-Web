class Companies extends Model{

    constructor( url, summaryContainer ) {
        super( url );
        this.summaryContainer = summaryContainer;
    }

    createLinksToSocialMedia(company) {
        let arrayLinks = [];
        let urls = company.socialUrls;
        urls.forEach(social => {
            switch (social.platform) {   //<a href="https://www.facebook.com" target="_blank" title="Go to facebook page."><i class="fab fa-facebook"></i></a>
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
            ${company.socialUrls.length > 0 ? '<div class="d-flex mt-2">' + this.createLinksToSocialMedia(company).join(' ') + '</div>' : ''}
            ${company.jobOffers.length > 0 ? '<p class="d-block d-flex mt-2 card-text text-capitalize"><strong>Job Offers:  ' + company.jobOffers.length + '</strong></p>' : ''}
        `);

        return bodyModal;
    }

    renderCompanyModal(e, arrayCompanies) {

        arrayCompanies.forEach( (company) => {
            
            if(company._id == e.target.id){
    
                $('#logo-company').attr("src", `${company.logo}`);
                    
                $('#Title-company').empty().html(company.name);
                    
                $('.modal-company-body').empty().html(this.createHtmlCompanyModal(company));
                
            }
        });
    }
}

const company = new Companies('https://cv-mobile-api.herokuapp.com/api/companies');

$( "#adv-search-company" ).on( "submit", function(e) {
    //Don't refresh the page when submit
    e.preventDefault();
    $("#card-container").empty();
    new Promise((resolve) => company.getEntityApi(resolve))
    .then(result => {
        company.renderCompaniesCards(result);
        $('.btn-modal').click((e) => {
            company.renderCompanyModal(e, result);
        })
    });
    
});