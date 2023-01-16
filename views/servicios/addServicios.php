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

        <form id="formAddServicios">
            <div class="row">
                <div class="col-sm-8 ">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="inputGroupFile01">Comprobante de domicilio en PDF</label>

                                <div class="custom-file">
                                    <input id="file" type="file" name="file" class="custom-file-input" accept="application/pdf" onchange="showPdf(this)">
                                    <label id="fileLabel" class="custom-file-label" for="inputGroupFile01">Choose file</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <label>Cuenta con calle pavimentadas</label>
                            <select class="form-control" name="callesPavimentadas" aria-label="Floating label select example">
                                <option value="">seleccione su respuesta</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label>Cuenta con drenaje</label>
                            <select class="form-control" name="drenaje" aria-label="Floating label select example">
                                <option value="">seleccione su respuesta</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <label>Cuenta con biblioteca</label>
                            <select class="form-control" name="biblioteca" aria-label="Floating label select example">
                                <option value="">seleccione su respuesta</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label>Hay recoleccion de basura</label>
                            <select class="form-control" name="recoleccionBasura" aria-label="Floating label select example">
                                <option value="">seleccione su respuesta</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <label>Hay Alumbrado publico</label>
                            <select class="form-control" name="alumbradoPublico" aria-label="Floating label select example">
                                <option value="">seleccione su respuesta</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label>Cuenta con telefono publico</label>
                            <select class="form-control" name="telefonoPublico" aria-label="Floating label select example">
                                <option value="">seleccione su respuesta</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <label>Cuenta con transporte publico</label>
                            <select class="form-control" name="transportePublico" aria-label="Floating label select example">
                                <option value="">seleccione su respuesta</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label>Cuenta con red de agua potable</label>
                            <select class="form-control" name="aguaPotable" aria-label="Floating label select example">
                                <option value="">seleccione su respuesta</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <label>Hay juego o canchas deportivas</label>
                            <select class="form-control" name="juegosOCanchas" aria-label="Floating label select example">
                                <option value="">seleccione su respuesta</option>
                                <option value="si">Si</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <!--<div class="border border-primary bg-secondary w-75 h-75 p-3"></div>-->
                    <diV style="height: 90%; background-color: rgba(255,0,0,0.1);">
                        <iframe id="iframeContainer" class="w-100 h-100" src="" title="Evidencia">

                        </iframe>
                    </diV>
                </div>
            </div>

            <div class="row">
                <div class="col-sm">
                    <button class="btn btn-primary btn-user float-right">Siguiente</button>
                </div>
            </div>

        </form>
    </div>
    <script src="/educacion/js/index.js"></script>
    <script src="/educacion/js/servicios.js"></script>