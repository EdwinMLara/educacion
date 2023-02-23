const MONTHS = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
const BECAS = {
    aceptadas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    rechazadas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    pendientes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};


const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const labels = MONTHS;


const data = {
    labels: labels,
    datasets: [
        {
            label: 'Aceptadas',
            data: BECAS.aceptadas,
            backgroundColor: '#59E03E',
        },
        {
            label: 'Rechazadas',
            data: BECAS.rechazadas,
            backgroundColor: '#FF2929',
        }
        ,
        {
            label: 'pendientes',
            data: BECAS.pendientes,
            backgroundColor: '#DDB14D',
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

        console.log(res);
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
        console.log(res);
        let solicitudes = res.response.result;
        let sortedDates = solicitudes.reduce((acumulador, solicitud) => {

            let date = solicitud.fecha

            if (date.localeCompare('NO-REGISTRADO') == 0)
                return;

            let status = solicitud.status;
            let indice = undefined;

            switch (true) {
                case new Date('2023-01-01') >= new Date(date) <= new Date('2023-02-01'):
                    indice = 0;
                    break;
                case new Date('2023-02-01') >= new Date(date) <= new Date('2023-03-01'):
                    indice = 1;
                    break;
                case new Date('2023-03-01') >= new Date(date) <= new Date('2023-04-01'):
                    indice = 2;
                    break;
                case new Date('2023-04-01') >= new Date(date) <= new Date('2023-05-01'):
                    indice = 3;
                    break;
                case new Date('2023-05-01') >= new Date(date) <= new Date('2023-06-01'):
                    indice = 4;
                    break;
                case new Date('2023-06-01') >= new Date(date) <= new Date('2023-07-01'):
                    indice = 5;
                    break;
                case new Date('2023-07-01') >= new Date(date) <= new Date('2023-08-01'):
                    indice = 6;
                    break;
                case new Date('2023-08-01') >= new Date(date) <= new Date('2023-09-01'):
                    indice = 7;
                    break;
                case new Date('2023-09-01') >= new Date(date) <= new Date('2023-10-01'):
                    indice = 8;
                    break;
                case new Date('2023-10-01') >= new Date(date) <= new Date('2023-11-01'):
                    indice = 9;
                    break;
                case new Date('2023-11-01') >= new Date(date) <= new Date('2023-12-01'):
                    indice = 10;
                    break;
                case new Date('2023-12-01') >= new Date(date) <= new Date('2023-12-31'):
                    indice = 11;
                    break;
                default:
                    console.log("Error de fecha");
            }


            status.localeCompare('aceptada') == 0 && acumulador.aceptadas[indice]++;
            status.localeCompare('rechazada') == 0 && acumulador.rechazadas[indice]++;
            status.localeCompare('pendiente') == 0 && acumulador.pendientes[indice]++;

            return acumulador;
        }, BECAS);

        chartTest.update();
        console.log(sortedDates)
    }, token);
});
