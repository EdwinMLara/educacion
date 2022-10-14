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

    <form id="formAddRequisitosAdicionales">

        <div class="form-group">
            <label>La escuela esta dentro del municipio</label>
            <select class="form-control" name="gradoEstudios" aria-label="Floating label select example">
                <option value="1">Si</option>
                <option value="0">No</option>
            </select>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label><br /></label>
                    <input type="text" class="form-control" name="tiempoTraslado" placeholder="Tiempo de Traslado">
                </div>
            </div>
            <div class="col-md-6">
                <label>Tipo de transporte</label>
                <select class="form-control" name="tipoTransporte" aria-label="Floating label select example">
                    <option value="1">Caminando</option>
                    <option value="0">Transporte publico</option>
                    <option value="0">Bicicleta</option>
                    <option value="0">Moto</option>
                    <option value="0">Carro</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Tipo de techo en casa</label>
                    <select class="form-control" name="tipoTechoCasa" aria-label="Floating label select example">
                        <option value="concreto">Concreto</option>
                        <option value="lamina">Lamina</option>
                        <option value="carton u otro">Carton u Otro</option>
                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>Cuenta con toma de agua</label>
                    <select class="form-control" name="aguaEnCasa" aria-label="Floating label select example">
                        <option value="en casa">En su casa</option>
                        <option value="comunitaria">Comunitaria</option>
                        <option value="no tiene">No tiene</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8">
                <label>Tipo material piso casa</label>
                <select class="form-control" name="tipoMaterialPisoCasa" aria-label="Floating label select example">
                    <option value="tierra">Tierra</option>
                    <option value="ladrillo o semento">Ladrillo o semento</option>
                </select>
            </div>
            <div class="col-md-4">
                <label>Cuenta con energia electrica</label>
                <select class="form-control" name="energiaElectricaCasa" aria-label="Floating label select example">
                    <option value="en casa">Si</option>
                    <option value="comunitaria">No</option>
                </select>
            </div>
        </div>

        <div class="row">
            <div class="col-md-8">
                <label>Tipo de material muros en casa</label>
                <select class="form-control" name="tipoMaterialMurosCasa" aria-label="Floating label select example">
                    <option value="ladrillo o block">Ladrillo o Block</option>
                    <option value="adobe, lamina o teja">Adobe, lamina o teja</option>
                    <option value="carton o madera">Carton o madera</option>
                </select>
            </div>
            <div class="col-md-4">
                <label>Recibe otro apoyo</label>
                <select class="form-control" name="recibeOtroApoyo" aria-label="Floating label select example">
                    <option value="1">Si</option>
                    <option value="0">No</option>
                </select>
            </div>
        </div>


        <div class="form-group mt-2">
            <input type="text" class="form-control" name="tipoApoyo" placeholder="Tipo de apoyo">
        </div>


        <div class="col-auto">
            <button class="btn btn-primary btn-user float-right">Finalizar</button>
        </div>

    </form>
</div>