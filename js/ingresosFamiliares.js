const auxToken = [];

$(function () {
    console.log("Ingresos Familiares");
    auxToken[0] = window.localStorage.getItem('auxToken');
})

$('#formIngresosFamiliares').validate({
    rules: {
        file: { required: true },
        ingresoPapa: { required: true , digits: true},
        ingresoMama: { required: true, digits: true },
        ingresoHermanos: { required: true, digits: true },
        ingresoAbuelos: { required: true, digits: true },
        personasDependientes: { required: true, digits: true, max: 10}
    },
    messages: {
        ingresoPapa: { required: 'Agregar el ingreso del padre', digits: 'Solo numeros'},
        ingresoMama: { required: 'Agregar el ingreso de mama', digits: 'Solo numeros' },
        ingresoHermanos: { required: 'Agregar el ingreso de los hermanos', digits: 'Solo numeros' },
        ingresoAbuelos: { required: 'Agregar el ingreso de los abuelos', digits: 'Solo numeros' },
        personasDependientes: { required: 'Agrega el numero de personas que dependen del ingreso', digits: 'Solo numeros', max: 'el numero es muy grande'}
    },
    submitHandler: function () {
        console.log("================== Registrar Ingresos Familiares ================= ");
        let data = {
            name: "addIngresosFamiliares",
            param: {...getFormData($("#formIngresosFamiliares")),file: blobPdf[0] }
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
            },auxToken[0]);
       },auxToken[0]);
    }
});