<?php
    require_once("../routers/EscuelasRouter.php");
    $api = new EscuelaInstitucionRouter();
    $api->processApi("EscuelaInstitucionRouter");
?>