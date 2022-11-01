$(function () {
    console.log("Ingresos Familiares");
})

$('#formIngresosFamiliares').validate({
    rules: {
        ingresoPapa: { required: true },
        ingresoMama: { required: true },
        ingresoHermanos: { required: true },
        ingresoAbuelos: { required: true },
        personasDependientes: { required: true }
    },
    messages: {
        ingresoPapa: { required: 'Agregar el ingreso del padre' },
        ingresoMama: { required: 'Agregar el ingreso de mama' },
        ingresoHermanos: { required: 'Agregar el ingreso de los hermanos' },
        ingresoAbuelos: { required: 'Agregar el ingreso de los abuelos' },
        personasDependientes: { required: 'Agrega el numero de personas que dependen del ingreso' }
    },
    submitHandler: function () {
        console.log("================== Registrar Ingresos Familiares ================= ");
        let data = {
            name: "addIngresosFamiliares",
            param: getFormData($("#formIngresosFamiliares"))
        }
        console.log(data);

        request('/educacion/Api/apiIngresosFamiliares.php', data, function (res) {
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
                name: "updateSolicitudIdIngresosFamiliares",
                param: {
                    idSolicitud: folio,
                    idIngresosFamiliares: inserted
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
                status ? location.href = `/educacion/views/servicios/addServicios.php?step=4&folio=${folio}` : mostrarRequestAlerResult(status)
            });
       });
    }
});