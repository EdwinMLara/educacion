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
    <div class="container">
        <form id="formAddAlumnos">
            <div class="row">
                <div class="col-sm-8 ">
                    <div class="input-group mb-4">
                        <div class="custom-file">
                            <input id="file" type="file" name="file" class="custom-file-input" accept="application/pdf" onchange="showPdf(this)">
                            <label id="fileLabel" class="custom-file-label" for="inputGroupFile01">Choose file</label>
                        </div>
                    </div>

                    <div class="form-group mb-4">
                        <input type="text" class="form-control" name="curp" placeholder="Curp" onchange="checkIfCurpExist(this)">
                    </div>

                    <div class="form-group mb-4">
                        <input type="text" class="form-control" name="nombre" placeholder="Nombre de estudiante">
                    </div>

                    <div class="form-group mb-4">
                        <input type="date" class="form-control" name="fechaNacimiento" placeholder="Fecha de Nacimiento">
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
                    <button type="submit" class="btn btn-primary btn-user btn-block">
                        Registrar Alumno
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

<script src="/educacion/js/index.js"></script>
<script src="/educacion/js/alumnos.js"></script>