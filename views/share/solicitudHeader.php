
<?php $step = (int)$_GET["step"]?>
<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link <?php if($step === 0){ echo "active";}?>">Datos del Alumno</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 1){ echo "active";}?>">Nombre y Datos de la Escuela</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 2){ echo "active";}?>">Datos Padre o Tutor</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 3){ echo "active";}?>">Ingresos Familiares</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 4){ echo "active";}?>">Servicios</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 5){ echo "active";}?>">Requisitos adicionales</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 6){ echo "active";}?>">Finalizar Solicitud</a>
  </li>
</ul>