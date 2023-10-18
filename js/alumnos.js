/** Mi curp para probar
 * LAEE920717HMCRSD09
 * EIMH700908MDFSRL09
 * 
 * 
 * CHECAR LA VALIDACION DE TIPO DE DATOS
 * =================================================================
 */



/**
 * Array with an string token
 * @type {Array<String>}
 */
const auxToken = [];

/**
 * it's a string which contains the form to store a new applications
 * it will be injected over the div with the id injectedForm
 * @type {String}
 */
const strFormInject = '<form id="formAddAlumnos" autocomplete="off">'

    + '<div class="row">'
    + '<div class="col-sm-8 ">'

    + '<div class="form-group mb-4">'
    +   '<input type="text" class="form-control" name="curp" placeholder="Curp" onchange="checkIfCurpExist(this)">'
    + '</div>'

    + '<div class="form-group mb-4">'
    +   '<label for="inputGroupFile01">Acta de nacimiento en PDF</label>'
    +   '<div class="custom-file">'
    +   '<input id="file" type="file" name="file" class="custom-file-input" accept="application/pdf" onchange="showPdf(this)">'
    +       '<label id="fileLabel" class="custom-file-label" for="inputGroupFile01">Selecciona el archivo</label>'
    +   '</div>'
    + '</div>'

    + '<div class="form-group mb-4">'
    +   '<input type="text" class="form-control" name="email" placeholder="Correo">'
    + '</div>'

    + '<div class="form-group mb-4">'
    +   '<input type="text" class="form-control" name="nombre" placeholder="Nombre del estudiante">'
    + '</div>'

    + '<div class="form-group mb-4">'
    +   '<label>Fecha de nacimiento</label>'
    +   '<input type="date" class="form-control" name="fechaNacimiento" placeholder="Fecha de Nacimiento">'
    + '</div>'

    + '</div>'

    + '<div class="col-sm-4">'
    +    '<div style="height: 90%; background-color: rgba(255,0,0,0.1);">'
    +       '<iframe id="iframeContainer" class="w-100 h-100" src="" title="Evidencia"> </iframe>'
    +       '</div>'
    +       '</div>'
    + '</div>'

    + '<div class="row"> '
    + '<div class="col-sm">'
    + '<button type="submit" class="btn btn-primary btn-user btn-block">'
    +   'Registrar Alumno'
    + '</button>'
    + '</div>'
    + '</div>'
    + '</form>';

/**
 * it's onReady() function 
 * Once the page es loaded, so the form is injected and just afther that,
 * a token si gotten in order to be able to get the permission to register
 */
$(function () {
    console.log("alumnos");
    obtenerToken();
    syncronizarForm();
});

/**
 * This make a request to the users's api, where a default user is used to generate a token 
 * and the token is stored in global variable called auxToken  
 */
const obtenerToken = () => {   
    let data = {
        name: "generateToken",
        param: {
            username: "auxtoken",
            password: "admin"
        }
    }

    $.ajax({
        url: '/educacion/Api/apiUsuarios.php',
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        },
        success: function (res) {
            if (res.hasOwnProperty('error')) {
                let message = res.error.message;
                let Response = `<div class="alert alert-danger"><strong>Error!</strong> ${message}.</div>`;
                $("#alert").empty();
                $("#alert").append(Response);
                return;
            }

            if (res.hasOwnProperty('response')) {
                auxToken[0] = res.response.result.token;
                console.log(`auxtoke : ${auxToken[0]}`);
                window.localStorage.setItem('auxToken', res.response.result.token);
                return;
            }
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });
}


/**
 * it's a regex to validate curp field
 * @type {String}
 */
const strRegexCurp = '[A-Z]{1}[AEIOU]{1}[A-Z]{2}'
    + '[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])'
    + '[HM]{1}'
    + '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)'
    + '[B-DF-HJ-NP-TV-Z]{3}'
    + '[0-9A-Z]{1}'
    + '[0-9]{1}$';

/**
 * it's a function to inject the string with html form and attach the validate object 
 * the second step is make a request to register a student that want to make the applications
 * and it's importan to know that a trigger is lunched which is shown below 
 * 
 * 
DELIMITER 
|
    CREATE TRIGGER insertSolicitud AFTER INSERT ON alumnos
    FOR EACH ROW
    BEGIN
        INSERT INTO solicitudes (idAlumno,idEscuela,idPadre,idIngresosFamiliares,idServicios,idRequisitosAdicionales,nivelEstudios,promedioReciente,`status`,notificado,fecha)
        VALUES (NEW.idAlumno,NULL,NULL,NULL,NULL,NULL,'NO-REGISTRADO','NO-REGISTRADO','pendiente',0,now());
    END; 
|
 */

