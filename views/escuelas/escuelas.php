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

    // Cargando navbar
    require_once("../share/nav.php");
?>

    <!-- Begin Page Content -->
    <div class="container-fluid">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Escuelas</h1>
            <a href="./addescuelas.php" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"> Agregar</a>
        </div>

        <!-- DataTales Example -->

        <!-- DataTables -->

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
                                        <option value="15">20</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div id="dataTable_filter" class="dataTables_filter">
                                    <label>
                                        "Search"<input type="search" name="search" class="form-control form-control-sm">
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Datos de la tabla -->
                        <div class="row">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                <thead>
                                    <tr>                                        
                                        <th>Nombre</th>
                                        <th>Calle</th>
                                        <th>#</th>
                                        <th>Colonia</th>
                                        <th>Municipio</th>
                                        <th>Telefono</th>
                                        <th>Tipo Institucion</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="bodyEscuelasTable">

                                </tbody>
                            </table>
                        </div>


                        <!-- /Paguinador row -->
                        <div id="paginador" class="row">
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>


    </div>
    <!-- /.container-fluid -->
    <script src="/educacion/js/escuelas.js"></script>

<?php
    // Cargando Fooder
    require_once("../share/footer.php");
    return;
}
?>