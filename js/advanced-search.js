$("#search-btn").on("click", function() {
  // for  text inputs
  var name = $("#validationname").val();
  var city = $("#validationCity").val();
  var lastname = $("#validationlastname").val();
  var street = $("#validationStreet").val();
  var state = $("#validationState").val();
  var zip = $("#validationZip").val();
  var experience = $("#experience").val() + " years";
  var spans = '<span class="badge badge-info">';
  var finspans = '</span>';
  var selectLanguage = $("#languages");
  var languages = selectLanguage.find("input[type=checkbox]");
  var selectSkill = $("#skills");
  var skills = selectSkill.find("input[type=checkbox]");
  var variables = [name, lastname, city, street, state, zip, experience];

  for (let i = 0; i < variables.length; i++) {
    $(".area").append( spans + variables[i] + finspans);
  }
  
  // $(".area").append( spans + name + "</span> ");
  // $(".area").append('<span class="badge badge-info">' + lastname + "</span> ");
  // $(".area").append('<span class="badge">' + city + "</span> ");
  // $(".area").append('<span class="badge">' + street + "</span> ");
  // $(".area").append('<span class="badge">' + state + "</span> ");
  // $(".area").append('<span class="badge">' + zip + "</span> ");
  // $(".area").append('<span class="badge">' + experience + "</span> ");
  // for checkeable inputs

  
  for (input of languages) {
    // coge los inputs dentro del array language
    if ($(input).prop("checked") === true) {
      $(".area").append(
        '<span class="badge badge-info">' + $(input).prop("name") + "</span>"
      );
    }
  }
  for (input of skills) {
    if ($(input).prop("checked") === true) {
      $(".area").append(
        '<span class="badge badge-info">' + $(input).prop("name") + "</span>"
      );
    }
  }
});

$("#adv-btn").on("click", function() {
  $(".area").hide();
});

$("#search-btn").on("click", function() {
  $(".area").show();
});
