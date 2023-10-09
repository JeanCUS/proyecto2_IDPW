const carousel = document.querySelector('.carousel');
let numImages = 5; // Número inicial de imágenes en el carrusel
let currentIndex = 0;
let imagesArray = []; // Array para almacenar las imágenes obtenidas de PHP

function createImage(imgObj) {
    const image = document.createElement('img');
    image.src = imgObj.image;
    image.alt = imgObj.name;
    image.addEventListener('click', () => {
        window.location.href = imgObj.link;
    });
    return image;
}

function showImages(startIndex) {
    const images = imagesArray.map(createImage);
    while (carousel.firstChild) {
        carousel.firstChild.remove();
    }

    for (let i = startIndex; i < startIndex + 3; i++) {
        const index = (i + numImages) % numImages;
        const image = images[index];
        carousel.appendChild(image);
    }
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % numImages;
    showImages(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + numImages) % numImages;
    showImages(currentIndex);
}

document.querySelector('.prev-button').addEventListener('click', prevSlide);
document.querySelector('.next-button').addEventListener('click', nextSlide);

// Función para cargar imágenes desde PHP de forma asincrónica
function loadImagesFromPHP() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'backend/request.php'); // Ajusta la URL de la solicitud a tu backend PHP
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            imagesArray = response; // Actualiza el array de imágenes con los datos de PHP
            numImages = imagesArray.length; // Actualiza el número de imágenes
            showImages(currentIndex); // Muestra las imágenes después de cargarlas
        }
    };
    xhr.send();
}

// Cargar imágenes desde PHP al cargar la página
loadImagesFromPHP();
