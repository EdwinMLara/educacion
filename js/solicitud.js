$(function () {
    console.log('solicitud');
    paginarSolicitudes(1);
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


const paginarSolicitudes = (page) => {
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
                + `<td><button type="button"  data-toggle="modal" data-target="#detallesSolicitudModal" onClick="detallesSolicitud(${index})" class="btn btn-info"><i class="fa fa-question" aria-hidden="true"></i></button><td>`
                + '</tr>';
        });

        $('#bodySolicitudesTable').empty();
        $('#bodySolicitudesTable').append(trHTML);
        insertStrPaginador(numDatos, page, perPage, "paginarSolicitudes");
    });
}

/**se utiliza el indece para el arreglo current solicitudes */

const detallesSolicitud = (indiceSolicitud) => {
    console.log('--------- Mostrar Destalles de Solicitud -------------');
    const solicitudes = JSON.parse(window.localStorage.getItem('currentSolicitudes'));
    console.log(solicitudes[indiceSolicitud]);

    let formHMTL = '<form class="formLogin" id="formLogin">';
    let finFormHTML = '</form> </div>';

    let detallesSolicitudAlumno = solicitudes[indiceSolicitud].idAlumno[0];
    Object.keys(detallesSolicitudAlumno).forEach(function (key) {
    
        console.log(key, detallesSolicitudAlumno[key]);
        let inputHMTL = `<label>${key}</label>` 
                    + '<div class="form-group">'
                    + `<input type="text" class="form-control form-control-user" name="${key}" value="${detallesSolicitudAlumno[key]}">`
                    + '</div>';
        formHMTL += inputHMTL;
    });

    formHMTL += finFormHTML;
    console.log(formHMTL);
    $('#modalBodySolicitud').empty();
    $('#modalBodySolicitud').append(formHMTL);
}