let tabMatchs = [];
const tabCol = ["index", "homeTeam", "score", "visitorTeam", "date"];

const buttonAjouter = document.querySelector("#buttonAjouter");

const submitAjouter = document.querySelector("#submitAjouter");
const submitLoadData = document.querySelector("#submitLoadData");
const submitModif = document.querySelector("#submitModif");

const formRecherche = document.querySelector("#formRecherche");
const formAjouter = document.querySelector("#formAjouter");


getJson("10", "1");