function syncronizarForm() {
    $('#injectedForm').append(strFormInject);

    $('#formAddAlumnos').validate({
        onkeyup: false,
        rules: {
            file: { required: true },
            correo: {
                required: true,
                email: true
            },
            curp: { regexCurp: strRegexCurp },
            nombre: {
                required: true,
                minlength: 9
            },
            fechaNacimiento: { required: true }
        },
        messages: {
            file: { required: "Seleccione el archivo" },
            email: {
                required: "Agregar el email",
                email: 'el correo es invalido'
            },
            nombre: {
                required: 'Agrege el nombre del alumno....',
                minlength: 'Nombre completo por favor'
            },
            fechaNacimiento: { required: 'seleccione la fecha de nacimiento' }
        },
        submitHandler: function (form) {
            console.log("================ Registrar alumno para solicitar beca ===============");

            let data = {
                name: "addAlumno",
                param: {
                    ...getFormData($("#formAddAlumnos")),
                    file: blobPdf[0]
                }
            }
            console.log(data);

            request('/educacion/Api/apiAlumnos.php', data, function (res) {
                console.log(res);
                if (res.hasOwnProperty('error')) {
                    alert(res.error.message);
                    return;
                }

                if (!res.response.status) {
                    mostrarRequestAlerResult(res.response.status);
                    return;
                }
                let inserted = res.response.result;

                window.localStorage.setItem('current_curp', data.param.curp);
                res.response.status ? location.href = `/educacion/views/escuelas/addEscuelas.php?step=1&alumno=${inserted}` : mostrarRequestAlerResult(res.response.status);

            }, auxToken[0],false);
        }
    });

}



/**
 * it's lunched when the curp input changes and it check out if exist an record with this curp 
 * if the curp exist it call the method verificarCorreo() 
 * @param {ChangeEvent<HTMLInputElement} e 
 * @returns 
 */
