<?php


//El login es parcial despues de va agregar su funcion
$login = true;


// Si no esta loggeado mostrar login
if (!$login) {
    require_once("./views/login.php");
    return;
}


// Si esta loggeado mostrar panel de administracion
if ($login) {
    // Cargando Header
    require_once("../share/header.php");

    // Cargando SideBar
    require_once("../share/sideBar.php");

    // Cargando navbar
    require_once("../share/nav.php");

    //cargando Modal
    require_once("./detallesSolicitudModal.php");

    //cargando Modal
    require_once("../share/modalConfirm.php");
?>

    <!-- Begin Page Content -->
    <div class="container-fluid">
        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Solicitudes</h1>
            <a href="/educacion/views/alumnos/addAlumno.php" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fa fa-plus-circle fa-sm text-white-50"></i> Nueva Solicitud</a>
        </div>

        <!-- DataTales Example -->
        <div class="card shadow mb-4">
            <div class="card-body">
                <div class="table-responsive">
                    <div id="dataTable_wrapper" class="dataTables_wrapper dt-bootstrap4">

                        <!-- Show a Search Row -->
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="dataTables_length" id="dataTables_length">
                                    <label>"Show"</label>
                                    <select id="selectPerPage" name="dataTable_length" class="custom-select custom-select-sm form-control form-control-sm">
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div id="dataTable_filter" class="dataTables_filter">
                                    <label>
                                        "Search"<input id="search" name="search" type="search" class="form-control form-control-sm">
                                    </label>
                                </div>
                            </div>
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
                                        <th>Promedio</th>
                                        <th id="solicitudesStatus">Status</th>
                                        <th></th>
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
                </div>
            </div>

        </div>
        <!-- /.container-fluid -->
    </div>
    <script src="../../js/index.js"></script>
    <script src="../../js/solicitud.js"></script>

<?php
    // Cargando Fooder
    require_once("../share/footer.php");
    return;
}
?>