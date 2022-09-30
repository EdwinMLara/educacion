<?php
    //El login es parcial despues de va agregar su funcion
    $login = true;

    // Si no esta loggeado mostrar login
    if(!$login){
        require_once("./views/login.php");
        return;
    }

    header('Location: /educacion/views/dashboard.php');
?>
