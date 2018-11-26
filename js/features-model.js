class FeaturesModel extends Model {

    constructor(url){
        super( url );
    }

    returnUserPropertyLabels(userArray, apiArray) {
        let userCollection = [];
        userArray.forEach( userVal => {
            apiArray.forEach(apiVal => {
                if(userVal === apiVal._id) {
                    userCollection.push(apiVal.label);   
                }
            });
        });
        return userCollection;
    }

    createCheckBoxes(arr, labelFor, user) {
        let checkBoxesArr = [];
        arr.forEach(val => {
            let checkBox =
            `<div class="form-check">
                <input class="form-check-input" ${user ? user.skills.includes(val._id) ? 'checked' : null : null} ${user ? user.languages.includes(val._id) ? 'checked' : null : null} type="checkbox" id="${labelFor + '-' + val.label}" name="${val.type}"
                    value="${val._id}">
                <label class="form-check-label mr-5" for="${labelFor + '-' + val.label}">${val.label}</label>
            </div>`;
            checkBoxesArr.push(checkBox);
        })
        return checkBoxesArr;
    }

    renderCheckBoxesArr(container, labelFor, user) {
        
        new Promise ( (resolve, reject) => {
            this.getEntityApi( resolve);
        }).then((checks) => {
            let arrayHtmlCheckboxes = this.createCheckBoxes( checks, labelFor, user );
            $(container).empty();
            arrayHtmlCheckboxes.forEach(checkBox =>{
                $(container).append(checkBox);
            });
        });
    }
  
}


let featureSkills = new FeaturesModel('https://cv-mobile-api.herokuapp.com/api/skills');
featureSkills.renderCheckBoxesArr('#skills-search', 'search');
let featureLangs = new FeaturesModel('https://cv-mobile-api.herokuapp.com/api/langs');
featureLangs.renderCheckBoxesArr('#languages-search', 'search');