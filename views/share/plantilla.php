<?php
	date_default_timezone_set('America/Mexico_City');
	$version = date("Y") . date("m") . date("d") . rand(1, 1000);
	$title = "Educación";
	$logo_encabezado = "logo-dark-min.png";
	$logo_footer = "logo-light-min.png";
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<?php require_once('../../complementos/head.php'); ?>
</head>

<body class="homepage">
	<!-- Loader Start -->
	<div class="se-pre-con">
		<div class="spinner">
			<div class="triple-spinner"></div>
		</div>
	</div>
	<!-- Loader End -->
	<div id="current" class="main">
		<?php require_once('../../complementos/header.php'); ?>
		<!-- -->
		<section class="bread bread-banner">
			<div class="container">
				<div class="bread-detail text-center d-md-flex align-items-center justify-content-between">
					<h4 class="bread-title mb-3 mb-md-0" style="color:#fff;"><?php echo $title; ?></h4>
				</div>
			</div>
		</section>
		<!-- -->
		<section class="why-choose pb-30 m-4" id="TransparenciaPrincipal">
			<div class="container">
				<div class="p-4">
					<div class="text-center">
						<h2 class="main_title heading mb-15">Solicitud de Becas <span>Municipales</span> </h2>
					</div>
					<?php
						if($_SERVER['PHP_SELF'] != '/educacion/views/alumnos/addAlumno.php'){
							require_once("../share/solicitudHeader.php");
						}
					?>
					<div id="injectedForm"> 
						
					</div>
				</div>
			</div>
		</section>
		<?php require_once('../../complementos/footer.php'); ?>
	</div>
	<?php require_once('../../complementos/script.php'); ?>
</body>

</html>