const asyncGetJson = async function (nSize, nPage, sort = "date") {
    let response = await httpRequest(`https://js-ingesup-b2.herokuapp.com/matches?sort=${sort}&size=${nSize}&page=${nPage}`, "GET");
    return response;
}

const asyncPostJson = async function (json) {
    let response = await httpRequest("https://js-ingesup-b2.herokuapp.com/matches", "POST", json);
    return response;
}

const asyncDelJson = async function (id) {
    let response = await httpRequest(`https://js-ingesup-b2.herokuapp.com/matches/${id}`, "DELETE");
    return response;
}

const asyncPutJson = async function (id, json) {
    let response = await httpRequest(`https://js-ingesup-b2.herokuapp.com/matches/${id}`, "PUT", json);
    return response;
}

function getJson(size, page, sort) {
    tabMatchs = [];
    asyncGetJson(size, page, sort).then(response => {

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
}

function postJson(json) {
    asyncPostJson(json).then(() => {
        displayValidateRequest();
        document.querySelector("#formAjouter").classList.toggle("hidden");
        getJsonByInput()
    }).catch(err => {
        displayError(err);
    })
}

function delJson(id) {
    asyncDelJson(id).then(() => {
        displayValidateRequest();
        getJsonByInput()
    }).catch(err => {
        displayError(err);
    })
}

function putJson(id, json) {
    asyncPutJson(id, json).then(() => {
        displayValidateRequest();
        document.querySelector("#formModif").classList.toggle("hidden");
        getJsonByInput()
    }).catch(err => {
        displayError(err);
    })
}