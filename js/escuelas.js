//falta agregar las funciones de actulizar y eliminar 
const auxToken = [];

$(function () {
    console.log("escuelas");
    auxToken[0] = window.localStorage.getItem('auxToken');

    if ($('#bodyEscuelasTable').length)
        readEscuelasPaginadas(1);
        
    formDatoisDone('idEscuela',1);
});

$("#formAddEscuelas").validate({
    rules: {
        nombre: { required: true, minlength: 10 },
        calle: { required: true },
        no: { required: true },
        cp: { required: true },
        colonia: { required: true },
        municipio: { required: true },
        telefono: { regexPhone: '[0-9]{3}-[0-9]{3}-[0-9]{4}' },
        tipoInstitucion: { required: true },
        file: { required: true },
    },
    messages: {
        nombre: { required: 'Teclea el nombre por favor', minlength: 'Agregar nombre completo' },
        calle: { required: 'Teclea la calle por favor' },
        no: { required: 'Agrega el numero' },
        cp: { required: 'teclea el codigo postal' },
        colonia: { required: 'Teclea la colonia' },
        municipio: { required: 'Teclea el municipio' },
        telefono: { required: 'Agrega el telefono' },
        tipoInstitucion: { required: 'Seleciona el tipo de institucion' },
        file: { required : "Seleccione el archivo"}
    },
    submitHandler: function () {
        console.log("================ Agregar Escuela ===============");
        let data = {
            name: "addEscuela",
            param: {
                ...getFormData($("#formAddEscuelas")),
                file: blobPdf[0]
            }
        }

        console.log(data);


        request('/educacion/Api/apiEscuelas.php', data, function (res) {
            console.log(res);
            if (res.hasOwnProperty('error')) {
                alert(res.error.message);
                return
            }

            if (!res.response.status >= 200 && !res.response.status < 300) {
                mostrarRequestAlerResult(res.response.status);
                return;
            }

            let folio = parseInt($('#folio').val());
            let inserted = res.response.result;

            let dataUpdateSolicitud = {
                name: "updateSolicitudIdEscuela",
                param: {
                    idSolicitud: folio,
                    idEscuela: inserted
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
                status ? location.href = `/educacion/views/datosPadre/addDatosPadre.php?step=2&folio=${folio}` : mostrarRequestAlerResult(res.response.status);
            },auxToken[0]);
        },auxToken[0]);
    }
});

const readEscuelasPaginadas = (page) => {
    console.log(`============== Mostrar escuelas pagina: ${page} ================`);
    let perPage = $("#selectPerPage :selected").val();

    let data = {
        name: "getEscuelasPaginate",
        param: {
            page,
            perPage
        }
    }

    console.log(data);
    request('/educacion/Api/apiEscuelas.php', data, function (res) {
        console.log(res);
        if (res.hasOwnProperty('error')) {
            alert(res.error.message);
            return
        }

        let numDatos = res.response.result.total;
        let escuelas = res.response.result.escuelas;
        let trHTML = '';

        escuelas.forEach(escuela => {
            trHTML += '<tr>'
                + '<td>' + escuela.nombre + '</td>'
                + '<td>' + escuela.calle + '</td>'
                + '<td>' + escuela.no + '</td>'
                + '<td>' + escuela.colonia + '</td>'
                + '<td>' + escuela.municipio + '</td>'
                + '<td>' + escuela.telefono + '</td>'
                + '<td>' + escuela.tipoInstitucion + '</td>'
                + '<td>'
                + `<button type="button" onclick="location.href=\'./updateEscuelas.php?idEscuelas=${escuela.idEscuela}&nombre=${escuela.nombre}\'" class="btn btn-warning"><i class="far fa-edit" aria-hidden="true"></i></button>`
                + `<button type="button" onclick="deleteUsuario(${escuela.idEscuela})" class="btn btn-danger"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>`
                + '</tr>'
        });

        $('#bodyEscuelasTable').empty();
        $('#bodyEscuelasTable').append(trHTML);

        insertStrPaginador(numDatos, page, perPage, "readEscuelasPaginadas");
    });
}