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
  <div class="card mr-3 mb-3 card-user" style="width: 18rem;">
  <div class="card-body text-center">
      <div class="mb-3">
          <i class="fas fa-user mb-3" style="font-size: 2rem;"></i> <br>
          <h5 class="card-title d-inline user-name">Name</h5>
      </div>
      <div class="text-left">
          <h6 class="card-subtitle mb-3">Contact information</h6>
          <p class="card-text font-weight-bold">
              City: <span class="font-weight-normal">Adress</span><br>
              Email: <a href="mailto:mail">mail</a><br>
              Phone: <span class="font-weight-normal">Phone</span><br>
          </p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Card link</a>
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
