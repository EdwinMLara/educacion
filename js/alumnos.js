$(function () {
    console.log("alumnos");
});

/** Mi curp para probar
 * LAEE920717HMCRSD09
 * 
 * 
 * CHECAR LA VALIDACION DE TIPO DE DATOS
 */

$('#formAddAlumnos').validate({
    rules: {
        curp: {
            regexCurp: '[A-Z]{1}[AEIOU]{1}[A-Z]{2}'
                + '[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])'
                + '[HM]{1}'
                + '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)'
                + '[B-DF-HJ-NP-TV-Z]{3}'
                + '[0-9A-Z]{1}'
                + '[0-9]{1}$'
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
    submitHandler: function () {
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
                    idEscuela: 0,
                    idPadre: 0,
                    idIngresosFamiliares: 0,
                    idServicios: 0,
                    idRequisitosAdicionales: 0,
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