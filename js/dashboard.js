const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo',
    'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const BECAS = {
    aceptadas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    rechazadas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pendientes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

const labels = MONTHS;


const data = {
    labels: labels,
    datasets: [
        {
            label: 'Aceptadas',
            data: BECAS.aceptadas,
            backgroundColor: '#59E03E'
        },
        {
            label: 'Rechazadas',
            data: BECAS.rechazadas,
            backgroundColor: '#FF2929'
        }
        ,
        {
            label: 'pendientes',
            data: BECAS.pendientes,
            backgroundColor: '#DDB14D'
        }
    ]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart'
            }
        }
    },
};

const ctxTest = document.getElementById('myChart').getContext('2d');
const chartTest = new Chart(ctxTest, config);

const BECASTOTALES = [0,0,0];

const dataPie = {
    labels: ['Aceptadas', 'Rechazadas', 'Pendientes'],
    datasets: [
      {
        label: 'Dataset 1',
        data: BECASTOTALES,
        backgroundColor:['#59E03E','#FF2929','#DDB14D']
      }
    ]
  };


const configPie = {
    type: 'pie',
    data: dataPie,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Pie Chart'
        }
      }
    },
  };

const ctxPie = document.getElementById('myPieChart').getContext('2d');
const chartPie = new Chart(ctxPie, configPie);

$(function () {
    console.log("dashboard");
    let dataRequest = {
        name: "getDataDashboard",
        param: {}
    }
    request('/educacion/Api/apiDashboard.php', dataRequest, function (res) {
        if (res.hasOwnProperty('error')) {
            let expiredToken = res.error.status;
            expiredToken === 301 ? location.href = `/educacion/views/login.php` : alert(res.error.message);
            return;
        }

        let datos = res.response.result[0];

        let usuarios = $('#dashboardUsuarios').empty();
        usuarios.append(datos.usuarios);
        let solicitudes = $('#dashboardSolicitudes').empty();
        solicitudes.append(datos.solicitudes);

        let revisadas = $('#dashboardRevisadas').empty();
        let pendientesParse = parseInt(datos.pendientes);
        let solicitudesParse = parseInt(datos.solicitudes);
        let porcentaje = solicitudesParse != 0 && pendientesParse != 0 ? parseInt((pendientesParse / solicitudesParse) * 100) : 0
        revisadas.append(`${100 - porcentaje}%`);
        $('#dashboardProgessBar').attr('style', `width: ${100 - porcentaje}%`);

        let pendientes = $('#dashboardPendientes').empty();
        pendientes.append(datos.pendientes);

    }, token);

    let dataRequestSolicitudes = {
        name: 'getSolicitudes',
        param: {}
    }

    request('/educacion/Api/apiSolicitudes.php', dataRequestSolicitudes, function (res) {

        let solicitudes = res.response.result;
        let sortedDates = solicitudes.reduce((acumulador, solicitud) => {

            let strDate = solicitud.fecha

            if (strDate.localeCompare('NO-REGISTRADO') == 0)
                return;

            let status = solicitud.status;
            let indice = undefined;
            let dateMonth = new Date(strDate).getMonth();

            switch (true) {
                case dateMonth >= 0 && dateMonth < 1:
                    indice = 0;
                    break;
                case dateMonth >= 1 && dateMonth < 2:
                    indice = 1;
                    break;
                case dateMonth >= 2 && dateMonth < 3:
                    indice = 2;
                    break;
                case dateMonth >= 3 && dateMonth < 4:
                    indice = 3;
                    break;
                case dateMonth >= 4 && dateMonth < 5:
                    indice = 4;
                    break;
                case dateMonth >= 5 && dateMonth < 6:
                    indice = 5;
                    break;
                case dateMonth >= 6 && dateMonth < 7:
                    indice = 6;
                    break;
                case dateMonth >= 7 && dateMonth < 8:
                    indice = 7;
                    break;
                case dateMonth >= 8 && dateMonth < 9:
                    indice = 8;
                    break;
                case dateMonth >= 9 && dateMonth < 10:
                    indice = 9;
                    break;
                case dateMonth >= 10 && dateMonth < 11:
                    indice = 10;
                    break;
                case dateMonth >= 11 && dateMonth < 12:
                    indice = 11;
                    break;
                default:
                    console.log("Error de fecha");
            }

            console.log(indice);

            status.localeCompare('aceptada') == 0 && acumulador.aceptadas[indice]++;
            status.localeCompare('rechazada') == 0 && acumulador.rechazadas[indice]++;
            status.localeCompare('pendiente') == 0 && acumulador.pendientes[indice]++;

            return acumulador;
        }, BECAS);

        const aceptadasTotales = BECAS.aceptadas.reduce((aceptadas,aceptada) => aceptadas + aceptada);
        const rechazadasTotales = BECAS.rechazadas.reduce((rechazadas,rechazada) => rechazadas + rechazada);
        const pendientesTotales = BECAS.pendientes.reduce((pendientes,pendiente) => pendientes + pendiente);

        BECASTOTALES[0] = aceptadasTotales;
        BECASTOTALES[1] = rechazadasTotales;
        BECASTOTALES[2] = pendientesTotales;

        console.log(BECASTOTALES)

        chartTest.update();
        chartPie.update();
        console.log(sortedDates)
    }, token);
});
