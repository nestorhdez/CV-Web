$("#search-btn").on("click", function() {
  var shown = $("#input-name").val();
  $(".area").append('<span class="badge">' + shown + "</span> ");
  shown = $("#city-option").val();
  $(".area").append('<span class="badge">' + shown + "</span> ");
  shown = $("#experience").val();
  $(".area").append('<span class="badge">' + shown + "</span> ");

  console.log($("input[type=checkbox]"));
  console.log($("input[type=checkbox]:checked").length);
  var checked = $("input[type=checkbox]:checked");
  console.log(checked[0].value);
  console.log($("input[type=checkbox]:checked").next("label").text());
  // convertir todo lo de abajo en un for o for.each
for (i = 0; i < 8;){
  if ($("input[type=checkbox]").is(':checked')) {
    var check = $(".form-check-label").html();
    $(".area").append('<span class="badge">' + i.val() + "</span");
  }
}


});

$("#adv-btn").on("click", function() {
  $(".area").hide();
});

$("#search-btn").on("click", function() {
  $(".area").show();
});


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