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
function card() {
  let card = `
      <div class="card" style="width: 18rem;">
      <div class="card-body">
      <div class="mb-3">
              <img class="card-img-top w-25 p-1 d-inline  " src="images/1293744.svg" alt="Card image cap">
              <h5 class="card-title d-inline">Card title</h5>
              </div>
              <h6 class="card-subtitle mb-3 text-muted">Card subtitle</h6>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
          card's content.</p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
      </div>
      </div>`;
  container.innerHTML += card;
}
/**
 * @name createBoxes Function create "n" elements.
 * @param {number} num
 */
function createBoxes(num) {
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
    createBoxes(10);
    hasLoaded = false;
    console.log("Creado los 10 elementos.");
  }
});

console.log("This running.");
