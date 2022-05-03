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
let chooseBoisson = document.querySelector(".typeBoisson");

const addButton = document.querySelector(".addButton");
const modifButton = document.querySelector(".modifButton");
const supprButton = document.querySelector(".supprButton");

const tabChaud = document.querySelector(".tabChaud");
const tabFroid = document.querySelector(".tabFroid");
const tabAlcool = document.querySelector(".tabAlcool");
const selectBoisson = document.querySelector(".test");

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
    this.type = "categorieFroid";
  }
}
// recuperation du localStorage
recupTableauStock()

// affichage des tableaux de stock
afficheStockFroid()
afficheStockChaud()
afficheStockAlcool()

// Récupération des données du formulaire avec le boutton "ajouter au stock"
formulaire.addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = new FormData(formulaire);

  console.log(selectBoisson.value);

  let nameGet = formData.get("choixBoisson");
  let quantityGet = formData.get("quantitéProduits");
  let prixAchatHTGet = formData.get("prixAchatHT");
  let prixVenteHTGet = formData.get("prixVenteHT");
  let degreeAlcoholGet = formData.get("degréAlcool");
  let choixBoissonChaudeGet = formData.get("inputChaud");
  let choixBoissonFroideGet = formData.get("inputFroid");

  console.log(nameGet);

  // Création de l'objet stock
  let stockInformations;
  if (selectBoisson.value == "choixAlcool") {
    console.log("1");
    stockInformations = new Stockalcool(
      nameGet,
      quantityGet,
      prixAchatHTGet,
      prixVenteHTGet,
      degreeAlcoholGet
    );
  } else if (selectBoisson.value == "choixChaud") {
    console.log("2");
    stockInformations = new StockChaud(
      nameGet,
      quantityGet,
      prixAchatHTGet,
      prixVenteHTGet,
      choixBoissonChaudeGet
    );
  } else if (selectBoisson.value == "choixFroide") {
    console.log("3");
    stockInformations = new StockFroid(
      nameGet,
      quantityGet,
      prixAchatHTGet,
      prixVenteHTGet,
      choixBoissonFroideGet
    );
  } else {
    console.log("4");
  }

  console.log(stockInformations);
  // Envoi de l'objet stock dans le tableau avec la méthode push
  arrayStock.push(stockInformations);
  console.log(arrayStock);

  // showStocks(formData);
  saveTableauStock();
});

// function showStocks(formData) {
// Création de la fonction show contact avec la méthode forEach

//   creation d un tableau pour afficher les stocks avec for each
// let tr = document.createElement("tr");

// let tdNomProduit = document.createElement("td");
// let tdQuantiteProduit = document.createElement("td");
// let tdPrixProduitAchat = document.createElement("td");
// let tdPrixProduitVente = document.createElement("td");
// let tdDegreeAlcohol = document.createElement("td");

// tr.appendChild(tdNomProduit);
// tr.appendChild(tdQuantiteProduit);
// tr.appendChild(tdPrixProduitAchat);
// tr.appendChild(tdPrixProduitVente);
// tr.appendChild(tdDegreeAlcohol);
// conData.appendChild(tr);

//   arrayStock.forEach(function (element) {
//     // Ajout à la variable content de mon élément
//     tdNomProduit.textContent = element.nomProduit;
//     tdQuantiteProduit.textContent = element.quantiteProduit;
//     tdPrixProduitAchat.textContent = element.prixProduitAchat;
//     tdPrixProduitVente.textContent = element.prixProduitVente;
//     tdDegreeAlcohol.textContent = element.degreeAlcohol;
//   });
// }

//fonction stocker notre tableau contact dans le localStorage
function saveTableauStock() {
  const JsontabStock = JSON.stringify(arrayStock); //tab => json
  localStorage.setItem("listeStock", JsontabStock); //envoy tab
}

//fonction recup de mon tableau du local storage
function recupTableauStock() {
  // RECUPERATION LOCAL STORAGE DANS VARIABLE
  let JsontabStock = JSON.parse(localStorage.getItem("listeStock")); // recup json => tab
  if (JsontabStock != "") {
    // arrayStock est egal au contenu du local
    arrayStock = JsontabStock;
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

function afficheStockFroid() {
  //Action de affiche Contact dans DIV .infoContact
  let ficheBoisson = "";

  arrayStock.forEach((element, index) => {

    if (element.type = "categorieFroid") { 
        // creer ma fiche a partir des elements du tableau
      ficheBoisson += `
      <div class="colonne flex">
      <div class="cellule">${element.quantiteProduit}</div>
      <div class="cellule">
        <a href="#containerProduit">${element.nomProduit}</a>
      </div>
      <div class="cellule">${element.categorieFroid}</div>
      <div class="cellule">
        <button id="boutonAjouter">
          <i class="fa-regular fa-circle-plus"></i>
        </button>
      </div>
      <div class="cellule">
        <button id="boutonSupprimer">
          <i class="fa-regular fa-circle-minus"></i>
        </button>
      </div>
    </div>
        `;
        
    } else { false }
    
  });
  tabFroid.innerHTML = ficheBoisson;
}

function afficheStockChaud() {
  //Action de affiche Contact dans DIV .infoContact
  let ficheBoisson = "";

  arrayStock.forEach((element, index) => {

    if (element.type = "categorieChaud") { 
        // creer ma fiche a partir des elements du tableau
      ficheBoisson += `
      <div class="colonne flex">
      <div class="cellule">${element.quantiteProduit}</div>
      <div class="cellule">
        <a href="#containerProduit">${element.nomProduit}</a>
      </div>
      <div class="cellule">${element.categorieChaud}</div>
      <div class="cellule">
        <button id="boutonAjouter">
          <i class="fa-regular fa-circle-plus"></i>
        </button>
      </div>
      <div class="cellule">
        <button id="boutonSupprimer">
          <i class="fa-regular fa-circle-minus"></i>
        </button>
      </div>
    </div>
        `;
        
    } else { false }
    
  });
  tabChaud.innerHTML = ficheBoisson;
}

function afficheStockAlcool() {
  //Action de affiche Contact dans DIV .infoContact
  let ficheBoisson = "";

  arrayStock.forEach((element, index) => {

    if (element.type = "degreeAlcohol") { 
        // creer ma fiche a partir des elements du tableau
      ficheBoisson += `
      <div class="colonne flex">
      <div class="cellule">${element.quantiteProduit}</div>
      <div class="cellule">
        <a href="#containerProduit">${element.nomProduit}</a>
      </div>
      <div class="cellule">${element.degreeAlcohol}</div>
      <div class="cellule">
        <button id="boutonAjouter">
          <i class="fa-regular fa-circle-plus"></i>
        </button>
      </div>
      <div class="cellule">
        <button id="boutonSupprimer">
          <i class="fa-regular fa-circle-minus"></i>
        </button>
      </div>
    </div>
        `;
        
    } else { false }
    
  });
  tabAlcool.innerHTML = ficheBoisson;
}
