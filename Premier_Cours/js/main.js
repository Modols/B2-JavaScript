const ulElement = document.querySelector('body > ul');
const ulElementPresent = document.querySelector('#ulPresent');
let tabElevesPresent = [];
let toast = new Axentix.Toast();


getJson((response) => {
    tableauEleves = response;
    creationElement(ulElement, tableauEleves);
    createAddEventListner()
})