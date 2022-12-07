$(function () {
    console.log("datos Padre");
});

$('#formAddDatosPadre').validate({
    rules: {
        nombre: { required: true },
        telefono: { regexPhone: '[0-9]{3}-[0-9]{3}-[0-9]{4}' },
        fechaNacimiento: { required: true },
        curp: {
            regexCurp: '[A-Z]{1}[AEIOU]{1}[A-Z]{2}'
                + '[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])'
                + '[HM]{1}'
                + '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)'
                + '[B-DF-HJ-NP-TV-Z]{3}'
                + '[0-9A-Z]{1}'
                + '[0-9]{1}$'
        },
        calle: { required: true },
        no: { required: true },
        colonia: { required: true },
        cp: { required: true },
        municipio: { required: true },
        gradoEstudios: { required: true },
        trabajo6Meses: { required: true },
        motivoNoTrabajo: { required: true },
        seguroMedico: { required: true }
    },  
    messages: {
        nombre: { required: 'Agrege el nombre' },
        calle: { required: 'Agrege la calle' },
        no: { required: 'Agrege el numero' },
        colonia: { required: 'Agrege la colonia' },
        cp: { required: 'Agrege el codigo postal' },
        municipio: { required: 'Agrege el municipio' },
        gradoEstudios: { required: 'Seleccione el grado de estudios' },
        trabajo6Meses: { required: 'Seleccione si ha trabajado el los ultimos 6 meses' },
        motivoNoTrabajo: { required: 'Agrege el motivo' },
        seguroMedico: { required: 'Seleccione si cuenta con seguro medico' }
    },
    submitHandler: function () {
        console.log("================== Registrar Datos del Padre ================= ");

        let data = {
            name: "addDatosPadre",
            param: getFormData($("#formAddDatosPadre"))
        }
        console.log(data);

        request('/educacion/Api/apiDatosPadre.php', data, function (res) {
            console.log(res);
            if (res.hasOwnProperty('error')) {
                alert(res.error.message);
                return;
            }

            if (!res.response.status >= 200 && !res.response.status < 300) {
                mostrarRequestAlerResult(res.response.status);
                return;
            }

            let folio = parseInt($('#folio').val());
            let inserted = res.response.result;
            console.log(inserted);

            let dataUpdateSolicitud = {
                name:"updateSolicitudIdPadre",
                param:{
                    idSolicitud:folio,
                    idPadre: inserted 
                }
            }

            console.log(dataUpdateSolicitud);

            request('/educacion/Api/apiSolicitudes.php', dataUpdateSolicitud, function (res) {
                console.log(res);
                if (res.hasOwnProperty('error')) {
                    alert(res.error.message);
                    return;
                }
                
                let status = res.response.status;
                status ? location.href = `/educacion/views/ingresosFamiliares/addIngresosFamiliares.php?step=3&folio=${folio}` : mostrarRequestAlerResult(status)
            });
        });
    }
});