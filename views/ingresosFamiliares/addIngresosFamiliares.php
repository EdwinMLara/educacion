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

    <input type="hidden" id="folio" value="<?php echo $_GET["folio"]; ?>">
    <div class="container">
        <form id="formIngresosFamiliares">
            <div class="row">
                <div class="col-sm-8 ">

                    <div class="form-group mb-4">
                        <label for="inputGroupFile01">Comprobante de ingresos</label>
                        <div class="custom-file">
                            <input id="file" type="file" name="file" class="custom-file-input" accept="application/pdf" onchange="showPdf(this)">
                            <label id="fileLabel" class="custom-file-label" for="inputGroupFile01">Selecciona el archivo</label>
                        </div>
                    </div>

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
                </div>

                <div class="col-sm-4">
                    <!--<div class="border border-primary bg-secondary w-75 h-75 p-3"></div>-->
                    <diV style="height: 90%; background-color: rgba(255,0,0,0.1);">
                        <iframe id="iframeContainer" loading="lazy" class="w-100 h-100" src="" title="Evidencia">

                        </iframe>
                    </diV>
                </div>
            </div>
            <div class="row">
                <div class="col-sm">

                    <div class="col-auto">
                        <button class="btn btn-primary btn-user float-right">Siguiente</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <script src="/educacion/js/index.js"></script>
    <script src="/educacion/js/ingresosFamiliares.js"></script>