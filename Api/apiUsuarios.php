<?php
    require_once("../routers/UsuariosRouter.php");
    require_once("../Config/Encryptation.php");
    require_once("../Modelos/Usuarios.php");
    
    $api = new UsuariosRouter();
    $api->processApi("UsuariosRouter");
    /**Se encripta una password para crear un usuario de desarrollo 
    $encrytedPassword = Encrytation::encrypt("admin","insoelKey");
    echo $encrytedPassword;
    */
    
?>