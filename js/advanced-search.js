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
  var experience = $("#experience").val();
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
    "#experience"
  ];
  console.log("longvariables: " + variables.length + name + "name");

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

  // to print checkeable checkboxs
  for (input of languages) {
    if ($(input).prop("checked") === true) {
      $(".area").append(
        spans +
          "#languages=" +
          $(input).prop("id") +
          '">' +
          $(input).prop("value").toUpperCase() +
          deletion +
          finspans
      );
    }
  }
  for (input of skills) {
    if ($(input).prop("checked") === true) {
      $(".area").append(
        spans +
          "#skills=" +
          $(input).prop("id") +
          '">' +
          $(input).prop("value").toUpperCase() +
          deletion +
          finspans
      );
    }
  }

  // for deleting the inputs and checkboxes that were printed and also delete its value
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
      $("input[name=" + checkboxs + "]").prop("checked", false);
    }
    $("#search-btn").trigger("click");
  });
});

// To show the summary

