<?php
    require_once("../routers/serviciosRouter.php");
    $api = new ServiciosRouter();
    $api->processApi("ServiciosRouter");
?>