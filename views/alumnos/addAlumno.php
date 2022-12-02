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
        <h1 class="h3 mb-0 text-gray-800">Alumno que solicita la beca municipal</h1>
    </div>

    <form id="formAddAlumnos">
        <div class="form-group">
            <input type="text" class="form-control" name="curp" placeholder="Curp">
        </div>

        <div class="form-group">
            <input type="text" class="form-control" name="nombre" placeholder="Nombre de estudiante">
        </div>

        <div class="form-group">
            <input type="date" class="form-control" name="fechaNacimiento" placeholder="Fecha de Nacimiento">
        </div>

        <button type="submit" class="btn btn-primary btn-user btn-block">
            Registrar Alumno
        </button>
    </form>
</div>

<script src="/educacion/js/index.js"></script>
<script src="/educacion/js/alumnos.js"></script>