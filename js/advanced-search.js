$("#search-btn").on("click", function() {
  $(".area").empty();
  var name = $("#validationname").val();
  var city = $("#validationCity").val();
  var lastname = $("#validationlastname").val();
  var street = $("#validationStreet").val();
  var state = $("#validationState").val();
  var zip = $("#validationZip").val();
  var experience = $("#experience").val();
  var spans = '<span class="badge badge-info mr-2 badge-font">';
  var deletion =
    '<button class="bg-transparent border-0 deletion"><i class="fas fa-times-circle"></i></button>';
  var finspans = "</span>";
  var selectLanguage = $("#languages");
  var languages = selectLanguage.find("input[type=checkbox]");
  var selectSkill = $("#skills");
  var skills = selectSkill.find("input[type=checkbox]");
  var variables = [name, lastname, city, street, state, zip, experience];
  console.log("longvariables: " + variables.length + name + "name");
  for (let i = 0; i < variables.length; i++) {
    if (variables[i] != 0) {
      if (i == 6) {
        $(".area").append(
          spans + variables[i] + " " + "year/s" + deletion + finspans
        );
      } else {
        $(".area").append(spans + variables[i] + deletion + finspans);
      }
    }
  }
  for (input of languages) {
    // coge los inputs dentro del array language
    if ($(input).prop("checked") === true) {
      $(".area").append(spans + $(input).prop("name") + deletion + finspans);
    }
  }
  for (input of skills) {
    if ($(input).prop("checked") === true) {
      $(".area").append(spans + $(input).prop("name") + deletion + finspans);
    }
  }
  // $(".deletion").on("click", function() {
  //   console.log("apretar boton");
  //   $(".badge").remove();
  // });
});

$("#adv-btn").on("click", function() {
  $(".area").hide();
});

$("#search-btn").on("click", function() {
  $(".area").show();
});
