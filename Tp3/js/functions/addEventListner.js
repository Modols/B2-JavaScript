
buttonAjouter.addEventListener("click", () => {
    formAjouter.classList.toggle("hidden");
});

submitLoadData.addEventListener("click", (e) => {
    e.preventDefault();
    getJsonByInput();
});

submitAjouter.addEventListener("click", (e) => {
    e.preventDefault();
    let tabValue = getAllInput(formAjouter);
    formatJson(tabValue);
});

function buttonsDelEventListnerCreator() {
    const buttonsDel = document.querySelectorAll(".delete");
    buttonsDel.forEach((element) => {
        element.addEventListener("click", () => {
            if (confirm("voulez vous vraiment supprimer le match ?")) {
                delJson(element.value);
            };
        });
    });
};

function buttonsModifEventListnerCreator() {
    const buttonsModif = document.querySelectorAll(".modifier");
    const formModif = document.querySelector("#formModif");

    buttonsModif.forEach((element) => {
        element.addEventListener("click", () => {
            formModif.classList.toggle("hidden");
            fillInputByMatch(element);
        });
    });
};

submitModif.addEventListener("click", (e) => {
    e.preventDefault();
    let tabValue = getAllInput(formModif);
    formatJson(tabValue, true);
});
