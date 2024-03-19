
<?php $step = (int)$_GET["step"]?>
<ul id="navBarSolicitudHeader" class="nav nav-tabs mb-4">
  <li class="nav-item">
    <!-- href="../alumnos/addAlumno.php?step=0" -->
    <a class="nav-link <?php if($step === 0){ echo "active";}?>">Datos del Alumno</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 1){ echo "active";}?>" href="#">Nombre y Datos de la Escuela</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 2){ echo "active";}?>" href="#">Datos Padre o Tutor</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 3){ echo "active";}?>" href="#">Ingresos Familiares</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 4){ echo "active";}?>" href="#">Servicios</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 5){ echo "active";}?>" href="#">Requisitos adicionales</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 6){ echo "active";}?>" href="#">Finalizar Solicitud</a>
  </li>
</ul>