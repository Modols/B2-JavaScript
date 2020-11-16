let httpRequest = function (url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status >= 200 && this.status < 400) {
                callback(this.responseText);
            } else {
                callback(null, this.status, this.statusText)
            }
        }
    }
    xhr.open('GET', url, true);
    xhr.send(null);
};