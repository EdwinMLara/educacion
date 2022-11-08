<?php
$login = true;

if ($login) {
    // Cargando Header
    require_once("../share/header.php");

    // Cargando navbar
    require_once("../share/nav.php");
}
?>

<div class="container">
    <div id="alert"></div>

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

    <form id="formIngresosFamiliares">

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" class="form-control" name="ingresoPapa" placeholder="Ingresos Papa">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" class="form-control" name="ingresoMama" placeholder="Ingresos Mama">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" class="form-control" name="ingresoHermanos" placeholder="Ingresos Hermanos">
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="text" class="form-control" name="ingresoAbuelos" placeholder="Ingresos Abuelos">
                </div>
            </div>
        </div>

        <div class="form-group">
            <input type="text" class="form-control" name="personasDependientes" placeholder="Personas Dependientes de este ingreso">
        </div>


        <div class="col-auto">
            <button class="btn btn-primary btn-user float-right">Siguiente</button>
        </div>
        
    </form>
</div>

<script src="/educacion/js/index.js"></script>
<script src="/educacion/js/ingresosFamiliares.js"></script>