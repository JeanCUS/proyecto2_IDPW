const carousel = document.querySelector('.carousel');
let numImages = 5; // Número inicial de imágenes en el carrusel
let currentIndex = 0;
let imagesArray = []; // Array para almacenar los productos en descuento obtenidos de PHP

function createProduct(productObj) {
    // Crea una representación visual del producto con un enlace a la página de detalles
    const productContainer = document.createElement('div');
    productContainer.classList.add('product-container');

    const productLink = document.createElement('a');
    productLink.href = `product-details.html?id=${productObj.id}`; // Agrega el enlace con el ID del producto
    
    productLink.addEventListener('click', (e) => {
        e.preventDefault(); // Evita la navegación predeterminada
    });

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
    productLink.appendChild(productDescription);
    productLink.appendChild(productPrice);

    productContainer.appendChild(productLink);

    return productContainer;
}

function showProducts(startIndex) {
    const products = imagesArray.map(createProduct);
    console.log(products);
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

// Función para cargar productos desde PHP de forma asincrónica
function loadProductsFromPHP() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'backend/request.php'); // Ajusta la URL de la solicitud a tu backend PHP
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);

            // El backend ahora devuelve solo productos en descuento
            imagesArray = response;
            numImages = imagesArray.length; // Actualiza el número de productos en descuento
            showProducts(currentIndex); // Muestra los productos después de cargarlos
        }
    };
    xhr.send();
}

// Cargar productos desde PHP al cargar la página
loadProductsFromPHP();
