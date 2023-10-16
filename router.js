// router.js

// Función para cargar y mostrar los detalles de un producto
function loadProductDetails(productId) {
  const productDetailsContainer = document.getElementById("product-details");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "backend/request.php"); // No es necesario incluir el ID en la URL aquí
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const products = JSON.parse(xhr.responseText);
      const product = products.find((p) => p.id === productId);
      if (product) {
        // Rellena los detalles del producto en el contenedor
        productDetailsContainer.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image}" alt="${product.name}">
                    <p>Descripción: ${product.description}</p>
                    <p class='detalle-price'> <del>${
                      product.offer > 0 ? "$" + product.price : ""
                    }</del> ${
          product.offer
            ? " | $" +
              (product.price - product.price * product.offer).toFixed(2)
            : "$" + product.price
        }</p>
                    <button class="add-to-cart" data-product-id=${productId} onclick="addToCart(${productId})">Añadir al Carrito</button>
                `;
      } else {
        productDetailsContainer.innerHTML = "<p>Producto no encontrado</p>";
      }
    }
  };
  xhr.send();
}

// Función principal de enrutamiento
function route() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    // Si hay un ID de producto en la URL, cargar los detalles del producto
    loadProductDetails(Number(productId));
  }
}

// Ejecuta la función de enrutamiento cuando se carga la página
route();
