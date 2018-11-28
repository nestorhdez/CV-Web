class Carousel {
    data = [];
    maincontainer = '';
    innerdivwidth = 0; 
    constructor (data, maincontainer, nextButton, prevButton, displacement) {
        this.data = data;
        this.maincontainer = maincontainer;
        this.displacement = displacement;
        this.innerdivwidth = widthdiv;
        $(nextButton).click(this.next);
        $(prevButton).click(this.previous);
    }

    // Function for a button when is clicked next
    next() {
        this.displacement * this.innerdivwidth; 
    }

    // Function for a button when is clicked previous
    previous() {
        document.getElementById(carouselement0).scrollLeft(this.displacement * this.innerdivwidth);
    }

    // For knowing the width of div where the info is inserted, so that when the button next or previous is clicked, it moves this amount of width
    divWidth() {
        var widthdiv = document.getElementById('carouselement0').offsetWidth;
        console.log("Width del div: ", widthdiv)
        return widthdiv;
    }

    renderUsers(arrayUsers, skills, langs) {
        var users = [];
        let feature = new FeaturesModel;
        arrayUsers.forEach((user) => {
            let skillsLabels = feature.returnUserPropertyLabels(user.skills, skills);
            let langsLabels = feature.returnUserPropertyLabels(user.languages, langs);
            // document.getElementById('card-container').innerHTML += this.createHtmlUserCard(user, skillsLabels, langsLabels);
			users.push(this.createHtmlUserCard(user, skillsLabels, langsLabels));
        });
        document.getElementById('card-container').innerHTML += "<div id='loader'><div>";                
}

    // To show the information of each card, each one in his own div
    render() {
        var info = [];

        this.data.forEach(function(currentValue, index) {
             info.push('<div id="carouselelement' + index +'">' + currentValue + '</div>'); 
        });
        $('#'+this.maincontainer).html(
            '<div id="carouselcards">'+
            '<div>'+
            info.join() +
            '</div>'+
            '</div>'
        );
        this.innerdivwidth = this.divWidth();
    }
}

