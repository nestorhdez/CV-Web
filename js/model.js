class Model {
    
    constructor(url) {
         this._url = url;
    }

    get url(){
        return this._url;
    }

    getEntityApi ( callback ) {
        fetch(this.url)
        .then(res => res.json())
        .then(data => {
            callback(data);
        });
    }
} 