/**
 * Récupérer les éléments du DOM / Création Variable
 */
// selecteur choix
const option = document.querySelector(".option");
const choixAlcool = document.querySelector(".choixAlcool");
const choixChaud = document.querySelector(".choixChaud");
const choixFroide = document.querySelector(".choixFroide");

const optionAlcool = document.querySelector("#alcool");
const optionChaud = document.querySelector("#chaud");
const optionFroid = document.querySelector("#froid");
//

let formulaire = document.querySelector("#form");
let selectBoisson = document.querySelector(".typeBoisson");

const addButton = document.querySelector(".addButton");
const modifButton = document.querySelector(".modifButton");
const supprButton = document.querySelector(".supprButton");

let arrayStock = [];

const conData = document.querySelector("#data");
let test = document.querySelector(".test");

// création fonction constru stock
class Stock {
  constructor(nomProduit, quantiteProduit, prixProduitAchat, prixProduitVente) {
    this.nomProduit = nomProduit;
    this.quantiteProduit = quantiteProduit;
    this.prixProduitAchat = prixProduitAchat;
    this.prixProduitVente = prixProduitVente;
  }
}

class Stockalcool extends Stock {
  constructor(
    nomProduit,
    quantiteProduit,
    prixProduitAchat,
    prixProduitVente,
    degreeAlcohol
  ) {
    super(nomProduit, quantiteProduit, prixProduitAchat, prixProduitVente);
    this.degreeAlcohol = degreeAlcohol;
    this.type = degreeAlcohol;
  }
}

class StockChaud extends Stock {
  constructor(
    nomProduit,
    quantiteProduit,
    prixProduitAchat,
    prixProduitVente,
    categorieChaud
  ) {
    super(nomProduit, quantiteProduit, prixProduitAchat, prixProduitVente);
    this.categorieChaud = categorieChaud;
    this.type = categorieChaud;
  }
}

class StockFroid extends Stock {
  constructor(
    nomProduit,
    quantiteProduit,
    prixProduitAchat,
    prixProduitVente,
    categorieFroid
  ) {
    super(nomProduit, quantiteProduit, prixProduitAchat, prixProduitVente);
    this.categorieFroid = categorieFroid;
    this.type = categorieFroid;
  }
}

// Récupération des données du formulaire avec le boutton "ajouter au stock"
addButton.addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = new FormData(formulaire);

  let nameGet = formData.get("choixBoisson");
  let quantityGet = formData.get("quantitéProduits");
  let prixAchatHTGet = formData.get("prixAchatHT");
  let prixVenteHTGet = formData.get("prixVenteHT");
  let degreeAlcohol = formData.get("degréAlcool");

  // Création de l'objet stock
  let stockInformations = "";
  if (selectDrink.value == "avec") {
    stockInformations = new Stockalcool(
      nameGet,
      quantityGet,
      prixAchatHTGet,
      prixVenteHTGet,
      degreeAlcohol
    );
  } else {
    stockInformations = new Stock(
      nameGet,
      quantityGet,
      prixAchatHTGet,
      prixVenteHTGet
    );
  }

  // Envoi de l'objet stock dans le tableau avec la méthode push
  arrayStock.push(stockInformations);

  showStocks(formData);
});

function showStocks(formData) {
  // Création de la fonction show contact avec la méthode forEach

  //   creation d un tableau pour afficher les stocks avec for each
  let tr = document.createElement("tr");

  let tdNomProduit = document.createElement("td");
  let tdQuantiteProduit = document.createElement("td");
  let tdPrixProduitAchat = document.createElement("td");
  let tdPrixProduitVente = document.createElement("td");
  let tdDegreeAlcohol = document.createElement("td");

  tr.appendChild(tdNomProduit);
  tr.appendChild(tdQuantiteProduit);
  tr.appendChild(tdPrixProduitAchat);
  tr.appendChild(tdPrixProduitVente);
  tr.appendChild(tdDegreeAlcohol);
  conData.appendChild(tr);

  arrayStock.forEach(function (element) {
    // Ajout à la variable content de mon élément
    tdNomProduit.textContent = element.nomProduit;
    tdQuantiteProduit.textContent = element.quantiteProduit;
    tdPrixProduitAchat.textContent = element.prixProduitAchat;
    tdPrixProduitVente.textContent = element.prixProduitVente;
    tdDegreeAlcohol.textContent = element.degreeAlcohol;
  });
}

// faire apparaitre le formulaire on click
bouttonShowForm.addEventListener("click", function () {
  divFormulaire.style.display = "block";
});

// faire disparaitre le formulaire avec le boutton xmark
bouttonHideForm.addEventListener("click", function () {
  divFormulaire.style.display = "none";
});

//fonction stocker notre tableau contact dans le localStorage
function saveTableauStock() {
  const JsontabStock = JSON.stringify(arrayStock); //tab => json
  localStorage.setItem("listeStock", JsontabStock); //envoy tab
}

//fonction recup de mon tableau du local storage
function recupTableauContact() {
  // RECUPERATION LOCAL STORAGE DANS VARIABLE
  let JsontabStock = JSON.parse(localStorage.getItem("listeStock")); // recup json => tab
  if (JsontabStock != "") {
    // arrayStock est egal au contenu du local
    arrayStock = JsontabStock;
    showStocks();
  } else {
    false;
  }
}

// selecteur choix CHAUD FROID
function changementType() {
  let type = document.getElementById("type").value;

  //pour selecteur Perso
  if (type == "choixAlcool") {
    optionAlcool.style = "display:block";
    optionChaud.style.display = "none";
    optionFroid.style.display = "none";
  } else if (type == "choixChaud") {
    optionChaud.style = "display:block";
    optionAlcool.style.display = "none";
    optionFroid.style.display = "none";
  } else {
    optionFroid.style = "display:block";
    optionChaud.style.display = "none";
    optionAlcool.style.display = "none";
  }
}
