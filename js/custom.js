class ScrollInfinite {
  
  constructor( classCallback , callback) {
    this.classCallback = classCallback ; 
    this.callback = callback;
    this.currentpage = 1;
    this.hasLoaded = false;

  }
  
  control(){

    const container = document.querySelector("#card-container");

    if (container.scrollHeight - container.scrollTop === container.clientHeight && !this.hasLoaded) {
      this.hasLoaded = false;
      this.currentpage += 1;
      this.classCallback[this.callback](this.currentpage);
    }

  };

  initScroll() {
    const container = document.querySelector("#card-container");
    container.addEventListener("scroll", () => this.control());
  }

}