
<?php $step = (int)$_GET["step"]?>
<ul id="navBarSolicitudHeader" class="nav nav-tabs">
  <li class="nav-item">
    <!-- href="../alumnos/addAlumno.php?step=0" -->
    <a class="nav-link <?php if($step === 0){ echo "active";}?>">Datos del Alumno</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 1){ echo "active";}?>" href="../escuelas/addEscuelas.php?step=1">Nombre y Datos de la Escuela</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 2){ echo "active";}?>" href="../datosPadre/addDatosPadre.php?step=2">Datos Padre o Tutor</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 3){ echo "active";}?>" href="../ingresosFamiliares/addIngresosFamiliares.php?step=3">Ingresos Familiares</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 4){ echo "active";}?>" href="../servicios/addServicios.php?step=4">Servicios</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 5){ echo "active";}?>" href="../requisitosAdicionales/addRequisitosAdicionales.php?step=5">Requisitos adicionales</a>
  </li>
  <li class="nav-item">
    <a class="nav-link <?php if($step === 6){ echo "active";}?>" href="../solicitudes/updateSolicitud.php?step=6">Finalizar Solicitud</a>
  </li>
</ul>