<?php
    spl_autoload_register(function($className){
        $path = $className.".php";
        echo "Ruta    ".$path."<br/>";
        if(file_exists($path)){
            require_once($path);
        }else{
            echo "Archivo $path no encontrado";
        }
    })
?>