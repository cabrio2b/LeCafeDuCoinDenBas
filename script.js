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

const tabChaud = document.querySelector(".tabChaud"); // div tableau B. Chaude
const tabFroid = document.querySelector(".tabFroid"); // div tableau B. Froide
const tabAlcool = document.querySelector(".tabAlcool"); // div tableau B. Alcool

const boissonCommande = document.querySelector(".boissonCommande"); // div à commander
const boissonRupture = document.querySelector(".boissonRupture"); // div rupture
const suppBoisson = document.querySelector("#boutonSupprimerBoisson"); // button sup boisson
const boutonAjouter = document.querySelector("#boutonAjouter"); // button +1 => stock
const boutonSupprimer = document.querySelector("#boutonSupprimer"); // button -1 => stock

// require sur les types de boisson
const selectdegreAlcool = document.querySelector('select[name="degréAlcool"]');
const selectInputChaud = document.querySelector('select[name="inputChaud"]');
const selectInputFroid = document.querySelector('select[name="inputFroid"]');

const selectBoisson = document.querySelector(".selectTypeBoisson"); // ???????

let arrayStock;

recupTableauStock();

const conData = document.querySelector("#data");
let test = document.querySelector(".test");

// affichage des tableaux de stock
affichageStockComplet();

// Récupération des données du formulaire avec le boutton "ajouter au stock"
formulaire.addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = new FormData(formulaire);
  let nameGet = formData.get("choixBoisson");
  let quantityGet = formData.get("quantitéProduits");
  let prixAchatHTGet = formData.get("prixAchatHT");
  let prixVenteHTGet = formData.get("prixVenteHT");
  let degreeAlcoholGet = formData.get("degréAlcool");
  let choixBoissonChaudeGet = formData.get("inputChaud");
  let choixBoissonFroideGet = formData.get("inputFroid");

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
  // actualisation des tableaux de stock
  affichageStockComplet();

  // réinitialise le formulaire
  formulaire.reset();
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

// //BUTTON SUPRR SUR LA PARTIE LISTE BOISSON EN HAUT
// let deleteButtonArray = document.querySelector(".supprButton");
// deleteButtonArray.forEach(function (button, index) {
//   button.addEventListener("click", function () {
//     if (confirm("Voulez vous supprimer?")) {
//       // Supression de mon contact dans mon array
//       arrayStock.splice(index, 1);
//       // ResetItem notre localStorage
//       localStorage.setItem("listeStock", JSON.stringify(arrayContact));
//       // On relance l'affichage de notre tableau
//     } else {
//       false;
//     }
//   });
// });

/**
 *
 * Creation des Functions
 *
 */
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
    arrayStock = [];
  }
}
// selecteur choix CHAUD FROID
function changementType() {
  let type = document.getElementById("type").value;

  //pour selecteur Perso
  if (type == "choixAlcool") {
    optionAlcool.style = "display:block";
    selectdegreAlcool.setAttribute("required", true);
    optionChaud.style.display = "none";
    optionFroid.style.display = "none";
  } else if (type == "choixChaud") {
    optionChaud.style = "display:block";
    selectInputChaud.setAttribute("required", true);
    optionAlcool.style.display = "none";
    optionFroid.style.display = "none";
  } else {
    optionFroid.style = "display:block";
    selectInputFroid.setAttribute("required", true);
    optionChaud.style.display = "none";
    optionAlcool.style.display = "none";
  }
}
// Fonction Affichage Stock Boisson Froide
function afficheStockFroid() {
  //Action de affiche Contact dans DIV .infoContact
  let ficheBoisson = "";

  arrayStock.forEach((element, index) => {
    if (element.type == "categorieFroid" && element.quantiteProduit != 0) {
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
    } else {
      false;
    }
  });
  tabFroid.innerHTML = ficheBoisson;
}
// Fonction Affichage Stock Boisson Chaude
function afficheStockChaud() {
  //Action de affiche Contact dans DIV .infoContact
  let ficheBoisson = "";

  arrayStock.forEach((element, index) => {
    if (element.type == "categorieChaud" && element.quantiteProduit != 0) {
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
    } else {
      false;
    }
  });
  tabChaud.innerHTML = ficheBoisson;
}
// Fonction Affichage Stock Boisson alcoolisée
function afficheStockAlcool() {
  //Action de affiche Contact dans DIV .infoContact
  let ficheBoisson = "";

  arrayStock.forEach((element, index) => {
    if (element.type == "categorieAlcool" && element.quantiteProduit != 0) {
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
    } else {
      false;
    }
  });
  tabAlcool.innerHTML = ficheBoisson;
}
// Fonction Affichage Stock Boisson à commander
function afficheStockAlerteCommander() {
  //Action de affiche Contact dans DIV .infoContact
  let ficheBoisson = "";

  arrayStock.forEach((element, index) => {
    if (element.quantiteProduit <= 5 && element.quantiteProduit > 0) {
      // creer ma fiche a partir des elements du tableau
      ficheBoisson += `
      <li>${element.nomProduit} <span class="alerteTexte">(reste ${element.quantiteProduit} en stock)</span></li>
        `;
    } else {
      false;
    }
  });
  boissonCommande.innerHTML = ficheBoisson;
}
// Fonction Affichage Stock Rupture
function afficheStockAlerteRupture() {
  //Action de affiche Contact dans DIV .infoContact
  let ficheBoisson = "";

  arrayStock.forEach((element, index) => {
    if (element.quantiteProduit == 0) {
      // creer ma fiche a partir des elements du tableau
      ficheBoisson += `
        <li>${element.nomProduit}</li>
        <button id="boutonSupprimerBoisson">
          <i class="fa-regular fa-circle-minus"></i> Supprimer
        </button>
        `;
    } else {
      false;
    }
  });
  boissonRupture.innerHTML = ficheBoisson;

  //Action de supprimer la boisson du stock
  let suppBoissonData = document.querySelectorAll("#boutonSupprimerBoisson");
  //arr.forEach(callback, thisArg);
  suppBoissonData.forEach((element, index) => {
    console.log(index);
    element.addEventListener("click", function () {
      if (confirm("Voulez vous supprimer la boisson du stock ?")) {
        // Suppression de la li sur la quelle on a cliqué
        arrayStock.splice(index, 1);

        //affiche le tableau modifier
        afficheStockAlerteRupture();
        //stocker notre tableau modifier dans le localStorage
        saveTableauStock();
      } else {
        false;
      }
    });
  });
}
// Fonction Affichage des tableau Stock Complet
function affichageStockComplet() {
  afficheStockFroid();
  afficheStockChaud();
  afficheStockAlcool();
  afficheStockAlerteCommander();
  afficheStockAlerteRupture();
}

/**
 *
 * Creation des classes Stock
 *
 */
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
    this.type = "categorieAlcool";
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
    this.type = "categorieChaud";
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
