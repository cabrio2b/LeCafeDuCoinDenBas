/**
 * Récupérer les éléments du DOM / Création Variable
 */

// SELECTEUR
let divFormulaire = document.querySelector(".formulaire");
let bouttonShowForm = document.querySelector(".ajouterProduits");
let bouttonHideForm = document.querySelector(".xmark");

let formulaire = document.querySelector("#form");

let selectDrink = document.querySelector(".alcoolOuPas");
let inputAlcoolDegree = document.querySelector(".inputAlcoolDegree");

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

// Récupération des données du formulaire avec le boutton "ajouter au stock"
formulaire.addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = new FormData(formulaire);

  let nameGet = formData.get("name");
  let quantityGet = formData.get("quantity");
  let buyingPriceGet = formData.get("buyingPrice");
  let sellingPriceGet = formData.get("sellingPrice");
  let degreeAlcohol = formData.get("degreeAlcohol");

  // Création de l'objet stock
  let stockInformations = "";
  if (selectDrink.value == "avec") {
    stockInformations = new Stockalcool(
      nameGet,
      quantityGet,
      buyingPriceGet,
      sellingPriceGet,
      degreeAlcohol
    );
  } else {
    stockInformations = new Stock(
      nameGet,
      quantityGet,
      buyingPriceGet,
      sellingPriceGet
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

// bouton select fait apparaitre degree d'alcool ou pas
selectDrink.addEventListener("change", function () {
  if (selectDrink.value == "avec") {
    inputAlcoolDegree.style.display = "";
  } else if (selectDrink.value == "sans") {
    inputAlcoolDegree.style.display = "none";
  } else if (selectDrink.value == "chaudes") {
    inputAlcoolDegree.style.display = "none";
  } else {
  }
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
