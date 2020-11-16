//version promise//

let httpRequest = function (url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status === 200) {
                    resolve(this.responseText);

                } else {
                    reject(this.status, this.statusText);
                }
            }
        }
        xhr.open('GET', url, true);
        xhr.send(null);
    })

};
