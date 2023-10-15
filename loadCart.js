// Suponiendo que esta es la ruta correcta de tu archivo cart.json
const cartJsonURL = "backend/cart.json";

// Función para cargar los productos desde cart.json
function loadProductsFromJson() {
  fetch(cartJsonURL)
    .then((response) => response.json())
    .then((data) => {
      // Una vez que tengas los datos del archivo JSON, puedes procesarlos como necesites.
      // En este ejemplo, simplemente los almacenamos en la variable cart.
      cart = data;
      displayCartItems();
    })
    .catch((error) => {
      console.error("Error al cargar los productos desde cart.json", error);
    });
}

// Llama a la función para cargar los productos desde cart.json
loadProductsFromJson();

function displayCartItems() {
  while (cartItemsList.firstChild) {
    cartItemsList.firstChild.remove();
  }
  cart.forEach((product) => {
    const cartItem = createCartItemElement(product);
    cartItemsList.appendChild(cartItem);
  });

  updateTotalAmount();
}

function createCartItemElement(product) {
  const cartItem = document.createElement("li");
  cartItem.innerHTML = `
          <div class="cart-item">
              <img src="${product.image}" alt="${
    product.name
  }" class="cart-item-image" />
              <div class="cart-item-details">
                  <p class="cart-item-name">${product.name}</p>
                  <p class="cart-item-price">$${
                    product.price
                      ? product.price.toFixed(2)
                      : "Precio no disponible"
                  }</p>
                  <p class="cart-item-quantity">Cantidad: ${
                    product.quantity
                  }</p>
                  <button class="remove-button" data-product-id="${
                    product.id
                  }" onclick="removeFromCart('${product.id}')">Eliminar</button>
              </div>
          </div>
      `;

  return cartItem;
}

function removeFromCart(productId) {
    const index = cart.findIndex((product) => product.id === parseInt(productId));
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--; // Decrementa la cantidad del producto
            if((cart.length==1)&&(cart[index].quantity <= 0)) {
                console.log("No estabas loco")
                cart=[];    
            }
        } else {
            // Si la cantidad es 1, elimina el producto del carrito
            cart.splice(index, 1);
        }

        // Actualiza el carrito en el servidor
        updateCartOnServer(cart);

        displayCartItems(); // Actualiza la visualización del carrito
    }
}



function updateTotalAmount() {
  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  totalAmount.textContent = `$${total.toFixed(2)}`;
}

function buyCart() {
  // Aquí puedes implementar la lógica para realizar la compra del carrito
  // Por ejemplo, puedes enviar los detalles del carrito a un servidor
  // para procesar la compra y vaciar el carrito después de la compra exitosa.
  alert("Compra realizada con éxito");
  cart = [];
  displayCartItems();
}
