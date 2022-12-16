$(function () {
    console.log("alumnos");
});

/** Mi curp para probar
 * LAEE920717HMCRSD09
 * 
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

$('#formAddAlumnos').validate({
    onkeyup: false,
    rules: {
        curp: {
            regexCurp: strRegexCurp
        },
        nombre: {
            required: true,
            minlength: 9
        },
        fechaNacimiento: {
            required: true
        }
    },
    messages: {
        nombre: {
            required: 'Agrege el nombre del alumno....',
            minlength: 'Nombre completo por favor'
        },
        fechaNacimiento: {
            required: 'seleccione la fecha de nacimiento'
        }
    },
    submitHandler: function (form) {
        console.log("================ Registrar alumno para solicitar beca ===============");

        let data = {
            name: "addAlumno",
            param: getFormData($("#formAddAlumnos"))
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
                    promedioReciente: "NO-REGISTRADO"
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
                res.response.status ? location.href = `/educacion/views/escuelas/addEscuelas.php?step=1&folio=${folio}` : mostrarRequestAlerResult(res.response.status);
            });
        });
    }
});

 
const checkIfCurpExist = (e) => {
    const globalRegex = new RegExp(strRegexCurp, 'g');
    if (!globalRegex.test(e.value)) {
        console.log("curp no valida");
        return
    }

    let dataCheckCurp = {
        name: "getByCurp",
        param: {
            curp: "LAEE920717HMCRSD09"
        }
    }

    request('/educacion/Api/apiAlumnos.php', dataCheckCurp, function (res) {
        console.log(res);
        if (res.hasOwnProperty('error')) {
            alert(res.error.message);
            return;
        }

        let check = res.response.result;
        if (!(check.length > 0)) {
            console.log("No hay alumno error");
            return
        }

        $("input[name='nombre']").val(check[0].nombre);
        $("input[name='fechaNacimiento']").val(check[0].fechaNacimiento);

        if (!confirm('Ya hay una Solicitud ligada a esta CURP, desea continuar con el llenado'))
            return

        let dataGetSolicitud = {
            name: "getSolicitudByIdAlumno",
            param: {
                idAlumno: check[0].idAlumno
            }
        }

        request('/educacion/Api/apiSolicitudes.php', dataGetSolicitud, function (res) {
            console.log(res);

            if (res.hasOwnProperty('error')) {
                alert(res.error.message);
                return;
            }

            let Solicitud = res.response.result;
            Solicitud.idEscuela < 0 ? location.href = `/educacion/views/escuelas/addEscuelas.php?step=1&folio=${Solicitud.idSolicitud}` : null;
            Solicitud.idPadre < 0 ? location.href = `/educacion/views/datosPadre/addDatosPadre.php?step=2&folio=${Solicitud.idSolicitud}` : null;
            Solicitud.idIngresosFamiliares < 0 ? location.href = `/educacion/views/ingresosFamiliares/addIngresosFamiliares.php?step=3&folio=${Solicitud.idSolicitud}` : null;
            Solicitud.idServicios < 0 ? location.href = `/educacion/views/servicios/addServicios.php?step=4&folio=${Solicitud.idSolicitud}` : null;
            Solicitud.idRequisitosAdicionales < 0 ? location.href = `/educacion/views/requisitosAdicionales/addRequisitosAdicionales.php?step=5&folio=${Solicitud.idSolicitud}` : null;

            Solicitud.nivelEstudios == "NO-REGISTRADO" || Solicitud.promedioReciente == "NO-REGISTRADO" ? location.href = `/educacion/views/solicitudes/updateSolicitud.php?step=6&folio=${Solicitud.idSolicitud}` : alert('Su solicitud ya ha sido completada');
        });

    });
}