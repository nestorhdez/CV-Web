$('.btn').on("click", function () {
    var shown = $('#input-name').val();
    console.log(shown);
    $('.area').append( '<span class="badge">' + shown + "</span> ");
    var shown = $('#city-option').val();
    $('.area').append( '<span class="badge">' + shown + "</span> ");
    var shown = $('#experience').val();
    $('.area').append( '<span class="badge">' + shown + "</span> ");
    var shown = $('input[name="language[]"]:checked').val();
    $('.area').append( '<span class="badge">' + shown + "</span> ");
    var shown = $('input[name="skilss[]"]:checked').val();
    $('.area').append( '<span class="badge">' + shown + "</span> ");
});

