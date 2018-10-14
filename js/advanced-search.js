$("#search-btn").on("click", function() {
  var shown = $("#input-name").val();
  $(".area").append('<span class="badge">' + shown + "</span> ");
  shown = $("#city-option").val();
  $(".area").append('<span class="badge">' + shown + "</span> ");
  shown = $("#experience").val();
  $(".area").append('<span class="badge">' + shown + "</span> ");
  checkboxElements = new Array();
  var inputchecked = document.getElementsByTagName("input");
  for (var i = 0; i < inputchecked; i++) {
    if (inputchecked[i].checked == true) {
      checkboxElements.push(inputchecked[i]);
    }
  }

  // if ($("input[type=checkbox]").is(':checked')) {
  //   var check = $("#lang-2").html();
  //   $(".area").append('<span class="badge">' + check + "</span");
  // }
  // if ($("input[type=checkbox]").is(':checked')) {
  //   var check = $("#lang-3").html();
  //   $(".area").append('<span class="badge">' + check + "</span");
  // }
  // if ($("input[type=checkbox]").is(':checked')) {
  //   var checked = $("#html-check").html();
  //   $(".area").append('<span class="badge">' + check + "</span");
  // }
  // if ($("input[type=checkbox]").is(':checked')) {
  //   var checked = $("#html-check").html();
  //   $(".area").append('<span class="badge">' + check + "</span");
  // }
  // if ($("input[type=checkbox]").is(':checked')) {
  //   var checked = $("#html-check").html();
  //   $(".area").append('<span class="badge">' + check + "</span");
  // }
  // if ($("input[type=checkbox]").is(':checked')) {
  //   var checked = $("#html-check").html();
  //   $(".area").append('<span class="badge">' + check + "</span");
  // }
});

$("#adv-btn").on("click", function() {
  $(".area").hide();
});

$("#search-btn").on("click", function() {
  $(".area").show();
});
