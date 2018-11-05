$("#search-btn").on("click", function() {
  $(".area").empty();
  var name = $("#input-name").val();
  var username = $("#validationusername").val();
  var email = $("#validationemail").val();
  var gender = $("#gender").val();
  var city = $("#city-option").val();
  var state = $("#validationState").val();
  var country = $("#validationCountry").val();
  var company = $("#validationcompany").val();
  var job = $("#validationjob").val();
  var experience = $("#experience").val();
  var spans = '<span class="badge badge-info mr-2 badge-font"';
  var deletion =
    '<button class="bg-transparent border-0 deletion"><i class="fas fa-times-circle"></i></button>';
  var finspans = "</span>";
  var selectLanguage = $("#languages");
  var languages = selectLanguage.find("input[type=checkbox]");
  var selectSkill = $("#skills");
  var skills = selectSkill.find("input[type=checkbox]");
  var variables = [name, username, email, gender, city, state, country, company, job, experience];
  var idsvariables = ["#input-name",'#validationusername',"#validationemail","#gender","#city-option", "#validationState", "#validationCountry", "#validationcompany","#validationjob","#experience"];
  // var idcheckboxs = ["#eng-check","#french-check","#german-check","#spanish-check","#html-check","#css-check","#sass-check","#javascript-check","#react-check","#git-check","#github-check"];
  console.log("longvariables: " + variables.length + name + "name");

  // to append text inputs
  for (let i = 0; i < variables.length; i++) {
    if (variables[i] != 0) {
      if (i == 9) {
        $(".area").append(
          spans + 'data-idsvariables="'+ idsvariables[i] +'">' + variables[i] + " year/s" + deletion + finspans
        );
      } else {
        $(".area").append(spans + 'data-idsvariables="'+ idsvariables[i] +'">' + variables[i] + deletion + finspans);
      }
    }
  }

  // to append checkeable checkboxs
  for (input of languages) {
    if ($(input).prop("checked") === true) {
      $(".area").append(spans + '#languages' + ">" + $(input).prop("name") + deletion + finspans);
    }
  }
  for (input of skills) {
    if ($(input).prop("checked") === true) {
      $(".area").append(spans + '#skills' + ">" + $(input).prop("name") + deletion + finspans);
    }
  }

  // for deleting the inputs that were appended and also its value
  $(".deletion").on("click",function( e ) {
    // AREA TEST
    // console.log("type-of-input: ", $('form#adv-search-form input[type=text]'));
    // console.log("lo clickeado: ", $(this).parent().attr("data-idsvariables"));
    // console.log("el tipo texto: ", $('input[type=text]'));
    // let inputtxt = $('form#adv-search-form input[type=text]');
    // let idinput = $(this).parent().attr("data-idsvariables");
    // console.log("vars ",idinput,inputtxt);
    // console.log("test condition" + inputtxt.find(idinput));
    // if ($(this)){
    //   console.log("era tipo texto");
    // } else {
    // console.log("era de otro tipo");
    // };
    // var allInputs = $("form#adv-search-form :input")
    // var inputscheck = $('form#adv-search-form input[type=text]');
    let id_input = ($(this).parent().attr("data-idsvariables"));
    $(this).parent().remove();
      console.log("el id del input",id_input);
      console.log("ver el tipo del input ", $(id_input).is("[type=text]"));
      console.log("propiedad cehckbox ", $(this).prop('checked',false));
      if ($(id_input).is("[type=text]")) {
        $(id_input).val("");
      } else {
        $(this).prop('checked','false');
      }
      

    // console.log("variable", allInputs);
    // console.log("el tipo ", inputstxt);
    // console.log("el valor", inputstxt.val());

    // if () {

    // }
    // END AREA TEST

    // if(inputtxt.find(idinput)) {
    //   let del_input = ($(this).parent().attr("data-idsvariables"));
    //   $(this).parent().remove();
    //   $(del_input).val("");
    // }
    // else {
    //   console.log("input-checked: " + $('form#adv-search-form input[id$="-check"]').prop('checked'));
    // }
  });


  // $(".deletion").on("click",function( e ) {
  //   $(this).parent().remove();
  //   console.log("input-checked: " + $('input[id$="-check"]').prop('checked'));
  //   if($('input[id$="-check"]').prop('checked') == true) {
  //     ($(this).prop('checked',false));

  //   }
  })


// TRIGGER CLICK

