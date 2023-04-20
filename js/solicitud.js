/**wrong number of segmentes, regularmente  es problema en la peticion
 * 1 .- la primera vez la solucione con la url tenia una absoluta y la combie a la relativa
 * 2 .- la segunda vez que se genero el error era porque no habia pasado el token
*/

const auxToken = [];
let solicitudes = [];


$(function () {
    console.log('solicitud');
    auxToken[0] = window.localStorage.getItem('auxToken');
    
    const urlParams = new URLSearchParams(window.location.search);
    const folio = urlParams.get('folio');

    syncronizarFormSolicitud(folio)
    
    paginar(1);
    formDatoisDone(null, 6);
});

function syncronizarFormSolicitud(folio){

    
const strFormInject = '<form id="formUpdateSolicitud">'
                    
+       `<input type='hidden' name="idSolicitud"  value=\"${folio}\" id='folio'>`

+       '<div class="form-group">'
+            '<label>Nivel de Estudios</label>'
+            '<select class="form-control" name="nivelEstudios" aria-label="Floating label select example">'
+                '<option value=""></option>'
+                '<option value="primaria">Primaria</option>'
+                '<option value="secundaria">Secundaria</option>'
+                '<option value="preparatoria">Preparatoria</option>'
+                '<option value="universidad">Univesidad</option>'
+                '<option value="caso especial">Caso Especial</option>'
+             '</select>'
+       '</div>'

+       '<div class="form-group">'
+           '<input type="text" class="form-control" name="promedioReciente" placeholder="Promedio Reciente">'
+       '</div>'

+       '<button type="submit" class="btn btn-primary btn-user btn-block">'
+           'Solicitar'
+       '</button>'

+ '</form>';


    $('#injectedForm').append(strFormInject);

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

                if (res.hasOwnProperty('error')) {
                    alert(res.error.message);
                    return;
                }

                if (!res.response.status >= 200 && !res.response.status < 300) {
                    mostrarRequestAlerResult(res.response.status);
                    return;
                }

                let status = res.response.status;

                if (!status) {
                    alert('Se ha generado un error comuniquese al area de becas!')
                    return;
                }

                let dataGetSolicitudById = {
                    name: "getSolicitudById",
                    param: {
                        idSolicitud: dataUpdateSolicitud.param.idSolicitud
                    }
                }

                console.log(dataGetSolicitudById);

                request('/educacion/Api/apiSolicitudes.php', dataGetSolicitudById, function (res) {

                    if (res.hasOwnProperty('error')) {
                        alert(res.error.message);
                        return;
                    }



                    customizeConfirm("Se ha completado su registro, puede imprimir su solicitud", true)
                        .then(result => {
                            if (result === null) {
                                return
                            }
                            location.href = 'https://uriangato.gob.mx/'
                        }).catch(result => {
                            console.log(result);
                        })

                    createSolicitudPdf(res.response.result[0]);
                }, auxToken[0]);

            }, auxToken[0]);
        }
    });
}


const responseUsersFunction = (page, perPage) => {
    return function (res) {
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
        solicitudes = res.response.result.solicitudes;

        //window.localStorage.setItem('currentSolicitudes', JSON.stringify(solicitudes));

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
    }
};


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

    request('/educacion/Api/apiSolicitudes.php', data, responseUsersFunction(page, perPage), token);
}

/**hacer funcion para actualizar el status de pendiente a acceptada o rechazada
*/

