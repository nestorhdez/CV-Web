$("#search-btn").on("click", function() {
  // for  text inputs
  var name = $("#validationname").val();
  $(".area").append('<span class="badge">' + name + "</span> ");
  var lastname = $("#validationlastname").val();
  $(".area").append('<span class="badge">' + lastname + "</span> ");
  var city = $("#validationCity").val();
  $(".area").append('<span class="badge">' + city + "</span> ");
  var street = $("#validationStreet").val();
  $(".area").append('<span class="badge">' + street + "</span> ");
  var state = $("#validationState").val();
  $(".area").append('<span class="badge">' + state + "</span> ");
  var zip = $("#validationZip").val();
  $(".area").append('<span class="badge">' + zip + "</span> ");
  var experience = $("#experience").val() + " years";
  $(".area").append('<span class="badge">' + experience + "</span> ");
  // for checkeable inputs
  var selectLanguage = $("#languages");
  var languages = selectLanguage.find("input[type=checkbox]");
  var selectSkill = $("#skills");
  var skills = selectSkill.find("input[type=checkbox]");
  
  for (input of languages) {
    // coge los inputs dentro del array language
    if ($(input).prop("checked") === true) {
      $(".area").append(
        '<span class="badge">' + $(input).prop("name") + "</span"
      );
    }
  }


  // console.log(selectLanguage.find('input[type=checkbox]'))
  // cada input ejecuta el siguiente código



  for (input of skills) {
    if ($(input).prop("checked") === true) {
      $(".area").append(
        '<span class="badge">' + $(input).prop("name") + "</span"
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
