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
    console.log("=============  Leer solicitudes Paginando =============");
    let perPage = $("#selectPerPage :selected").val();

    if (perPage === undefined)
        return;

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

        if (res.response.status === 204) {
            alert(res.response.result);
            return;
        }


        let numDatos = res.response.result.total;
        let solicitudes = res.response.result.solicitudes;

        window.localStorage.setItem('currentSolicitudes', JSON.stringify(solicitudes));

        let trHTML = '';
        solicitudes.forEach((solicitud, index) => {
            let alumno = solicitud.idAlumno.length > 0 ? solicitud.idAlumno[0].nombre : 'NO-REGISTRADO';
            let escuela = solicitud.idEscuela.length > 0 ? solicitud.idEscuela[0].nombre : 'NO-REGISTRADO';
            let padre = solicitud.idPadre.length > 0 ? solicitud.idPadre[0].nombre : 'NO-REGISTRADO';
            let colorStatus = "";

            const expr = solicitud.status;
            switch (solicitud.status) {
                case 'aceptada':
                    colorStatus = "bg-success"
                    break;
                case 'pendiente':
                    colorStatus = "bg-warning"
                    break;
                case 'rechazada':
                    colorStatus = "bg-danger"
                    break;
                default:
                    console.log(`Sorry, we are out of ${expr}.`);
            }

            trHTML += '<tr>'
                + '<td>' + alumno + '</td>'
                + '<td>' + escuela + '</td>'
                + '<td>' + padre + '</td>'
                + '<td>' + solicitud.nivelEstudios + '</td>'
                + '<td>' + solicitud.promedioReciente + '</td>'
                + `<td><div class="text-white text-center ${colorStatus}"> ${solicitud.status}</div></td>`
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

/**hacer funcion para actualizar el status de pendiente a acceptada o rechazada
*/

const detallesSolicitud = async (indiceSolicitud, step = 1) => {
    console.log('--------- Mostrar Destalles de Solicitud -------------');
    const solicitudes = JSON.parse(window.localStorage.getItem('currentSolicitudes'));
    console.log(solicitudes[indiceSolicitud]);

    let idSolicitud = parseInt(solicitudes[indiceSolicitud].idSolicitud);

    let formHMTL = '<form class="formLogin" id="formLogin">';
    let finFormHTML = '</form> </div>';

    let disableButtonNext = "";
    let disableButtonBack = "";
    let detallesSolicitudToShow;

    $('#modalTitleSolicitud').empty();
    $('#modalBodySolicitud').empty();
    $('#modalFooterSolicitud').empty();
    $('#iframeContainer').empty()

    console.log('step: ', step);

    if (step > 5)
        disableButtonNext = 'disabled';
    if (step < 2)
        disableButtonBack = 'disabled';

    let title = "";
    let api = "";

    switch (step) {
        case 1:
            title = "Detalles solicitud Alumno";
            api = "apiAlumnos.php";
            method = "updateAlumnoByKeyandValue";
            idStr = "idAlumno";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idAlumno[0];
            break;
        case 2:
            title = "Detalles solicitud Escuela";
            api = "apiEscuelas.php";
            method = "updateEscuelaByKeyandValue";
            idStr = "idEscuela";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idEscuela[0];
            break;
        case 3:
            title = "Detalles solicitud Padre";
            api = "apiDatosPadre.php";
            method = "updatePadreByKeyandValue";
            idStr = "idPadre";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idPadre[0];
            break;
        case 4:
            title = "Detalles solicitud Ingresos Familiares";
            api = "apiIngresosFamiliares.php";
            method = "updateIngresosFamiliaresByKeyandValue";
            idStr = "idIngresosFamiliares";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idIngresosFamiliares[0];
            break;
        case 5:
            title = "Detalles solicitud Servicios";
            api = "apiServicios.php";
            method = "updateServiciosByKeyandValue";
            idStr = "idServicios";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idServicios[0];
            break;
        case 6:
            title = "Detalles solicitud Requisitos Adicionales"
            api = "apiRequisitosAdicionales.php";
            method = "updateRequisitosAdicionalesByKeyandValue";
            idStr = "idRequisitosAdicionales";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idRequisitosAdicionales[0];

            let statusSolicitud = solicitudes[indiceSolicitud].status;
            if(statusSolicitud === "pendiente"){
                let aceptada = customizeConfirm("La solicitud de beca sera aprobada?")
                if (aceptada === null)
                    return
                let result = aceptada ? 'aceptada' : 'rechazada'
                updateCampo("apiSolicitudes.php","updateSolicitudByKeyandValue",{idSolicitud},'status',result);
            }

            break;
    }

    let buttonsHTML = `<diV>`
        + `<button type="button" ${disableButtonBack} onclick="detallesSolicitud(${indiceSolicitud},${step - 1})" class="btn btn-secondary float-left"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>`
        + `<button type="button" ${disableButtonNext} onclick="detallesSolicitud(${indiceSolicitud},${step + 1})" class="btn btn-primary float-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>`;
        + `</diV>`

    $('#modalTitleSolicitud').append(title);
    $('#modalFooterSolicitud').append(buttonsHTML);

    if (detallesSolicitudToShow == undefined) {
        $('#modalBodySolicitud').append('NO-REGISTRADO');
        return;
    }

    let id = -1;

    Object.keys(detallesSolicitudToShow).forEach(function (key, index) {
        if (index === 0) {
            id = detallesSolicitudToShow[key];
            return;
        }

        if (key === "file") {
            console.log(detallesSolicitudToShow[key]);
            
            //dataURL.replace('data:', '').replace(/^.+,/, '');

            let iframe = $('#iframeContainer');
            iframe.attr('src', detallesSolicitudToShow[key]); 

            return;
        }

        let inputHMTL = `<label>${key}</label>`
            + '<div class="form-group">'
            + `<input type="text" class="form-control form-control-user" onchange="updateCampo('${api}','${method}',{${idStr}:${id}},'${key}',this.value)" name="${key}" value="${detallesSolicitudToShow[key]}">`
            + '</div>';
        formHMTL += inputHMTL;
    });

    formHMTL += finFormHTML;
    console.log(id)

    $('#modalBodySolicitud').append(formHMTL);
}

const print = async (indiceSolicitud) => {
    console.log('--------- Mostrar Destalles de Solicitud -------------');
    const solicitudes = JSON.parse(window.localStorage.getItem('currentSolicitudes'));
    createSolicitudPdf(solicitudes[indiceSolicitud]);
}

const updateCampo = (api, method, id, key, value) => {
    console.log(id);
    let data = {
        name: method,
        param: {
            key,
            value,
            ...id
        }
    }
    console.log(data);

    request('/educacion/Api/' + api, data, function (res) {
        console.log(res);
        if (res.hasOwnProperty('error')) {
            let expiredToken = res.error.status;
            expiredToken === 301 ? location.href = `/educacion/views/login.php` : alert(res.error.message);
            return;
        }
    });
}
