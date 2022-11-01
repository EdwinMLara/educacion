<?php
    require_once("../routers/solicitudesRouter.php");
    $api = new SolicitudesRouter();
    $api->processApi("SolicitudesRouter");
?>