$("#search-btn").on("click", function() {
  var shown = $("#input-name").val();
  $(".area").append('<span class="badge">' + shown + "</span> ");
  shown = $("#city-option").val();
  $(".area").append('<span class="badge">' + shown + "</span> ");
  shown = $("#experience").val();
  $(".area").append('<span class="badge">' + shown + "</span> ");
  var check = $('input[name="language[]"]:checked').val();
  console.log("valor check: " + check);
  if (check == "on") {
    $(".form-check-label").append('<span class="badge">' + (label)'.innerHtml'); //me faltael contenido del label//
  } else if (check == "off") {
    $(".form-check-label").hide();
  }
  $(".area").append('<span class="badge">' + check + "</span> ");
  check = $('input[name="skilss[]"]:checked').val();
  $(".area").append('<span class="badge">' + shown + "</span> ");
});

$("#adv-btn").on("click", function() {
  $(".area").hide();
});

$("#search-btn").on("click", function() {
  $(".area").show();
});
