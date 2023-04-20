const auxToken = [];
const strFormInject = '<form id="formAddAlumnos">'

    + '<div class="row">'
    + '<div class="col-sm-8 ">'

    + '<div class="form-group mb-4">'
    + '<input type="text" class="form-control" name="curp" placeholder="Curp" onchange="checkIfCurpExist(this)">'
    + '</div>'

    + '<div class="form-group mb-4">'
    + '<label for="inputGroupFile01">Acta de nacimiento en PDF</label>'
    + '<div class="custom-file">'
    + '<input id="file" type="file" name="file" class="custom-file-input" accept="application/pdf" onchange="showPdf(this)">'
    + '<label id="fileLabel" class="custom-file-label" for="inputGroupFile01">Selecciona el archivo</label>'
    + '</div>'
    + '</div>'

    + '<div class="form-group mb-4">'
    + '<input type="text" class="form-control" name="correo" placeholder="Correo">'
    + '</div>'

    + '<div class="form-group mb-4">'
    + '<input type="text" class="form-control" name="nombre" placeholder="Nombre del estudiante">'
    + '</div>'

    + '<div class="form-group mb-4">'
    + '<label>Fecha de nacimiento</label>'
    + '<input type="date" class="form-control" name="fechaNacimiento" placeholder="Fecha de Nacimiento">'
    + '</div>'

    + '</div>'

    + '<div class="col-sm-4">'
    + '<div style="height: 90%; background-color: rgba(255,0,0,0.1);">'
    + '<iframe id="iframeContainer" class="w-100 h-100" src="" title="Evidencia"> </iframe>'
    + '</div>'
    + '</div>'
    + '</div>'

    + '<div class="row"> '
    + '<div class="col-sm">'
    + '<button type="submit" class="btn btn-primary btn-user btn-block">'
    + 'Registrar Alumno'
    + '</button>'
    + '</div>'
    + '</div>'
    + '</form>';


$(function () {
    console.log("alumnos");

    syncronizarForm();

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
                window.localStorage.setItem('auxToken', res.response.result.token);
                return;
            }
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });

});

/** Mi curp para probar
 * LAEE920717HMCRSD09
 * EIMH700908MDFSRL09
 * 
 * CHECAR LA VALIDACION DE TIPO DE DATOS
 */

const strRegexCurp = '[A-Z]{1}[AEIOU]{1}[A-Z]{2}'
    + '[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])'
    + '[HM]{1}'
    + '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)'
    + '[B-DF-HJ-NP-TV-Z]{3}'
    + '[0-9A-Z]{1}'
    + '[0-9]{1}$';

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
            correo: {
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
                console.log(inserted);

                let dataSolicitud = {
                    name: "addSolicitude",
                    param: {
                        idAlumno: inserted,
                        idEscuela: -1,
                        idPadre: -1,
                        idIngresosFamiliares: -1,
                        idServicios: -1,
                        idRequisitosAdicionales: -1,
                        nivelEstudios: "NO-REGISTRADO",
                        promedioReciente: "NO-REGISTRADO",
                        status: 'pendiente',
                        fecha: new Date().toISOString().slice(0, 10)
                    }
                }

                console.log(dataSolicitud);

                request('/educacion/Api/apiSolicitudes.php', dataSolicitud, function (res) {
                    console.log(res);
                    if (res.hasOwnProperty('error')) {
                        let expiredToken = res.error.status;
                        expiredToken === 301 ? location.href = `/educacion/views/login.php` : alert(res.error.message);
                        return;
                    }

                    let folio = res.response.result;
                    window.localStorage.setItem('current_curp', data.param.curp);
                    res.response.status ? location.href = `/educacion/views/escuelas/addEscuelas.php?step=1&folio=${folio}` : mostrarRequestAlerResult(res.response.status);
                }, auxToken[0]);
            }, auxToken[0]);
        }
    });

}




const checkIfCurpExist = (e) => {
    console.log("================ revisar si ya existe la curp ===============")
    const globalRegex = new RegExp(strRegexCurp, 'g');

    if (!globalRegex.test(e.value)) {
        console.log("curp no valida");
        return
    }

    let dataCheckCurp = {
        name: "getByCurp",
        param: {
            curp: $("input[name='curp']").val()
        }
    }

    window.localStorage.setItem('current_curp', dataCheckCurp.param.curp);

    request('/educacion/Api/apiAlumnos.php', dataCheckCurp, function (res) {
        console.log("Revisar Curp");

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


        verificarCorreo(3, auxToken[0])
            .then((result) => {
                console.log(result);

                let dataGetSolicitud = {
                    name: "getSolicitudByIdAlumno",
                    param: {
                        idAlumno: check[0].idAlumno
                    }
                }

                request('/educacion/Api/apiSolicitudes.php', dataGetSolicitud, function (res) {
        
                    if (res.hasOwnProperty('error')) {
                        alert(res.error.message);
                        return;
                    }
        
                    let Solicitud = res.response.result;
        
                    if (parseInt(Solicitud.idEscuela) < 0) {
                        location.href = `/educacion/views/escuelas/addEscuelas.php?step=1&folio=${Solicitud.idSolicitud}`
                        return
                    }
                    if (parseInt(Solicitud.idPadre) < 0) {
                        location.href = `/educacion/views/datosPadre/addDatosPadre.php?step=2&folio=${Solicitud.idSolicitud}`
                        return;
                    }
         
                    if (parseInt(Solicitud.idIngresosFamiliares) < 0) {
                        location.href = `/educacion/views/ingresosFamiliares/addIngresosFamiliares.php?step=3&folio=${Solicitud.idSolicitud}`
                        return
                    }
         
                    if (parseInt(Solicitud.idServicios) < 0) {
                        location.href = `/educacion/views/servicios/addServicios.php?step=4&folio=${Solicitud.idSolicitud}`;
                        return
                    }
         
                    if (parseInt(Solicitud.idRequisitosAdicionales) < 0) {
                        location.href = `/educacion/views/requisitosAdicionales/addRequisitosAdicionales.php?step=5&folio=${Solicitud.idSolicitud}`
                        return
                    }
        
                    (Solicitud.nivelEstudios == "NO-REGISTRADO" || Solicitud.promedioReciente == "NO-REGISTRADO") ? location.href = `/educacion/views/solicitudes/updateSolicitud.php?step=6&folio=${Solicitud.idSolicitud}` : alert('Su solicitud ya ha sido completada');
                }, auxToken[0]);
            })
            .catch(err => {
                console.log(err)
            })

    }, auxToken[0]);
}

const verificarCorreo = async (idAlumno, token) => {
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
