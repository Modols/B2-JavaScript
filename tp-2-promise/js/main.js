const ulElement = document.querySelector('body > ul');
let toast = new Axentix.Toast('Remplissez tous les inputs', {
    classes: 'error rounded-2 shadow-2'
});
getJson().then(function (posts) {
    tableauEleves = posts;
}).catch(function (error, a) {
    console.log(error, a);
}).then(function () {
    console.log('fin des requests');
    creationElement(ulElement, tableauEleves);
    createAddEventListner()
})

