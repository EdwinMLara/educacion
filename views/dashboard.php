<?php

//El login es parcial despues de va agregar su funcion
$login = true;


// Si no esta loggeado mostrar login
if(!$login){
    require_once("./views/login.php");
    return;
}


// Si esta loggeado mostrar panel de administracion
if ($login) {
    // Cargando Header
    require_once("./share/header.php");

    // Cargando SideBar
    require_once("./share/sideBar.php");

    // Cargando navbar
    require_once("./share/nav.php");
?>

<!-- Begin Page Dashboard -->
<div class="container-fluid">

    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                class="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
    </div>

    <!-- Content Row -->
    <div class="row">

</div>
<!-- /.container-fluid -->

<?php
    // Cargando Fooder
    require_once("./share/footer.php");
    return;
}
?>