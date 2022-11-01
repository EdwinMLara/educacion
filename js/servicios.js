$(function () {
    console.log("servicios");
});

$("#formAddServicios").validate({
    rules: {
        callesPavimentadas: { required: true },
        drenaje: { required: true },
        biblioteca: { required: true },
        recoleccionBasura: { required: true },
        alumbradoPublico: { required: true },
        telefonoPublico: { required: true },
        transportePublico: { required: true },
        aguaPotable: { required: true },
        juegosOCanchas: { required: true }
    },
    messages: {
        callesPavimentadas: { required: 'Seleccione su respuesta' },
        drenaje: { required: 'Seleccione su respuesta' },
        biblioteca: { required: 'Seleccione su respuesta' },
        recoleccionBasura: { required: 'Seleccione su respuesta' },
        alumbradoPublico: { required: 'Seleccione su respuesta' },
        telefonoPublico: { required: 'Seleccione su respuesta' },
        transportePublico: { required: 'Seleccione su respuesta' },
        aguaPotable: { required: 'Seleccione su respuesta' },
        juegosOCanchas: { required: 'Seleccione su respuesta' }
    },
    submitHandler: function () {
        console.log("================ Registrar servicios alumno ===============");
        let data = {
            name: "addServicios",
            param: getFormData($("#formAddServicios"))
        }

        console.log(data);

        request('/educacion/Api/apiServicios.php', data, function (res) {
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
                name: "updateSolicitudIdServicios",
                param: {
                    idSolicitud: folio,
                    idServicios: inserted
                }
            }

            request('/educacion/Api/apiSolicitudes.php', dataUpdateSolicitud, function (res) {
                console.log(res);
                if (res.hasOwnProperty('error')) {
                    alert(res.error.message);
                    return;
                }

                let status = res.response.status;
                status ? location.href = `/educacion/views/requisitosAdicionales/addRequisitosAdicionales.php?step=5&folio=${folio}` : mostrarRequestAlerResult(status)
            });
        });
    }
});