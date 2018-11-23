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

    createCheckBoxes(arr, labelFor) {
        let checkBoxesArr = [];
        arr.forEach(val => {
            let checkBox =
            `<div class="form-check">
                <input class="form-check-input" type="checkbox" id="${val.label + '-' + labelFor}" name="${val.type}"
                    value="${val._id}">
                <label class="form-check-label mr-5" for="${val.label + '-' + labelFor}">${val.label}</label>
            </div>`;
            checkBoxesArr.push(checkBox);
        })
        return checkBoxesArr;
    }

    renderCheckBoxesArr(container, labelFor) {
        
        new Promise ( (resolve, reject) => {
            this.getEntityApi( resolve);
        }).then((checks) => {
            let arrayHtmlCheckboxes = this.createCheckBoxes( checks, labelFor );
            $(container).empty();
            arrayHtmlCheckboxes.forEach(checkBox =>{
                $(container).append(checkBox);
            });
        });
    }
  
}


let featureSkills = new FeaturesModel('https://cv-mobile-api.herokuapp.com/api/skills');
featureSkills.renderCheckBoxesArr('#skills', 'search');
let featureLangs = new FeaturesModel('https://cv-mobile-api.herokuapp.com/api/langs');
featureLangs.renderCheckBoxesArr('#languages-search', 'search');