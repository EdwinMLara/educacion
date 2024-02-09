<?php

//El login es parcial despues de va agregar su funcion
$login = true;


// Si esta loggeado mostrar panel de administracion
if ($login) {
    // Cargando Header
    require_once("../share/header.php");

    // Cargando SideBar
    require_once("../share/sideBar.php");

    // Cargando navbar
    require_once("../share/nav.php");

    //cargando modal que se utilizara como comfirm
    require_once("../share/modalConfirm.php");
?>

    <!-- Begin Page Dashboard -->
    <div class="container-fluid">

        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Reportes</h1>
            
            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                <div class="col-auto">
                    <select id="selectFormato" class="form-control" aria-label="Floating label select example">
                        <option value="pdf">Pdf</option>
                        <option value="excel">excel</option>
                    </select>
                </div>
                
                <a href="#" onclick="crearReporte()" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> imprimir</a>
            </div>
        </div>

        <!-- Content Row -->
        <div id="formFilters" class="mb-4">
        </div>

        <!-- Datos de la tabla -->
        <div class="row">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th>Alumno</th>
                                        <th>Escuela</th>
                                        <th>Padre</th>
                                        <th>Nivel Estudios</th>
                                    </tr>
                                </thead>
                                <tbody id="bodySolicitudesTable">

                                </tbody>
                            </table>
                        </div>

                        <!-- paginador -->
                        <div id="paginador" class="row">

                        </div>

    </div>
    <!-- /.container-fluid -->
    <script src="../../js/index.js"></script>
    <script src="../../js/reportes.js"></script>

<?php
    // Cargando Fooder
    require_once("../share/footer.php");
    return;
}
?>