class Companies extends Model{

    constructor( url, summaryContainer ) {
        super( url );
        this.summaryContainer = summaryContainer;
    }

    createLinksToSocialMedia(company) {
        let arrayLinks = [];
        let urls = company.socialUrls;
        urls.forEach(social => {
            switch (social.platform) {
                case 'twitter':
                    arrayLinks.push(`<a href="${social.url}" title="${social.url}" target="_blank" class="mr-2" style="color: #495057; font-size: 1.2rem;"><i class="fab fa-twitter"></i></a>`);
                    break;
                case 'facebook':
                    arrayLinks.push(`<a href="${social.url}" title="${social.url}" target="_blank" class="mr-2" style="color: #495057; font-size: 1.2rem;"><i class="fab fa-facebook"></i></a>`);
                    break;
                case 'instagram':
                    arrayLinks.push(`<a href="${social.url}" title="${social.url}" target="_blank" class="mr-2" style="color: #495057; font-size: 1.2rem;"><i class="fab fa-instagram"></i></a>`);
                    break;
                case 'linkedin':
                    arrayLinks.push(`<a href="${social.url}" title="${social.url}" target="_blank" class="mr-2" style="color: #495057; font-size: 1.2rem;"><i class="fab fa-linkedin"></i></a>`);
                    break;
                case 'youtube':
                    arrayLinks.push(`<a href="${social.url}" title="${social.url}" target="_blank" class="mr-2" style="color: #495057; font-size: 1.2rem;"><i class="fab fa-youtube"></i></a>`);
                    break;
                default:
                    arrayLinks.push(`<a href="${social.url}" title="${social.url}" target="_blank" class="mr-2" style="color: #495057; font-size: 1.2rem;"><i class="fab fa-${social.platform.toLowerCase()}"></i></a>`);
                    break;
            }
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
                                <img class="img-company rounded-circle" style="max-width: 100%;" src="${company.logo}">
                            </div>
                            <h5 class="card-title d-inline company-name text-capitalize">${company.name}</h5>
                            <h6 class="card-subtitle mb-3 text-center">Contact information</h6>
                        </div>
                    </div>   
                    <div class="row px-3">    
                        <div class="d-flex flex-column flex-nowrap text-left my-2">
                            ${company.address.city ? '<p class="m-0 text-capitalize"><strong>City: </strong>' + company.address.city + '</p>' : ''}
                            ${company.address.country ? '<p class="m-0 text-capitalize"><strong>Country: </strong>' + company.address.country + '</p>' : ''}
                            ${company.address.state ? '<p class="m-0 text-capitalize"><strong>State: </strong>' + company.address.state + '</p>' : ''}
                            <p class="m-0"><strong>Email: </strong><a href="mailto:${company.email}">${company.email}</a></p>
                            ${company.website ? '<p class="m-0 text-capitalize"><strong>Website: </strong>'+'<a href="'+ company.website +'" target="_blank">' + company.website + '</a></p>' : ''}
                            ${company.socialUrls.length > 0 ? '<div class="d-flex mt-2">' + this.createLinksToSocialMedia(company).join(' ') + '</div>' : ''}
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
    
                $('#logo-company').attr("src", `${company.avatar}`);
                    
                $('#ModalCenterTitleCompany').empty().html(company.name);
                    
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