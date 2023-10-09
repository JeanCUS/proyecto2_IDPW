<?php
// Lee el contenido del archivo JSON
$jsonData = file_get_contents('db.json');

// Decodifica el JSON en un array asociativo
$imagesArray = json_decode($jsonData, true);

// Devuelve el arraylist de imágenes en formato JSON
header('Content-Type: application/json');
echo json_encode($imagesArray);
?>