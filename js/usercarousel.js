class Carousel extends Users {

    constructor (url, maincontainer, nextButton, prevButton, displacement) {
        super(url);
        this.maincontainer = maincontainer;
        this.displacement = displacement;
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        $(nextButton).click(this.next);
        $(prevButton).click(this.previous);
    }

    // Function for a button when is clicked next
    next() {
        document.querySelector( this.maincontainer ).scrollBy( this.displacement * this.divWidth(), 0);
    }

    // Function for a button when is clicked previous
    previous() {
        document.querySelector( this.maincontainer ).scrollBy( - (this.displacement * this.divWidth()), 0);
    }
    
    // For knowing the width of div where the info is inserted, so that when the button next or previous is clicked, it moves this amount of width
    divWidth() {
        var widthdiv = $('#carouselelement0').width();

        return widthdiv;
    }

    cards(arrayUsers) {
        arrayUsers.forEach(function(){
            document.getElementById('card-container').innerHTML +=  createHtmlUserCard();
        });
    }

    renderUsers(arrayUsers, skills, langs) {
        var users = [];
        let feature = new FeaturesModel;
        arrayUsers.forEach((user, index) => {
            let skillsLabels = feature.returnUserPropertyLabels(user.skills, skills);
            let langsLabels = feature.returnUserPropertyLabels(user.languages, langs);
            document.getElementById('card-container').innerHTML += `<div id="carouselelement${index}" style= "width: 100%">${this.createHtmlUserCard(user, skillsLabels, langsLabels)}</div>`;
            users.push(this.createHtmlUserCard(user, skillsLabels, langsLabels));
        });                
}

    // To show the information of each card, each one in his own div
    render() {

        var User = new Promise ((resolve) => this.getEntityApi( resolve ));
        var Skills = new Promise((resolve) => this.apiSkills.getEntityApi( resolve ));
        var Langs = new Promise((resolve) => this.apiLangs.getEntityApi( resolve ));

        Promise.all([User, Skills, Langs]).then(( results ) => {

        let allUsers = results[0];
        let allSkills = results[1];
        let allLangs = results[2];

        this.renderUsers(allUsers, allSkills, allLangs);
        });

    }

}

var carousel = new Carousel('https://cv-mobile-api.herokuapp.com/api/users', '#card-container', '#nextButton' , '#prevButton', 1);
carousel.render();

