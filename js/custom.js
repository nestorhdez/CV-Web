//Object infinite scroll
function Scrollinfinite(callback){
  
  this.callback = callback;
  this.currentpage = 1;
  let hasLoaded = false;

  this.control = function (){
    
    const container = document.querySelector("#card-container");
    currentpage = 0;

    if (container.scrollHeight - container.scrollTop === container.clientHeight && !hasLoaded) {
      console.log("Llegó al final.");
      hasLoaded = false;
      this.callback(this.currentpage);
      console.log("Creado los 10 elementos.");
      this.currentpage += 1;
      return currentpage;
    }

  }.bind(this);

  this.initScroll = function () {
    
    const container = document.querySelector("#card-container");
    container.addEventListener("scroll", this.control);

  }

}