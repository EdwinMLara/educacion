<?php


//El login es parcial despues de va agregar su funcion
$login = true;


// Si no esta loggeado mostrar login
if (!$login) {
    require_once("./views/login.php");
    return;
}


// Si esta loggeado mostrar panel de administracion
if ($login) {
    // Cargando Header
    require_once("../share/header.php");

    // Cargando navbar
    require_once("../share/nav.php");
?>

    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Agregar Instituciones</h1>
        </div>

        <form>
            <div class="form-group">
                <input type="text" class="form-control" name="nombre" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Nombre de la institucion...">
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                        <input type="text" class="form-control" name="calle" id="exampleInputPassword" placeholder="Calle">
                    </div>
                </div>
                <div class="col-md-4">
                <div class="form-group">
                        <input type="text" class="form-control" name="no" id="exampleInputPassword" placeholder="#">
                    </div>
                </div>
            </div>


            <a href="#" id="" class="btn btn-primary btn-user btn-block">
                Login
            </a>
        </form>

    <?php
    // Cargando Fooder
    require_once("../share/footer.php");
    return;
}
    ?>