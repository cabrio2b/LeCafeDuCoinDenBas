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
  // Création d'une variable content
  let content = "";
  arrayStock.forEach(function (element) {
    // Ajout à la variable content de mon élément
    content += `<p>${element.nomProduit}---- ${element.quantiteProduit}---- ${element.prixProduitAchat} <br />  ${element.prixProduitVente} <br />
         SINON ${element.type} </p>`;
  });
  test.innerHTML = content;
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