const checkIfCurpExist = (e) => {
    console.log("================ revisar si ya existe la curp ===============");

    const globalRegex = new RegExp(strRegexCurp, 'g');

    if (!globalRegex.test(e.value)) {
        console.log("curp no valida");
        return
    }

    let curp = $("input[name='curp']").val();

    let dataCheckCurp = {
        name: "getByCurp",
        param: {
            curp
        }
    }

    window.localStorage.setItem('current_curp',curp);

    request('/educacion/Api/apiAlumnos.php', dataCheckCurp, function (res) {
        //console.log("Revisar Curp");
        //console.log(res);

        if (res.hasOwnProperty('error')) {
            alert(res.error.message);
            return;
        }

        if (res.response.status === 204) {
            return;
        }

        if (!(res.response.status === 200))
            return;

        let check = res.response.result;

        $("input[name='nombre']").val(check[0].nombre);
        $("input[name='fechaNacimiento']").val(check[0].fechaNacimiento);

        /**
         * At this point it makes an request using the alumn's id
         */

        verificarCorreo(check[0].idAlumno, auxToken[0])
            .then((result) => {
                console.log(result);

                let dataGetSolicitudByIdAlumno = {
                    name: "getSolicitudByIdAlumno",
                    param: {
                        idAlumno: check[0].idAlumno
                    }
                }

                //console.log(dataGetSolicitudByIdAlumno)

                /**
                 * the fist one it's check out if there is an application 
                 * once we get the application date if the date is less than 3 months we gonna create a new applications
                 * otherwise we check if there is not done current application 
                 */
                request('/educacion/Api/apiSolicitudes.php', dataGetSolicitudByIdAlumno, function (res) {
                    console.log(res);
        
                    if (res.hasOwnProperty('error')) {
                        alert(res.error.message);
                        return;
                    }
        
                    let Solicitud = res.response.result;

                    let fechaValidacion = new Date(Solicitud.fecha);

                    let numeroDiasSumar = 90;
                    fechaValidacion = fechaValidacion.setDate(fechaValidacion.getDate() + numeroDiasSumar);
                    let fechaValidacionSuma = new Date(fechaValidacion);

                    let fechaActual = new Date();


                    if(fechaActual > fechaValidacionSuma){
                        let dataAddSolicitud = {
                            name: "addSolicitude",
                            param: {
                                idAlumno: `${check[0].idAlumno}`,
                                idEscuela:`${check[0].idEscuela}`,
                                idPadre:`${check[0].idPadre}`,
                                idIngresosFamiliares:`${check[0].idRequisitosAdicionales}`,
                                idServicios:`${check[0].idServicios}`,
                                idRequisitosAdicionales:`${check[0].idRequisitosAdicionales}`,
                                nivelEstudios:"NO-REGISTRADO",
                                promedioReciente:"NO-REGISTRADO",
                                status:"pendiente",
                                notificado:0,
                                fecha:"now()"
                            }
                        }
                        
                        request('/educacion/Api/apiSolicitudes.php',dataAddSolicitud,function (res) {

                            console.log(res);

                            if (res.hasOwnProperty('error')) {
                                alert(res.error.message);
                                return;
                            }
                    
                            if (res.response.status === 204) {
                                return;
                            }
                    
                            if (!(res.response.status === 200))
                                return;

                            let idSolicitud = res.response.result

                            location.href = `/educacion/views/requisitosAdicionales/addRequisitosAdicionales.php?step=5&folio=${idSolicitud}`;
                            return;
                        },auxToken[0],false);
                    }
        
                    if (Solicitud.idEscuela === null) {
                        location.href = `/educacion/views/escuelas/addEscuelas.php?step=1&folio=${Solicitud.idSolicitud}`
                        return
                    }

                    if (Solicitud.idPadre === null) {
                        location.href = `/educacion/views/datosPadre/addDatosPadre.php?step=2&folio=${Solicitud.idSolicitud}`
                        return;
                    }
         
                    if (Solicitud.idIngresosFamiliares === null) {
                        location.href = `/educacion/views/ingresosFamiliares/addIngresosFamiliares.php?step=3&folio=${Solicitud.idSolicitud}`
                        return
                    }
         
                    if (Solicitud.idServicios === null) {
                        location.href = `/educacion/views/servicios/addServicios.php?step=4&folio=${Solicitud.idSolicitud}`;
                        return
                    }
         
                    if (Solicitud.idRequisitosAdicionales === null) {
                        location.href = `/educacion/views/requisitosAdicionales/addRequisitosAdicionales.php?step=5&folio=${Solicitud.idSolicitud}`
                        return
                    }
        
                    (Solicitud.nivelEstudios == "NO-REGISTRADO" || Solicitud.promedioReciente == "NO-REGISTRADO") ? location.href = `/educacion/views/solicitudes/updateSolicitud.php?step=6&folio=${Solicitud.idSolicitud}` : alert('Su solicitud ya ha sido completada');

                }, auxToken[0],false);
            })
            .catch(err => {
                console.log(err)
            })

    }, auxToken[0]);
}

/**
 * When an applications is started and not finished a email verificacion is needed in order to make sure
 * is the same person who a accesing again so an email is sending to the register email linked to an curp
 * @param {Integer} idAlumno -- it's the alumno
 * @param {String} token  -- token with the right permision to make a request
 * @returns {Promise} -- it's a promise to verifica the word that was sended to the register email
 */

const verificarCorreo = async (idAlumno, token) => {
    //console.log("correo de verificacion");
    return new Promise((resolve, reject) => {
        let modalVerification = $('#modalCorreoVerificacion');
        modalVerification.css({
            "top": "200px"
        });
        modalVerification.modal('toggle');

        let dataCorreoVerificacion = {
            name: "correoVerificacion",
            param: {
                idAlumno
            }
        }

        request('/educacion/Api/apiSolicitudes.php', dataCorreoVerificacion, function (res) {
            //console.log(res);
            if (res.response.status == 200) {

                $("#verificar-acepted-button").on("click", function (clickEvent) {



                    let userValidationvalue = $("input[name='validationKey']").val();
                    if (userValidationvalue.localeCompare(res.response.result.validationKey) === 0)
                        resolve("Se ha verificado correctamente")
                    else {
                        clickEvent.preventDefault();
                        clickEvent.stopPropagation();
                        $("#alert").append('<div class="alert alert-danger"><strong>Error!</strong> La verificacion es incorrecta </div>')
                    }
                });

                $("#verificar-rejected-button").on("click", function () {
                    reject("se ha cancelado la verificacion")
                });
            }
        }, token);

    });
}
