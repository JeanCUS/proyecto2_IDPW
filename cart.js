const cartItemsList = document.querySelector(".cart-items");
const totalAmount = document.getElementById("total-amount");
let cart = [];

// En tu script.js, puedes agregar el siguiente código para cargar la lista de productos desde tu archivo JSON o mediante una solicitud a tu backend.

let products = []; // Aquí almacenaremos la lista de productos.

// Realiza una solicitud para obtener la lista de productos desde tu JSON o backend.
function fetchProducts() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "backend/request.php"); // Asegúrate de que la URL sea la correcta.

  xhr.onload = function () {
    if (xhr.status === 200) {
      products = JSON.parse(xhr.responseText);
      // Puedes realizar otras operaciones una vez que tengas la lista de productos.
    } else {
      console.error("Error al cargar la lista de productos.");
    }
  };

  xhr.send();
}

// Llama a la función para cargar la lista de productos.
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

      // En lugar de guardar en local storage, realiza una solicitud al servidor para actualizar el archivo JSON.
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
  xhr.open("GET", "backend/cart.json"); // Asegúrate de que la URL sea la correcta.

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
  xhr.open("POST", "backend/update-cart.php"); // Asegúrate de que la URL sea la correcta y de que el servidor tenga un script para manejar esta solicitud.

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
