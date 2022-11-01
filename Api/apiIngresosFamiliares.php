<?php
    require_once("../routers/ingresoFamiliaresRouter.php");
    $api = new IngresosFamiliaresRouter();
    $api->processApi("IngresosFamiliaresRouter");
?>