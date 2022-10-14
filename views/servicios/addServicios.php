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

    <form id="formAddSerivios">

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input type="checkbox" name="callesPavimentadas" aria-label="Checkbox for following text input">
                    <label>Calles pavimentadas</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="checkbox" name="drenaje" aria-label="Checkbox for following text input">
                    <label>Drenaje</label>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input type="checkbox" name="biblioteca" aria-label="Checkbox for following text input">
                    <label>Biblioteca</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="checkbox" name="recolecionBasura" aria-label="Checkbox for following text input">
                    <label>Recoleccion de Basura</label>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input type="checkbox" name="alumbradoPublico" aria-label="Checkbox for following text input">
                    <label>Alumbrado Publico</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="checkbox" name="telefonoPublico" aria-label="Checkbox for following text input">
                    <label>Telefono Publico</label>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input type="checkbox" name="transportePublico" aria-label="Checkbox for following text input">
                    <label>Transporte Publico</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <input type="checkbox" name="aguaPotable" aria-label="Checkbox for following text input">
                    <label>Agua Potable</label>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <input type="checkbox" name="juegoOCanchas" aria-label="Checkbox for following text input">
                    <label>Juego o Canchas</label>
                </div>
            </div>
            <div class="col-md-6">
            </div>
        </div>

        <div class="col-auto">
            <button class="btn btn-primary btn-user float-right">Siguiente</button>
        </div>

    </form>
</div>