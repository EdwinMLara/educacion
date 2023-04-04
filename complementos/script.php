<script src="/educacion/assets/js/jquery-3.4.1.min.js"></script>
<!--<script src="../../../ajax/libs/tether/1.4.0/js/tether.min.js"></script>
<script src="../../../momentjs/latest/moment.min.js"></script>-->
<!--<script src="assets/js/daterangepicker.js"></script>-->
<script src="/educacion/assets/js/bootstrap.bundle.min.js"></script>
<script src="/educacion/assets/js/jquery.downCount.js"></script>
<!--<script src="assets/js/wow.min.js"></script>-->
<script src="/educacion/assets/js/fotorama.js"></script>
<script src="/educacion/assets/js/select2.full.min.js"></script>
<script src="/educacion/assets/js/jquery.card.js"></script>
<script src="/educacion/assets/js/animated-hedlines.js"></script>
<script src="/educacion/assets/js/simplebar.min.js"></script>
<script src="/educacion/assets/js/scrolling-nav.js"></script>
<script src="/educacion/assets/js/jquery-ui.min.js"></script>
<script src="/educacion/assets/js/jquery.counterup.min.js"></script>
<script src="/educacion/assets/js/waypoints.min.js"></script>
<script src="/educacion/assets/js/owl.carousel.min.js"></script>
<script src="/educacion/assets/js/custom.js"></script>
<script>
	/******************/
	var udateTime = function () {
		let currentDate = new Date(),
			hours = currentDate.getHours(),
			minutes = currentDate.getMinutes(),
			seconds = currentDate.getSeconds(),
			weekDay = currentDate.getDay(),
			day = currentDate.getDate(),
			month = currentDate.getMonth(),
			year = currentDate.getFullYear();
		const weekDays = [
			'Domingo',
			'Lunes',
			'Martes',
			'Miércoles',
			'Jueves',
			'Viernes',
			'Sabado'
		];
		document.getElementById('weekDay').textContent = weekDays[weekDay];
		document.getElementById('day').textContent = day;
		const months = [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		];
		document.getElementById('month').textContent = months[month];
		document.getElementById('year').textContent = year;
		document.getElementById('hours').textContent = hours;
		if (minutes < 10) {
			minutes = "0" + minutes
		}
		if (seconds < 10) {
			seconds = "0" + seconds
		}
		document.getElementById('minutes').textContent = minutes;
		document.getElementById('seconds').textContent = seconds;
	};
	udateTime();
	setInterval(udateTime, 1000);
</script>