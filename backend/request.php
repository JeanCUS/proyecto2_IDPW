<?php
// Lee el contenido del archivo JSON
$jsonData = file_get_contents('db.json');

// Decodifica el JSON en un array asociativo
$imagesArray = json_decode($jsonData, true);

// Filtra solo los productos en descuento (offer > 0 y offer <= 1)
$discountedProducts = array_filter($imagesArray, function ($product) {
    return $product['offer'] > 0 && $product['offer'] <= 1;
});

// Devuelve el array de productos en descuento en formato JSON
header('Content-Type: application/json');
echo json_encode($discountedProducts);
?>
