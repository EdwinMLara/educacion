$(function () {
    console.log("dashboard");
    let dataRequest = {
        name:"getDataDashboard",
        param:{}
    }
    request('/educacion/Api/apiDashboard.php',dataRequest,function(res){
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
        let porcentaje = solicitudesParse != 0 && pendientesParse != 0 ? parseInt((pendientesParse/solicitudesParse)*100) : 0
        revisadas.append(`${100 - porcentaje}%`);
        $('#dashboardProgessBar').attr('style',`width: ${100 - porcentaje}%`);

        let pendientes = $('#dashboardPendientes').empty();
        pendientes.append(datos.pendientes);

    },token);
})


const MONTHS = ['January','February','March','April','May',
'June','July','August','September','October','November','December'];

const test = new Array(12);

for(let i=0;i<10;i++){
    i==3 ? test[i] = 10 : test[i] = 0;
}

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const labels = MONTHS;


const data = {
    labels: labels,
    datasets: [
        {
            label: 'Aceptadas',
            data: test,
            backgroundColor: '#59E03E',
        },
        {
            label: 'Rechazadas',
            data: test,
            backgroundColor: '#FF2929',
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
