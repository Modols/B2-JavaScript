const httpServices = (() => {
    function httpRequest(url, methode, sendData = null) {
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
    return {
        getJson: (nSize, nPage, sort = "date") => {
            tabMatchs = [];
            httpRequest(`https://js-ingesup-b2.herokuapp.com/matches?sort=${sort}&size=${nSize}&page=${nPage}`, "GET")
                .then(response => {
                    response.forEach(match => {
                        let matchTmp = new Match(match.id,
                            match.homeTeam,
                            match.visitorTeam,
                            match.date,
                            match.score);
                        tabMatchs.push(matchTmp);
                    });
                    createTableFromMatches(tabMatchs, tabCol);

                }).catch((errStat) => {
                    displayError(errStat);
                });
        },
        postJson: (json) => {
            httpRequest("https://js-ingesup-b2.herokuapp.com/matches", "POST", json)
                .then(() => {
                    displayValidateRequest();
                    document.querySelector("#formAjouter").classList.toggle("hidden");
                    getJsonByInput()
                }).catch(err => {
                    displayError(err);
                });
        },
        delJson: (id) => {
            httpRequest(`https://js-ingesup-b2.herokuapp.com/matches/${id}`, "DELETE")
                .then(() => {
                    displayValidateRequest();
                    getJsonByInput()
                }).catch(err => {
                    displayError(err);
                });
        },
        putJson: (id, json) => {
            httpRequest(`https://js-ingesup-b2.herokuapp.com/matches/${id}`, "PUT", json)
                .then(() => {
                    displayValidateRequest();
                    document.querySelector("#formModif").classList.toggle("hidden");
                    getJsonByInput()
                }).catch(err => {
                    displayError(err);
                });
        },
    };

})();