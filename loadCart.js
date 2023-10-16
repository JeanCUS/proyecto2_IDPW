const cartJsonURL = "backend/cart.json";

// Función para cargar los productos desde cart.json
function loadProductsFromJson() {
  fetch(cartJsonURL)
    .then((response) => response.json())
    .then((data) => {
      cart = data;
      displayCartItems();
    })
    .catch((error) => {
      console.error("Error al cargar los productos desde cart.json", error);
    });
}

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
  console.log("json: " + product);
  cartItem.innerHTML = `
          <div class="cart-item">
            <img src="${product.image}" alt="${
    product.name
  }" class="cart-item-image" />
            <div class="cart-item-details">
              <p class="cart-item-name">${product.name}</p>
              <p class="cart-item-quantity">Cantidad: ${product.quantity}</p>
              <p class="cart-item-price"> <del>${
                product.offer > 0 ? "$" + product.price : ""
                }</del> ${product.offer
                  ? ' | $'+(product.price - product.price * product.offer).toFixed(2)
                  : '$'+product.price
              }</p>
            </div>
            <button class="remove-button" data-product-id="${
              product.id
            }" onclick="removeFromCart('${product.id}')">Eliminar</button>
          </div>
      `;

  return cartItem;
}

function removeFromCart(productId) {
  const index = cart.findIndex((product) => product.id === parseInt(productId));
  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      if (cart.length == 1 && cart[index].quantity <= 0) {
        console.log("No estabas loco");
        cart = [];
      }
    } else {
      
      cart.splice(index, 1);
    }

    
    updateCartOnServer(cart);

    displayCartItems(); 
  }
}
var totalGlobal = 0;
function updateTotalAmount() {
  const total = cart.reduce(
    (acc, product) => acc + (product.offer>0?(product.price - product.price * product.offer) : product.price ) * product.quantity,
    0
  );
  totalAmount.textContent = `$${total.toFixed(2)}`;
  totalGlobal = total;
}

function buyCart() {
  alert("Compra realizada con éxito");
  // cart = [];
  // displayCartItems();
}

// cuenta
// sb-4q1xy27779479@personal.example.com
// =%MM4de7
updateTotalAmount();
paypal
  .Buttons({
    style: {
      layout: "horizontal",
      color: "blue",
      shape: "pill",
      label: "pay",
    },

    createOrder: function (data, actions) {
      console.log("hola: " + totalGlobal);
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: parseFloat(totalGlobal.toFixed(2)),
            },
          },
        ],
      });
    },

    onApprove: function (data, actions) {
      actions.order.capture().then(function (detalles) {
        console.log("Detalles de la compra:", detalles);

        alert("Pago realizado");
        cart = [];
        updateCartOnServer(cart);
        displayCartItems();
        window.location.href = `index.html`;

      });
    },

    onCancel: function (data) {
      alert("Pago cancelado");
      console.log(data);
    },
  })
  .render("#paypal-button-container");
