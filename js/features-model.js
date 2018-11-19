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

    createCheckBoxes(arr) {
        let checkBoxesArr = [];
        arr.forEach(val => {
            let checkBox =
            `<div class="form-check">
                <input class="form-check-input" type="checkbox" id="${val.label}-check" name="${val.type}"
                    value="${val._id}">
                <label class="form-check-label mr-5" for="${val.label}-check">${val.label}</label>
            </div>`;
            checkBoxesArr.push(checkBox);
        })
        return checkBoxesArr;
    }

    renderCheckBoxesArr(container) {
        
        new Promise ( (resolve, reject) => {
            this.getEntityApi( resolve);
        }).then((checks) => {
            let arrayHtmlCheckboxes = this.createCheckBoxes( checks );
            arrayHtmlCheckboxes.forEach(checkBox =>{
                $(container).append(checkBox);
            });
        });
    }
  
}


// listUsers.renderCheckBoxesArr('#languages-search', 'langs');
// listUsers.renderCheckBoxesArr('#skills', 'skills');