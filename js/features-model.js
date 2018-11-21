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

    getSkillsAndLangs(callback) {
        let apiSkills = new FeaturesModel( 'https://cv-mobile-api.herokuapp.com/api/skills' );
        let apiLangs = new FeaturesModel( 'https://cv-mobile-api.herokuapp.com/api/langs' );

        let skillsPromise = new Promise ((resolve) => apiSkills.getEntityApi( resolve ));
        let langsPromise = new Promise ((resolve) => apiLangs.getEntityApi( resolve ));
        
        return Promise.all([skillsPromise, langsPromise]);
    }
  
}


// listUsers.renderCheckBoxesArr('#languages-search', 'langs');
// listUsers.renderCheckBoxesArr('#skills', 'skills');