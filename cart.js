const cartItemsList = document.querySelector(".cart-items");
const totalAmount = document.getElementById("total-amount");
let cart = [];


let products = []; // Aquí almacenaremos la lista de productos.

// solicitud para obtener la lista de productos desde JSON.
function fetchProducts() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "backend/request.php");

  xhr.onload = function () {
    if (xhr.status === 200) {
      products = JSON.parse(xhr.responseText);
     
    } else {
      console.error("Error al cargar la lista de productos.");
    }
  };

  xhr.send();
}

// cargar la lista de productos.
fetchProducts();
function addToCart(productId) {
  var resultado = window.confirm("¿seguro que quiere agregar el producto al carrito?");
  if (resultado) {
    const product = products.find((item) => item.id === productId);
    if (product) {
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      updateCartOnServer(cart);
      window.alert('Se agregó al carrito :)')
    } else {
      console.log("Producto no encontrado");
    }
  }else{
    window.alert('No se agregó al carrito')
  }

  
}

loadCartFromJSON();

// Cargar datos del archivo JSON al array "cart"
function loadCartFromJSON() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "backend/cart.json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      cart = JSON.parse(xhr.responseText);
    } else {
      console.error("Error al cargar el carrito desde el archivo JSON.");
    }
  };

  xhr.send();
}

function updateCartOnServer(cartData) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "backend/update-cart.php"); 

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Carrito actualizado en el servidor.");
    } else {
      console.error("Error al actualizar el carrito en el servidor.");
    }
  };

  xhr.send(JSON.stringify(cartData));
}
