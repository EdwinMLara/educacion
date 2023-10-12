/**wrong number of segmentes, regularmente  es problema en la peticion
problema del token
*/

/**
 * Array with an string token
 * @type {Array<String>}
 */
const auxToken = [];

/**
 * Array with the applications objects
 * @type {Array<Object>}
 */
let solicitudes = [];

/**
 * Array with the current applications id
 * @type {Array<integer>}  
 */
const currentIdSolicitud = [];

/**
 * @param {Function} 
 * 
 * it's lunched once the page is loaded
 * 1.- Carga el token del almacenamiento local
 * 2.- Obtiene el folio de la solicitud presente en la URL
 * 3.- Inyecta el formulario para terminar de llenar la solicitud  mediante la funcion syncronizarFormSolicitud()
 * 4.- Manda llamar la funcion paginar(1) en la pagina 1
 * 5.- Revisa su el formulacion ya ha sido llenado con la funcion formDatoisDone()
 * 
 */
$(function () {
    console.log('solicitud');
    auxToken[0] = window.localStorage.getItem('auxToken');
    
    const urlParams = new URLSearchParams(window.location.search);
    const folio = urlParams.get('folio');

    syncronizarFormSolicitud(folio)
    
    paginar(1);
    formDatoisDone(null, 6);

    /**Prueba aceptar beca */
    //enviarRespuesta(1);
});


/**
 * it used to inyect the form into the webpage, afther the inyection the validate object is 
 * linked to the form when the submit button is pressed it make a request to update values 
 * if the response is succeced make another request to get the request object and create the 
 * pdf format with the values 
 * 
 * 
 * @param {Integer} folio -- es el id de la solicitud y se utiliza para pegar a una cadena y crear folio 
 * @returns {Function}
 */
function syncronizarFormSolicitud(folio){

    
const strFormInject = '<form id="formUpdateSolicitud" autocomplete="off">'
                    
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


    let inject = $('#injectedForm')

    if (inject === undefined)
        return;

    inject.append(strFormInject);

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

/**
 * It's kind of middelware
 * @param {Integer} page 
 * @param {Integer} perPage 
 * @returns 
 */
const responseUsersFunction = (page, perPage) => {
    /**
     * It used to control de an http response and show in a table the applications data
     * @param { Array<Object>}
     */

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
            let alumno = solicitud.idAlumno != null ? solicitud.idAlumno[0].nombre : 'NO-REGISTRADO';
            let escuela = solicitud.idEscuela != null ? solicitud.idEscuela[0].nombre : 'NO-REGISTRADO';
            let padre = solicitud.idPadre != null ? solicitud.idPadre[0].nombre : 'NO-REGISTRADO';
            let colorStatus = "";
            let buttonSendNotificacion = "";

            const expr = solicitud.status;
            switch (solicitud.status) {
                case 'aceptada':
                    colorStatus = "bg-success"
                    break;
                case 'pendiente':
                    colorStatus = "bg-warning"
                    break;
                case 'rechazada':
                    colorStatus = "bg-danger";
                    if(!parseInt(solicitud.notificado))
                        buttonSendNotificacion = `<button type="button"  onClick="referenciaIdSolicitud(${solicitud.idSolicitud})" data-toggle="modal" data-target="#enviarRespuestaModal" class="btn btn-success"><i class="fa fa-paper-plane fa-fw" aria-hidden="true"></i></button>`;
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
                + buttonSendNotificacion
                + '</td>'
                + '</tr>';
        });

        $('#bodySolicitudesTable').empty();
        $('#bodySolicitudesTable').append(trHTML);
        insertStrPaginador(numDatos, page, perPage, "paginar");
    }
};


/**
 * it's used to make a reload when something changes
 * @param {Integer} page 
 * @returns 
 */
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

/**
 * it's used to make a look into the application in detail
 * 
 * @param {interger} indiceSolicitud -- it's the index array which contains the application object 
 * @param {interger} step -- the application object in breaking into a peaces which is shown by steps
 * @returns 
 */
