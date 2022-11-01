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


    <form id="formAddServicios">

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

        <div class="col-auto">
            <button class="btn btn-primary btn-user float-right">Siguiente</button>
        </div>

    </form>
</div>

<script src="/educacion/js/servicios.js"></script>