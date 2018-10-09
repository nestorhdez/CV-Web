function takevalues() {
  $("form").on("submit", function(event) {
    console.log("submit send...");
    event.preventDefault();
    console.log($( this ));
    let form = $ ( this )[0];
    console.log(form.length);
    for (i=0; i<form.length; i++){
        console.log(form[i]);
        $(".form-control").value;
    }
    });
}

takevalues();
