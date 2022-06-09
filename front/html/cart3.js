var ListBasket = getBasket();

var ListBasketToDisplay;
var totalPrice = 0;
var totalProductQuantity = 0;



async function displayAllBasketproducts(ListBasket) {
    for (let i = 0; i < ListBasket.length; i++) {



        canapePrice = await asyncKanapTest(ListBasket, i); ///Question mentor ! Porquoi la fonction s'exécute alors que je la stocke dans une variable ? 


        ////Partie pour calculer le prix
        totalPrice += ListBasket[i].quantity * canapePrice;

        ///////////: Partie pour calculer laa quantité totale
        totalProductQuantity += parseInt(ListBasket[i].quantity);

    };
    let cartPrice = document.querySelector(".cart__price");
    cartPrice.innerHTML = `<p>Total (<span id="totalQuantity">${totalProductQuantity}</span> articles) : <span id="totalPrice">${totalPrice}</span> €</p>
    `

    ///////////////////changer la quantité de produit
    const selectElement = document.getElementsByClassName('itemQuantity');

    for (let i = 0; i < selectElement.length; i++) {
        selectElement[i].addEventListener('change', (event) => {

            let inputChange = selectElement[i].value;
            changeQuantity(ListBasket[i], inputChange);

        });
    }

    const itemToDelete = document.getElementsByClassName('deleteItem');

    for (let i = 0; i < itemToDelete.length; i++) {
        itemToDelete[i].addEventListener('click', (event) => {

            removeFromBasket(ListBasket[i]);


        });
    }



    //////////////////// supprimer un produit 


}

async function asyncKanapTest(ListBasket, i) {
    let response = await fetch(`http://localhost:3000/api/products/` + ListBasket[i]._id);
    let Canape = await response.json();

    let itemBasketArticle = document.querySelector("#cart__items");

    itemBasketArticle.innerHTML += AfficherCanapePageProduit(Canape, ListBasket[i].quantity, ListBasket[i].color);

    return Canape.price;



}



displayAllBasketproducts(ListBasket);


const AfficherCanapePageProduit = function(Canape, CanapeQuantity, CanapeColor) {
    let result = `<article class="cart__item" data-id="${Canape._id}" data-color="${CanapeColor}">
    <div class="cart__item__img">
      <img src="${Canape.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${Canape.name}</h2>
        <p>${CanapeColor}</p>
        <p>${Canape.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${CanapeQuantity}</p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${CanapeQuantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article> `;

    return result;
}