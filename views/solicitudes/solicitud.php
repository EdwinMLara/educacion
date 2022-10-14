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

    <form id="formAddUsuarios">
        <div class="form-group">
            <input type="text" class="form-control" name="nombre" placeholder="Nombre de estudiante">
        </div>
        <div class="form-group">
            <input type="date" class="form-control" name="fechaNacimiento" placeholder="Fecha de Nacimiento">
        </div>

        <div class="form-group">
            <input type="text" class="form-control" name="curp" placeholder="Curp">
        </div>

        <div class="form-group">
            <label>Nivel de Estudios</label>
            <select class="form-control" name="nivelEstudios" aria-label="Floating label select example">
                <option value="primaria">Primaria</option>
                <option value="secundaria">Secundaria</option>
                <option value="preparatoria">Preparatoria</option>
                <option value="universidad">Univesidad</option>
            </select>
        </div>

        <div class="form-group">
            <input type="text" class="form-control" name="promedioReciente" placeholder="Promedio Reciente">
        </div>

        <button type="submit" class="btn btn-primary btn-user btn-block">
            Registrar
        </button>
    </form>
</div>