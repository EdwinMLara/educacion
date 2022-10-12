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
    require_once("./share/sideBar.php");

    // Cargando navbar
    require_once("../share/nav.php");
?>

    <div class="container-fluid">
        <div id="alert">

        </div>
        <!-- Page Heading -->
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Agregar Usuarios</h1>
        </div>

        <form id="formAddUsuarios">
            <div class="form-group">
                <input type="text" class="form-control" name="username" placeholder="Nombre de usuario...">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" name="password" placeholder="Contraseña">
            </div>

            <div class="form-group">
                <label>Tipo de Cuenta</label>
                <select class="form-control" name="tipoCuenta" aria-label="Floating label select example">
                    <option value="1" selected>Administrador</option>
                    <option value="2">Agente</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary btn-user btn-block">
                Agregar
            </button>
        </form>
        <script src="/educacion/js/usuarios.js"></script>
    <?php
    // Cargando Fooder
    require_once("../share/footer.php");
    return;
}
    ?>