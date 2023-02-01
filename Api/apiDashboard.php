<?php
    require_once("../routers/DashboardRouter.php");
    $api = new DashboardRouter();
    $api->processApi("DashboardRouter");
?>