// récupération de eleve.json en hrx
let getJson = async function () {
    let response = await httpRequest('aeleve.json');
    return JSON.parse(response);
}

function creationElement(parent, tabElments) {
    for (const element of tabElments) {
        const liElement = document.createElement('li');
        const spanElement = document.createElement('span');
        const titlePrenom = document.createElement('span');
        const divAge = document.createElement("div");
        const buttonDel = document.createElement("button");
        const input = document.createElement("input");
        const label = document.createElement("label");

        titlePrenom.classList.add("prenom", element.prenom);
        titlePrenom.innerText = element.prenom.toUpperCase() + " ";
        spanElement.innerText = element.nom + " ";

        divAge.classList.add("age", element.age);
        divAge.innerText = element.age;

        buttonDel.classList.add("button", element.nom);
        buttonDel.innerText = "Delete";

        input.setAttribute("type", "checkbox");
        input.setAttribute("id", "absent");
        input.setAttribute("name", element.nom);
        input.setAttribute("value", "absent");

        label.setAttribute("for", element.nom);
        label.classList.add("present", "absent", element.nom);
        label.innerHTML = "Absent"

        liElement.appendChild(spanElement);
        spanElement.append(titlePrenom, buttonDel, input, label)
        liElement.appendChild(divAge);
        parent.appendChild(liElement);

        titlePrenom.addEventListener("click", () => {
            divAge.classList.toggle("age");
        })

        buttonDel.addEventListener("click", () => {
            liElement.remove();
        })

        input.addEventListener("change", () => {
            if (label.classList.toggle("absent") === true) {
                label.innerHTML = "Absent"
                input.value = "absent"
            } else {
                label.innerHTML = "Présent"
                input.value = "present"
            }
        })
    }
}

function deleteUl() {
    document.querySelectorAll("li").forEach(e => e.parentNode.removeChild(e));
}

function createAddEventListner() {
    //partie pour ajouter un eleve et l'afficher
    const buttonSend = document.querySelector("#send")
    buttonSend.addEventListener("click", (event) => {
        event.preventDefault();
        let inputNom = document.querySelector("#nom");
        let inputPrenom = document.querySelector("#prenom");
        let inputAge = document.querySelector("#age");
        if (!(inputAge.value === "" || inputNom.value === "" || inputPrenom.value === "")) {
            let newEleve = {
                prenom: inputPrenom.value,
                nom: inputNom.value,
                age: inputAge.value
            }
            tableauEleves.push(newEleve);
            deleteUl();
            creationElement(ulElement, tableauEleves);
            inputAge.value = inputNom.value = inputPrenom.value = "";
        } else {
            toast.show()
        }
    })

    // partie pour rechercher un eleve 
    const buttonSearch = document.querySelector("#searchButton");
    buttonSearch.addEventListener("click", () => {
        event.preventDefault();
        let searchBarValue = document.querySelector("#searchBar").value;
        const result = tableauEleves.filter(eleve =>
            eleve.nom.toUpperCase().startsWith(searchBarValue.toUpperCase()))
        deleteUl();
        creationElement(ulElement, result);
        document.querySelector("#searchBar").value = "";
    })

    //partie pour valider l'appel
    const buttonValiderAppel = document.querySelector("#appel");
    buttonValiderAppel.addEventListener("click", () => {
        event.preventDefault();
        const tabPresent = document.querySelectorAll("input[value=present]");
        tabPresent.forEach(e => e.parentNode.parentNode.remove(e))
    })
}