const detallesSolicitud = async (indiceSolicitud, step = 1) => {
    console.log('--------- Mostrar Destalles de Solicitud -------------');

    let idSolicitud = parseInt(solicitudes[indiceSolicitud].idSolicitud);

    let formHMTL = '<form class="formLogin" id="formLogin">';
    let finFormHTML = '</form> </div>';

    let disableButtonNext = "";
    let disableButtonBack = "";
    let detallesSolicitudToShow = undefined;

    $('#modalTitleSolicitud').empty();
    $('#modalBodySolicitud').empty();
    $('#modalFooterSolicitud').empty();
    $('#iframeContainer').empty();
    $('#labelFile').empty();

    if (step > 5)
        disableButtonNext = 'disabled';
    if (step < 2)
        disableButtonBack = 'disabled';

    let title = "";
    let api = "";
    let method = "";
    let idStr = "";
    let nameFile = "";

    switch (step) {
        case 1:
            title = "Detalles solicitud Alumno";
            api = "apiAlumnos.php";
            method = "updateAlumnoByKeyandValue";
            idStr = "idAlumno";
            nameFile = "Curp y Acta de Nacimiento";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idAlumno[0];
            break;
        case 2:
            title = "Detalles solicitud Escuela";
            api = "apiEscuelas.php";
            method = "updateEscuelaByKeyandValue";
            idStr = "idEscuela";
            nameFile = "Constacia de Estudios";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idEscuela[0];
            break;
        case 3:
            title = "Detalles solicitud Padre";
            api = "apiDatosPadre.php";
            method = "updatePadreByKeyandValue";
            idStr = "idPadre";
            nameFile = "Credencial de lector";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idPadre[0];
            break;
        case 4:
            title = "Detalles solicitud Ingresos Familiares";
            api = "apiIngresosFamiliares.php";
            method = "updateIngresosFamiliaresByKeyandValue";
            idStr = "idIngresosFamiliares";
            nameFile = "Comprobante de ingresos";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idIngresosFamiliares[0];
            break;
        case 5:
            title = "Detalles solicitud Servicios";
            api = "apiServicios.php";
            method = "updateServiciosByKeyandValue";
            idStr = "idServicios";
            nameFile = "Comprobante de Domicilio";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idServicios[0];
            break;
        case 6:
            title = "Detalles solicitud Requisitos Adicionales";
            api = "apiRequisitosAdicionales.php";
            method = "updateRequisitosAdicionalesByKeyandValue";
            idStr = "idRequisitosAdicionales";
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idRequisitosAdicionales[0];
            let statusSolicitud = solicitudes[indiceSolicitud].status;

            if (statusSolicitud == 'NO-REGISTRADO') {
                return;
            }

            if (statusSolicitud === "pendiente") {
                setTimeout(function () {
                    customizeConfirm("La solicitud de beca sera aprobada?")
                        .then(result => {
                            if (result === null) {
                                return
                            }
                            let response = result ? 'aceptada' : 'rechazada';
                            updateCampo(indiceSolicitud, step, "apiSolicitudes.php", "updateSolicitudByKeyandValue", { idSolicitud }, 'status', response);
                        }).catch(result => {
                            console.log(result);
                        })
                }, 2000);
            }
            break;
    }

    if (detallesSolicitudToShow == undefined) {
        $('#modalBodySolicitud').append('NO-REGISTRADO');
        $('#iframeContainer').attr('src', "about:blank");
        return;
    }

    let buttonsHTML = `<diV>`
        + `<button type="button" ${disableButtonBack} onclick="detallesSolicitud(${indiceSolicitud},${step - 1})" class="btn btn-secondary float-left"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>`
        + `<button type="button" ${disableButtonNext} onclick="detallesSolicitud(${indiceSolicitud},${step + 1})" class="btn btn-primary float-right"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>`
        + `</diV>`;

    $('#modalTitleSolicitud').append(title);
    $('#modalFooterSolicitud').append(buttonsHTML);

    !detallesSolicitudToShow.hasOwnProperty('file') && $('#iframeContainer').attr('src', "about:blank");
    let id = -1;

    Object.keys(detallesSolicitudToShow).forEach(function (key, index) {
        if (index === 0) {
            id = detallesSolicitudToShow[key];
            return;
        }

        if(key === "validacionKey")
            return

        if (key === "file") {
            //dataURL.replace('data:', '').replace(/^.+,/, '');
            $('#labelFile').html(`<h6>${nameFile}</h6>`);
            $('#iframeContainer').attr('src', detallesSolicitudToShow[key]);
            return;
        }

        let inputHMTL = `<label>${key}</label>`
            + '<div class="form-group">'
            + `<input type="text" class="form-control form-control-user" onchange="updateCampo(${indiceSolicitud},${step},'${api}','${method}',{${idStr}:${id}},'${key}',this.value)" name="${key}" value="${detallesSolicitudToShow[key]}">`
            + '</div>';
        formHMTL += inputHMTL;
    });

    formHMTL += finFormHTML;

    $('#modalBodySolicitud').append(formHMTL);
}

const print = async (indiceSolicitud) => {
    console.log('--------- Mostrar Destalles de Solicitud -------------');
    createSolicitudPdf(solicitudes[indiceSolicitud]);
}

const updateCampo = (indiceSolicitud, step, api, method, id, key, value) => {

    let data = {
        name: method,
        param: {
            key,
            value,
            ...id
        }
    }

    request('/educacion/Api/' + api, data, function (res) {

        if (res.hasOwnProperty('error')) {
            let expiredToken = res.error.status;
            expiredToken === 301 ? location.href = `/educacion/views/login.php` : alert(res.error.message);
            return;
        }

        switch (step) {
            case 1:
                solicitudes[indiceSolicitud].idAlumno[0][key] = value;
                break;
            case 2:
                solicitudes[indiceSolicitud].idEscuela[0][key] = value;
                break;
            case 3:
                solicitudes[indiceSolicitud].idPadre[0][key] = value;
                break;
            case 4:
                solicitudes[indiceSolicitud].idIngresosFamiliares[0][key] = value;
                break;
            case 5:
                solicitudes[indiceSolicitud].idServicios[0][key] = key;
                break;
            case 6:
                solicitudes[indiceSolicitud].idRequisitosAdicionales[0][key] = value
            default:
                paginar(1);
        }

    }, token, false);
}

$("input[name=search]").on('change', function () {
    let buscar = $(this).val();

    let page = 1;

    console.log("=============  Leer solicitudes Paginando =============");
    let perPage = $("#selectPerPage :selected").val();

    if (perPage === undefined)
        return;

    if (buscar.localeCompare('') == 0) {
        paginar(1);
        return;
    }

    let data = {
        name: "getSolicitudesByNameAlumnoLike",
        param: {
            page,
            perPage,
            buscar
        }
    }

    request('/educacion/Api/apiSolicitudes.php', data, responseUsersFunction(page, perPage), token);
});