const detallesSolicitud = async (indiceSolicitud, step = 1) => {    
    console.log('--------- Mostrar Destalles de Solicitud -------------');

    let idSolicitud = parseInt(solicitudes[indiceSolicitud].idSolicitud);
    currentIdSolicitud[0] = idSolicitud;

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
                            response.localeCompare('aceptada') === 0 ? enviarRespuesta(1) : null
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

/**
 * it's used to know what value of the applications array is needed and therefore get the object application  
 * @param {interger} indiceSolicitud -- it's the index array which contains the application object   
 */
const print = async (indiceSolicitud) => {
    console.log('--------- Mostrar Destalles de Solicitud -------------');
    createSolicitudPdf(solicitudes[indiceSolicitud]);
}

/**
 * it's used to update any field over the application
 * 
 * @param {Integer} indiceSolicitud -- it's the index array to identify the applicacion object in the response array
 * @param {Integer} step -- it's used to know in which part of the applications object is the user 
 * @param {String} api -- it's the api name that contains the values will be updated
 * @param {String} method -- it's the method name that belong to the api
 * @param {Integer} id -- it's the value id that need to be updated 
 * @param {String} key -- it's the attribute name has to be updated
 * @param {String} value -- it's the new value
 */
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


/**
 * Here we are binding an input box and attaching the onchange event with the jQuery sintax
 * this function is used to make a filter over the applications objects base on the student name 
 * @param {Function}
 */
$("input[name=search]").on('change', function () {
    let perPage = $("#selectPerPage :selected").val();
    if (perPage === undefined)
        return;

    let buscar = $(this).val();

    let page = 1;

    console.log("=============  Leer solicitudes Paginando =============");

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


/**
 * Here we are binding an button and attaching the onclick event with the jQuery sintax
 * it's used to create a pdf file with the applications data
 * @param {Function}
 */
$('#descargar').on('click',function (){
    let folio = $("input[name=folio]").val();

    let pattern = /(URF)-\d{2}-\d+/g;
    let result = pattern.test(folio);
    
    console.log(result);

    if(!result){
        alert(`El folio ${folio} es invalido!`);
        return;
    }
    /** regex para validar folio del tipo URI-n */
    let id = folio.split("-");
    console.log(id);
    let data = {
        name:"getSolicitudById",
        param:{
            idSolicitud: id[1]
        }
    }
    console.log(data);
    request('/educacion/Api/apiSolicitudes.php',data,function (res){
        console.log(res);
        if (res.hasOwnProperty('error')) {
            let expiredToken = res.error.status;            
            return
        }

        if (res.response.status === 204) {
            alert(res.response.result);
            return;
        }

        const solicitud = res.response.result[0];
        createSolicitudPdf(solicitud);

    },token)
});

/**
 * It's used to update the global variable of the current applications
 * @param {Integer} idSolicitud 
 */
const referenciaIdSolicitud = (idSolicitud) => {
    $("#alert").empty();
    $("input[name=motivo]").val("");
    currentIdSolicitud[0] = idSolicitud;
}

/**
 * 
 * @param {Boolean} value -- It's the value response, true if the application was accepted otherwise false in this case 1 and 0 is used to represent the true and false 
 * @returns 
 */
const enviarRespuesta = (value) =>{
    const succesAlert = `<div class="alert alert-success" role="alert">
                            Se ha enviado la notificacion!
                        </div>`;

    const errorAlert =  `<div class="alert alert-danger" role="alert">
                            Error consulta al departamento de Tecnologias
                        </div>`;
    
    const respuestaInput = !value && $("input[name=motivo]");
    let valueRespuesta =  respuestaInput ?  respuestaInput.val() : "Nos complace informale que su beca ha sido aceptada";
    
    console.log(valueRespuesta);

    let result = "";

    if(valueRespuesta.length < 5)
        result = "La respuesta es muy corta"

    if(valueRespuesta.localeCompare("") === 0)
        result = "Agrege su respuesta"
    
    if(result.length > 1){
        respuestaInput.trigger( "focus" );
        $("#validationMotivo").text(result);
        return
    }else{
        $("#validationMotivo").text("");
    }

    
    let data = {
        name : "correoRespuestaAceptacionBeca",
        param:{
            idSolicitud: currentIdSolicitud[0],
            statusBeca: value,
            respuesta:valueRespuesta
        } 
    }

    console.log(data);
    
    request('/educacion/Api/apiSolicitudes.php',data,function (res){
        console.log(res);

        if (res.hasOwnProperty('error')) {
            $("#alert").html(errorAlert);
            let expiredToken = res.error.status;
            expiredToken === 301 ? location.href = `/educacion/views/login.php` : alert(res.error.message);
            return
        }

        if (res.response.status === 204) {
            alert(res.response.result);
            return;
        }

        $("#alert").html(succesAlert);

    },token,false);
    
}

$('#aceptarBecaButton').on('click',function () {
    enviarRespuesta(0);
    paginar(1);
});

/*$('#rechazarBecaButton').on('click',function () {
    enviarRespuesta(0);
})

SELECT reservation.date_at AS fecha, CONCAT(medic.name,medic.lastname) as Medico, COUNT(reservation.id) AS Consultas
FROM reservation
INNER JOIN medic
ON medic.id = reservation.medic_id
WHERE reservation.medic_id = 4 AND reservation.date_at BETWEEN '2023-07-01' AND '2023-07-31' 
GROUP BY reservation.date_at */