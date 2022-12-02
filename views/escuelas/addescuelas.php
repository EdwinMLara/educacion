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
}
?>

    <div class="container-fluid">

        <div id="alert">

        </div>

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Solicitud de Beca Municipal URIANGATO gto.</h1>
        </div>

        <div class="m-4">
            <?php
            require_once("../share/solicitudHeader.php");
            ?>
        </div>

        <input type="hidden" id="folio" value="<?php echo $_GET["folio"];?>">

        <form id="formAddEscuelas">
            <div class="form-group">
                <input type="text" class="form-control" name="nombre" placeholder="Nombre de la institucion...">
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="form-group">
                        <input type="text" class="form-control" name="calle" placeholder="Calle">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="text" class="form-control" name="no" placeholder="#">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="text" class="form-control" name="cp" placeholder="Cp">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" class="form-control" name="colonia" placeholder="Colonia">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" class="form-control" name="municipio" placeholder="Municipio">
                    </div>
                </div>
            </div>


            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" class="form-control" name="telefono" placeholder="Telefono">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" class="form-control" name="tipoInstitucion" placeholder="Tipo de Institucion">
                    </div>
                </div>
            </div>


            <button type="submit" class="btn btn-primary btn-user btn-block">
                Siguiente
            </button>
        </form>
    </div>

<script src="/educacion/js/index.js"></script>
<script src="/educacion/js/escuelas.js"></script>