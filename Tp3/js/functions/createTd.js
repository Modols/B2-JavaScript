function createTableFromMatches(tabMatchs, tabCol) {
    let h1 = document.querySelector("h1");
    if (h1) {
        h1.remove();
    }
    if (tabMatchs.length) {
        deleteHtmlElement("table")
        const tabColTitle = ["Index", "Home Team", "Score", "Visitor Team", "Date"];
        const table = document.querySelector("table");
        createColTr(tabColTitle, tabCol, table);
        tabMatchs.forEach((match, index) => {
            createRowTr(match, table, index);
        });
        tabCol.forEach(iterateEventListner);
        buttonsDelEventListnerCreator();
        buttonsModifEventListnerCreator();
    } else {
        displayError("Aucun matchs trouvé");
    }
}

function createColTr(tabTitle, tabValue, parent) {
    const valuePageData = document.querySelector("#pageData").value;
    const caption = document.createElement("caption");
    caption.innerText = "Listes des Matches page : " + valuePageData;

    const tr = document.createElement("tr");

    tabTitle.forEach((element, index) => {
        let th = document.createElement("th");
        th.scope = "col";
        th.innerText = element;
        createButton(tabValue[index], th);
        tr.appendChild(th);
    })
    parent.append(caption, tr);
}

function createButton(element, parent) {
    const buttonSort = document.createElement("button");
    const iSort = document.createElement("i");

    buttonSort.className = "sortButton";
    buttonSort.id = element;
    iSort.className = "fas fa-arrow-down";
    iSort.id = "asc";
    buttonSort.appendChild(iSort);
    parent.appendChild(buttonSort);
}

function createRowTr(match, parent, index) {
    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.scope = "row";
    th.innerText = index;
    th.id = match.id;
    tr.appendChild(th);

    for (const [key, value] of Object.entries(match)) {
        if (key != "vainqueur" && key != "looser" && key != "id") {
            const td = document.createElement("td");
            td.innerText = value;

            if (match.vainqueur == value) {
                td.className = 'vainqueur';
            } else if (match.looser == value) {
                td.className = 'looser';
            } else if (match.vainqueur == "Égalité" && (match.homeTeam == value || match.visitorTeam == value)) {
                td.className = "egalite";
            }
            tr.appendChild(td);
        }
    }

    let tabButtonModifAndDel = {
        "fas fa-edit": "modifier",
        "fas fa-trash-alt": "delete"
    };

    for (const [key, value] of Object.entries(tabButtonModifAndDel)) {
        let td = document.createElement("td");
        const button = document.createElement("button");
        const i = document.createElement("i")
        i.className = key;
        button.className = value;
        button.value = match.id;
        button.appendChild(i)
        td.appendChild(button);
        tr.appendChild(td);
    }

    parent.appendChild(tr);
}