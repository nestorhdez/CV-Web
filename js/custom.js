let hasLoaded = false;
const container = document.querySelector("#card-container");

/**
 * @name sleep function to simulation waiting data.
 * @param {*} milliseconds
 */
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

/**
 *  @name card Constructor of one element.
 */
function card() { // <== createCard();
  let card = `
  <div class="card mr-3 mb-3 card-user shadow list-group-item-action" style="width: 18rem;">
    <div class="card-body text-center">
      <div class="d-flex flex-column justify-content-center mb-3">
        <div class="d-flex mx-auto profile-picture mb-1">
          <img class="img-user rounded-circle" src="../img/default-profile-picture.jpg">
        </div>
        <h5 class="card-title d-inline user-name">name</h5>
      </div>
      <div class="text-left">
      <h6 class="card-subtitle mb-3 text-center">Contact information</h6>
      <p class="m-0 city-user"><b>City: </b>address.city</p>
        <p class="m-0"><b>Email: </b><a href="mailto:email">email</a></p>
        <p><b>Phone: </b>phone</p>

        <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-info btn-sm">Edit</button>
            <button type="button" class="btn btn-info btn-sm" id="fulldata" data-toggle="modal" data-target="#ModalCenter">Detail</button>
            <button type="button" class="btn btn-primary btn-sm">Delete</button>
        </div>                 
      </div>
    </div>
  </div>`;
  container.innerHTML += card;
}
/**
 * @name createBoxes Function create "n" elements.
 * @param {number} num
 */
function createBoxes(num) {  // <= Mejorar el creador de tarjetas para poder renderizar por lote.
  const loader = document.querySelector("#loader");
  loader.classList.toggle("hide");
  console.log("Esperando a cargar...");
  sleep(1000);
  for (let i = 0; i < num; i++) {
    card();
  }
  console.log("Has llegado al final del contenido");
  hasLoaded = true;
  loader.classList.toggle("hide");
}

// TESTING //

// if ($(document).height() - win.height() === win.scrollTop()) {
/**
 * @event scroll Waiting for scrolling bottom of container.
 */
container.addEventListener("scroll", () => {
  console.log("Lisening...");

  // Determine if an element has been totally scrolled
  if (
    container.scrollHeight - container.scrollTop === container.clientHeight &&
    !hasLoaded
  ) {
    console.log("Llegó al final.");
    createBoxes(10); // <= Invocar el generador de tarjetas por lotes.
    hasLoaded = false;
    console.log("Creado los 10 elementos.");
  }
});

console.log("This running.");
