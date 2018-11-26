// TRIGGER CLICK
$("#search-btn").trigger("renderUsers");

// Advanced search. When the user inserts his info, when the search button is clicked, it has to be printed in a div.

$("#search-btn").on("click", function() {
  $(".area").empty();
  var name = $("#input-name").val();
  var username = $("#validationusername").val();
  var email = $("#validationemail").val();
  var gender = $("#gender").val();
  var city = $("#city-option").val();
  var street = $("#validationStreet").val();
  var country = $("#validationCountry").val();
  var company = $("#validationcompany").val();
  var job = $("#validationjob").val();
  var experience = $("#experience-search").val();
  var spans = '<span class="badge badge-info mr-2 badge-font" ';
  var deletion =
    '<button class="bg-transparent border-0 deletion"><i class="fas fa-times-circle"></i></button>';
  var finspans = "</span>";
  var selectLanguage = $("#languages-search");
  var languages = selectLanguage.find("input[type=checkbox]");
  var selectSkill = $("#skills-search");
  var skills = selectSkill.find("input[type=checkbox]");
  var variables = [
    name,
    username,
    email,
    gender,
    city,
    street,
    country,
    company,
    job,
    experience
  ];
  var idsvariables = [
    "#input-name",
    "#validationusername",
    "#validationemail",
    "#gender",
    "#city-option",
    "#validationStreet",
    "#validationCountry",
    "#validationcompany",
    "#validationjob",
    "#experience-search"
  ];

  // to print text inputs
  for (let i = 0; i < variables.length; i++) {
    if (variables[i] != 0) {
      if (i == 9) {
        $(".area").append(
          spans +
            'data-idsvariables="' +
            idsvariables[i] +
            '">' +
            variables[i] +
            " year/s" +
            deletion +
            finspans
        );
      } else {
        $(".area").append(
          spans +
            'data-idsvariables="' +
            idsvariables[i] +
            '">' +
            variables[i] +
            deletion +
            finspans
        );
      }
    }
  }

  // to print checkboxs
  for (input of languages) {
    if ($(input).prop("checked") === true) {
      let textBadge = input.id.split('-')[1];
      console.log();
      $(".area").append(
        spans +
          "#languages-search=" +
          $(input).prop("id") +
          '">' +
          textBadge.toUpperCase() +
          deletion +
          finspans
      );
    }
  }
  for (input of skills) {
    if ($(input).prop("checked") === true) {
      let textBadge = input.id.split('-')[1];
      $(".area").append(
        spans +
          "#skills-search=" +
          $(input).prop("id") +
          '">' +
          textBadge.toUpperCase() +
          deletion +
          finspans
      );
    }
  }

  // for deleting the value of inputs and checkboxes that were printed
  $(".deletion").on("click", function(e) {
    e.preventDefault();
    let id_input = $(this)
      .parent()
      .attr("data-idsvariables");
    $(this)
      .parent()
      .remove();
    if ($(id_input).is("[type=text]") || $(id_input).is("[type=email]") || $(id_input).is("select")) {
      $(id_input).val("");
    } else {
      
      var checkboxs = $(this)
        .parent()
        .text().toLowerCase();
        console.log(checkboxs);
      $("input[id=" + 'search-' + checkboxs + "]").prop("checked", false);
    }
    $("#search-btn").trigger("click");
  });
});

// To delete the form when a button is clicked, also the badges and search again the users

$("#reset-btn").on("click", function() {
  $("#adv-search-form")[0].reset();
  $(".area").empty();
})

