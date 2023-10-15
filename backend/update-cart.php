<?php
// Verifica que se haya recibido una solicitud POST con datos JSON.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Lee el JSON del cuerpo de la solicitud.
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if ($data !== null) {
        // Ruta al archivo cart.json
        $cartFilePath = 'cart.json'; // Asegúrate de especificar la ruta correcta.

        // Intenta escribir los datos en el archivo cart.json.
        if (file_put_contents($cartFilePath, json_encode($data)) !== false) {
            // Éxito: datos escritos en el archivo.
            echo 'Carrito actualizado en el servidor';
        } else {
            // Error al escribir en el archivo.
            http_response_code(500); // Error interno del servidor.
            echo 'Error al escribir en el archivo';
        }
    } else {
        // Si $data es nulo, esto podría indicar un carrito vacío.
        // Puedes implementar la lógica para manejarlo, como vaciar el carrito en el servidor.
        // Nota: En este ejemplo, no se borra el archivo JSON para manejar mejor el caso de carrito vacío.
        echo 'Carrito vacío en el servidor';
    }
} else {
    // Método no permitido.
    http_response_code(405); // Método no permitido.
    echo 'Método no permitido';
}
?>
