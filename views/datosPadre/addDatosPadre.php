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

    <form id="formAddDatosPadre">
        <div class="form-group">
            <input type="text" class="form-control" name="nombre" placeholder="Nombre del Padre">
        </div>

        <div class="row">
            <div class="col-md-8">
                <div class="form-group">
                    <input type="text" class="form-control" name="telefono" placeholder="Telefono">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <input type="date" class="form-control" name="fechaNacimiento" placeholder="Fecha de Nacimiento">
                </div>
            </div>
        </div>

        <div class="form-group">
            <input type="text" class="form-control" name="curp" placeholder="Curp">
        </div>

        <div class="row">
            <div class="col-md-8">
                <div class="form-group">
                    <input type="text" class="form-control" name="calle" placeholder="Calle">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <input type="text" class="form-control" name="no" placeholder="#">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8">
                <div class="form-group">
                    <input type="text" class="form-control" name="colonia" placeholder="Colonia">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <input type="text" class="form-control" name="cp" placeholder="Cp">
                </div>
            </div>
        </div>

        <div class="form-group">
            <input type="text" class="form-control" name="municipio" placeholder="Municipio">
        </div>

        <div class="form-group">
            <label>Grado de Estudios</label>
            <select class="form-control" name="gradoEstudios" aria-label="Floating label select example">
                <option value=""></option>
                <option value="primaria">Primaria</option>
                <option value="secundaria">Secundaria</option>
                <option value="preparatoria">Preparatoria</option>
                <option value="universidad">Univesidad</option>
            </select>
        </div>

        <div class="row">
            <div class="col-md-5">
                <label>Trabajo en los Ulimos 6 meses</label>
                <select class="form-control" name="trabajo6Meses" aria-label="Floating label select example">
                    <option value=""></option>
                    <option value="si">Si</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div class="col-md-7">
                <label><br /></label>
                <div class="form-group">
                    <input type="text" class="form-control" name="motivoNoTrabajo" value="Sin motivo" placeholder="Motivo de no trabajo">
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>Cuenta con Seguro Medico</label>
            <select class="form-control" name="seguroMedico" aria-label="Floating label select example">
                <option value=""></option>
                <option value="ninguno">Ninguno</option>
                <option value="privado">Privado</option>
                <option value="seguro social">Seguro Social</option>
                <option value="IMSS">IMSS</option>
                <option value="ISSSTE">ISSSTE</option>
            </select>
        </div>


        <div class="col-auto">
            <button class="btn btn-primary btn-user float-right">Siguiente</button>
        </div>

    </form>
</div>

<script src="/educacion/js/index.js"></script>
<script src="/educacion/js/datosPadre.js"></script>