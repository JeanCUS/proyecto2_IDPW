// router.js

// Función para cargar y mostrar los detalles de un producto
function loadProductDetails(productId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'backend/request.php'); // Ajusta la URL de la solicitud a tu backend PHP
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            // Encuentra el producto correspondiente por ID
            const product = response.find(product => product.id === productId);

            if (product) {
                // Rellena los detalles del producto en la página de detalles
                const productDetailsContainer = document.getElementById('product-details');
                if (productDetailsContainer) {
                    productDetailsContainer.innerHTML = `
                        <h2>${product.name}</h2>
                        <img src="${product.image}" alt="${product.name}">
                        <p>Descripción: ${product.description}</p>
                        <p>Precio: $${product.price}</p>
                        <button>Añadir al Carrito</button>
                    `;
                }
            } else {
                // Producto no encontrado
                console.error('Producto no encontrado');
            }
        }
    };
    xhr.send();
}

// Función principal de enrutamiento
function route() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        // Si hay un ID de producto en la URL, cargar los detalles del producto
        loadProductDetails(Number(productId));
    }
}

// Ejecuta la función de enrutamiento cuando se carga la página
route();
