const carousel = document.querySelector('.carousel');
let numImages = 5; // Número inicial de imágenes en el carrusel
let currentIndex = 0;
let imagesArray = []; // Array para almacenar los productos en descuento obtenidos de PHP

function createProduct(productObj) {
    
    // Crea una representación visual del producto con un enlace a la página de detalles
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');

    const productLink = document.createElement('a');
    productLink.href = `product-details.html?id=${productObj.id}`; // Aseg

    const productImage = document.createElement('img');
    productImage.src = productObj.image;
    productImage.alt = productObj.name;

    const productName = document.createElement('h3');
    productName.textContent = productObj.name;

    const productDescription = document.createElement('p');
    productDescription.textContent = productObj.description;

    const productPrice = document.createElement('p');
    productPrice.textContent = `Precio: $${productObj.price}`;

    productLink.appendChild(productImage);
    productLink.appendChild(productName);

    productContainer.appendChild(productLink);

    return productContainer;
}

function showProducts(startIndex) {
    const products = imagesArray.map(createProduct);
    while (carousel.firstChild) {
        carousel.firstChild.remove();
    }

    for (let i = startIndex; i < startIndex + 3; i++) {
        const index = (i + numImages) % numImages;
        const product = products[index];
        carousel.appendChild(product);
    }
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % numImages;
    showProducts(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + numImages) % numImages;
    showProducts(currentIndex);
}

document.querySelector('.prev-button').addEventListener('click', prevSlide);
document.querySelector('.next-button').addEventListener('click', nextSlide);

// ... (código del carrusel)

// Función para cargar y mostrar los productos en la sección de productos
function loadProducts() {
    const productSection = document.querySelector('.product-section');

    // Hacer una solicitud al backend para obtener la lista de productos
    fetch('backend/request.php')
        .then((response) => response.json())
        .then((products) => {
            // Procesar los datos y crear tarjetas de producto
            products.forEach((product) => {
                const productCard = createProductCard(product);
                productSection.appendChild(productCard);
            });
        })
        .catch((error) => {
            console.error('Error al cargar productos:', error);
        });
}

// Función para crear una tarjeta de producto
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.name;

    const productName = document.createElement('h3');
    productName.textContent = product.name;

    const productPrice = document.createElement('p');
    productPrice.textContent = `Precio: $${product.price}`;

    // Agrega los elementos al contenedor de la tarjeta
    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);

    // Agrega un evento de clic para redirigir a la página de detalles con el ID del producto
    productCard.addEventListener('click', () => {
        // Redirige a la página de detalles con el ID del producto como parámetro
        window.location.href = `product-details.html?id=${product.id}`;
    });

    return productCard;
}
// Llama a la función para cargar productos cuando la página se carga
window.addEventListener('load', loadProducts);


// Función para cargar productos desde PHP de forma asincrónica
function loadProductsFromPHP() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'backend/request.php'); // Ajusta la URL de la solicitud a tu backend PHP
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            // Filtra solo los productos en oferta para el carrusel
            imagesArray = response.filter((product) => product.offer > 0 && product.offer <= 1);
            numImages = imagesArray.length; // Actualiza el número de productos en descuento
            showProducts(currentIndex); // Muestra los productos de oferta en el carrusel
        }
    };
    xhr.send();
}


// Cargar productos desde PHP al cargar la página
loadProductsFromPHP();
