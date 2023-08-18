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
						<h2 class="main_title heading mb-15">Formato de aceptacion de Becas <span>Municipales</span> </h2>
					</div>
					<div> 
                        <input type="hidden" value="<?php echo $_GET['folio'];?>">
						<div class="d-flex justify-content-center"> 
							<button id="descargar" class="btn btn-primary btn-user mx-auto">
								Descargar Formato
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
		<?php require_once('../../complementos/footer.php'); ?>
	</div>
	<?php require_once('../../complementos/script.php'); ?>
</body>

</html>

<?php
    require_once("../share/headerPlantillaLibraries.php");
?>
<link href="/educacion/css/sb-admin-2.css" rel="stylesheet">
<link href="/educacion/css/validation.css" rel="stylesheet">

<script src="/educacion/js/index.js"></script>
<script src="/educacion/js/solicitud.js"></script>