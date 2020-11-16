const httpRequest = function (url, methode, sendData = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                if (this.status >= 200 && this.status < 400) {
                    if (methode === "DELETE") {
                        resolve("true");
                    } else {
                        resolve(JSON.parse(this.responseText));
                    }
                } else {
                    reject(this.status + " " + this.statusText);
                }
            }
        }
        xhr.open(methode, url, true);
        if (sendData != null) {
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        }
        xhr.send(sendData);
    })
};
