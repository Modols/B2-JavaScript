function displayError(error) {
    const body = document.querySelector("#errorMessage");
    const spanElement = document.createElement('h1');
    spanElement.innerText = error;
    spanElement.classList.add("error");
    body.appendChild(spanElement);
}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

function deleteHtmlElement(parent) {
    const myNode = document.querySelector(parent);
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
    };
};

function iterateEventListner(element) {
    let hastagElmeent = "#" + element;
    let sortButton = document.querySelector(hastagElmeent);

    sortButton.addEventListener("click", () => {
        deleteHtmlElement("table");
        tabMatchs.sort(compareValues(element, sortButton.lastElementChild.id));
        createTableFromMatches(tabMatchs, tabCol);
        if (sortButton.lastElementChild.id === "asc") {
            let i = document.querySelector(hastagElmeent).lastElementChild;
            i.id = "desc";
            i.className = "fas fa-arrow-up";
        } else {
            let i = document.querySelector(hastagElmeent).lastElementChild;
            i.className = "fas fa-arrow-down";
            i.id = "asc";
        }
    })
}

function getAllInput(htmlElement) {
    let tabValue = [];

    tabValue.slice.call(htmlElement).forEach((el, i) => {
        if (el.value === "id") {
            tabValue.push(el.id);
        } else {
            tabValue.push(el.value);
        }
    });
    tabValue.pop();
    return tabValue;
}

function formatJson(tabHtmlElement, id = false) {
    if (tabHtmlElement.every(element => element != "")) {
        let formatScore = [tabHtmlElement[1], tabHtmlElement[3]];
        let formatDate = new Date(tabHtmlElement[4]).toISOString().split('.').shift() + 'Z';
        let json = {
            homeTeam: tabHtmlElement[0],
            visitorTeam: tabHtmlElement[2],
            score: formatScore,
            date: formatDate
        };
        if (id === false) {
            httpServices.postJson(JSON.stringify(json));
        } else {
            id = tabHtmlElement[5]
            json = Object.assign({ "id": id }, json);
            httpServices.putJson(id, JSON.stringify(json));
        }
    } else {
        demo(2000);
    }
}

function displayValidateRequest() {
    alert("votre requête a été prise en compte.");
}

function fillInputByMatch(input) {
    let idInputModif = document.querySelector('input[name="idInputModif"]');
    idInputModif.id = input.value;
    let match = tabMatchs.find(match => match.id === input.value);
    for (const [key, value] of Object.entries(match)) {
        let exist = document.querySelector(`input[name="${key}"]`);
        if (exist) {
            if (key === "date") {
                newValue = value.split('Z').shift()
                exist.value = newValue;
            } else {
                exist.value = value;
            }
        }
        if (key === "score") {
            for (let i = 0; i < 2; i++) {
                keyChange = key + "[" + i + "]";
                exist = document.querySelector(`input[name="${keyChange}"]`);
                exist.value = value[i];
            }
        }
    }
}

async function getJsonByInput() {
    let valueSizeData = document.querySelector("#sizeData").value;
    let valuePageData = document.querySelector("#pageData").value;
    let valueSelect = document.querySelector("#sort-select").value;
    if (valueSizeData != "" && valuePageData != "") {
        deleteHtmlElement("table");
        await httpServices.getJson(valueSizeData, valuePageData, valueSelect);
    } else {
        demo(2000);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo(ms) {
    displayError("Merci de remplir tous les champs");
    await sleep(ms);
    deleteHtmlElement("#errorMessage")
}