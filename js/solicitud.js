$(function () {
    console.log('solicitud');
    paginar(1);
});


$('#formUpdateSolicitud').validate({
    rules: {
        nivelEstudios: {
            required: true
        },
        promedioReciente: {
            required: true,
            min: 0,
            max: 10
        }
    },
    messages: {
        nivelEstudios: {
            required: 'Agrege el nivel de estudios'
        },
        promedioReciente: {
            required: 'tecle el promedio del perido pasado',
            min: 'agrege valor mayor a 0',
            max: 'agrege valor menor a 10'
        }
    },
    submitHandler: function (res) {
        console.log("================ Registrar solicitud de beca ===============");

        let dataUpdateSolicitud = {
            name: "updateSolicitud",
            param: getFormData($("#formUpdateSolicitud"))
        }

        console.log(dataUpdateSolicitud);
        request('/educacion/Api/apiSolicitudes.php', dataUpdateSolicitud, function (res) {
            console.log(res);
            if (res.hasOwnProperty('error')) {
                alert(res.error.message);
                return;
            }

            if (!res.response.status >= 200 && !res.response.status < 300) {
                mostrarRequestAlerResult(res.response.status);
                return;
            }

            let status = res.response.status;
            status ? location.href = alert('Se ha registrado su solicitud') : mostrarRequestAlerResult(status)
        });
    }
});


const paginar = (page) => {
    console.log("=============  Leer Usuarios Paginando =============");
    let perPage = $("#selectPerPage :selected").val();

    let data = {
        name: "getSolicitudesPaginate",
        param: {
            page,
            perPage
        }
    }


    console.log(data);

    request('/educacion/Api/apiSolicitudes.php', data, function (res) {
        console.log(res);

        if (res.hasOwnProperty('error')) {
            let expiredToken = res.error.status;
            expiredToken === 301 ? location.href = `/educacion/views/login.php` : alert(res.error.message);
            return
        }

        let numDatos = res.response.result.total;
        let solicitudes = res.response.result.solicitudes;

        window.localStorage.setItem('currentSolicitudes', JSON.stringify(solicitudes));

        let trHTML = '';
        solicitudes.forEach((solicitud, index) => {
            let alumno = solicitud.idAlumno.length > 0 ? solicitud.idAlumno[0].nombre : 'NO-REGISTRADO';
            let escuela = solicitud.idEscuela.length > 0 ? solicitud.idEscuela[0].nombre : 'NO-REGISTRADO';
            let padre = solicitud.idPadre.length > 0 ? solicitud.idPadre[0].nombre : 'NO-REGISTRADO';
            trHTML += '<tr>'
                + '<td>' + alumno + '</td>'
                + '<td>' + escuela + '</td>'
                + '<td>' + padre + '</td>'
                + '<td>' + solicitud.nivelEstudios + '</td>'
                + '<td>' + solicitud.promedioReciente + '</td>'
                + `<td class="d-flex justify-content-around">`
                + `<button type="button"  data-toggle="modal" data-target="#detallesSolicitudModal" onClick="detallesSolicitud(${index})" class="btn btn-info"><i class="fa fa-question fa-fw" aria-hidden="true"></i></button>`
                + `<button type="button"  onClick="print(${index})" class="btn btn-warning"><i class="fa fa-print fa-fw" aria-hidden="true"></i></button>`
                + '</td>'
                + '</tr>';
        });

        $('#bodySolicitudesTable').empty();
        $('#bodySolicitudesTable').append(trHTML);
        insertStrPaginador(numDatos, page, perPage, "paginar");
    });
}

/**se utiliza el indece para el arreglo current solicitudes */

const detallesSolicitud = (indiceSolicitud, step = 1) => {
    console.log('--------- Mostrar Destalles de Solicitud -------------');
    const solicitudes = JSON.parse(window.localStorage.getItem('currentSolicitudes'));
    console.log(solicitudes[indiceSolicitud]);

    let formHMTL = '<form class="formLogin" id="formLogin">';
    let finFormHTML = '</form> </div>';

    let disableButtonNext = "";
    let disableButtonBack = "";
    let detallesSolicitudToShow;

    $('#modalTitleSolicitud').empty();
    $('#modalBodySolicitud').empty();
    $('#modalFooterSolicitud').empty();

    console.log('step: ', step);

    if (step > 5)
        disableButtonNext = 'disabled';
    if (step < 2)
        disableButtonBack = 'disabled';
    
    let title = "";

    switch (step) {
        case 1:
            title = "Detalles solicitud Alumno"
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idAlumno[0];
            break;
        case 2:
            title = "Detalles solicitud Escuela"
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idEscuela[0];
            break;
        case 3:
            title = "Detalles solicitud Padre"
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idPadre[0];
            break;
        case 4:
            title = "Detalles solicitud Ingresos Familiares"
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idIngresosFamiliares[0];
            break;
        case 5:
            title = "Detalles solicitud Servicios"
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idServicios[0];
            break;
        case 6:
            title = "Detalles solicitud Requisitos Adicionales"
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idRequisitosAdicionales[0];
            break;
    }

    let buttonsHTML = `<button type="button" ${disableButtonBack} onclick="detallesSolicitud(${indiceSolicitud},${step - 1})" class="btn btn-secondary">Anterior</button>`
        + `<button type="button" ${disableButtonNext} onclick="detallesSolicitud(${indiceSolicitud},${step + 1})" class="btn btn-primary">Siguiente</button>`;


    $('#modalTitleSolicitud').append(title);
    $('#modalFooterSolicitud').append(buttonsHTML);

    if (detallesSolicitudToShow == undefined) {
        $('#modalBodySolicitud').append('NO-REGISTRADO');
        return;
    }

    Object.keys(detallesSolicitudToShow).forEach(function (key,index) {
        if(index === 0)
            return

        //console.log(key, detallesSolicitudToShow[key]);
        let inputHMTL = `<label>${key}</label>`
            + '<div class="form-group">'
            + `<input type="text" class="form-control form-control-user" name="${key}" value="${detallesSolicitudToShow[key]}">`
            + '</div>';
        formHMTL += inputHMTL;
    });

    formHMTL += finFormHTML;
    console.log(formHMTL);

    $('#modalBodySolicitud').append(formHMTL);
}

const print = async (indiceSolicitud) => {
    console.log('--------- Mostrar Destalles de Solicitud -------------');
    const solicitudes = JSON.parse(window.localStorage.getItem('currentSolicitudes'));
    createSolicitudPdf(solicitudes[indiceSolicitud]);
}