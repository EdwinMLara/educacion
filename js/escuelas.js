//falta agregar las funciones de actulizar y eliminar 


/**
 * 
 * CREATE PROCEDURE UpdateIdEscuelaFromSolicitudes
    @idSolicitud INT,
    @newIdEscuela INT
AS
BEGIN
    UPDATE solicitudes
    SET idEscuela = @newIdEscuela
    WHERE ID = @idSolicitud;
END;
 * 


 */
const auxToken = [];
const strFormInject = '<form id="formAddEscuelas" autocomplete="off">'
    + '<div class="row">'
    + '<div class="col-sm-8 ">'
    + '<div class="form-group mb-4">'
    + '<label for="inputGroupFile01">Constancia de estudios o Boleta en PDF</label>'
    + '<div class="custom-file">'
    + '<input id="file" type="file" name="file" class="custom-file-input" accept="application/pdf, image/png, image/jpeg, image/jpg" onchange="showPdf(this)">'
    + '<label id="fileLabel" class="custom-file-label" for="inputGroupFile01">Selecciona el archivo</label>'
    + '</div>'
    + '</div>'

    + '<div class="form-group mb-4">'
    + '<input type="text" class="form-control" name="nombre" placeholder="Nombre de la institucion...">'
    + '</div>'

    + '<div class="row">'
    + '<div class="col-md-8">'
    + '<div class="form-group">'
    + '<input type="text" class="form-control" name="calle" placeholder="Calle">'
    + '</div>'
    + '</div>'
    + '<div class="col-md-2">'
    + '<div class="form-group">'
    + '<input type="text" class="form-control" name="no" placeholder="#">'
    + '</div>'
    + '</div>'
    + '<div class="col-md-2">'
    + '<div class="form-group">'
    + '<input type="text" class="form-control" name="cp" placeholder="Cp">'
    + '</div>'
    + '</div>'
    + '</div>'

    + '<div class="row">'
    + '<div class="col-md-6">'
    + '<div class="form-group">'
    + '<input type="text" class="form-control" name="colonia" placeholder="Colonia">'
    + '</div>'
    + '</div>'
    + '<div class="col-md-6">'
    + '<div class="form-group">'
    + '<input type="text" class="form-control" name="municipio" placeholder="Municipio">'
    + '</div>'
    + '</div>'
    + '</div>'

    + '<div class="row">'
    + '<div class="col-md-6">'
    + '<div class="form-group">'
    + '<input type="text" class="form-control" name="telefono" placeholder="Telefono">'
    + '</div>'
    + '</div>'
    + '<div class="col-md-6">'
    + '<div class="form-group">'
    + '<input type="text" class="form-control" name="tipoInstitucion" placeholder="Tipo de Institucion">'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'

    + '<div class="col-sm-4">'
    + '<div style="height: 90%; background-color: rgba(255,0,0,0.1);">'
    + '<iframe id="iframeContainer" class="w-100 h-100" src="" title="Evidencia"> </iframe>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'

    + '<div class="row"> '
    + '<div class="col-sm">'
    + '<button type="submit" class="btn btn-primary btn-user btn-block">'
    + 'Siguiente'
    + '</button>'
    + '</div>'
    + '</div>'
    + '</form>';


$(function () {
    console.log("escuelas");
    auxToken[0] = window.localStorage.getItem('auxToken');

    syncronizarFormEscuelas();

    if ($('#bodyEscuelasTable').length)
        readEscuelasPaginadas(1);

    formDatoisDone('idEscuela', 1);
});

function syncronizarFormEscuelas() {
    $('#injectedForm').append(strFormInject);

    $("#formAddEscuelas").validate({
        rules: {
            nombre: { required: true, minlength: 10 },
            calle: { required: true },
            no: { required: true },
            cp: { required: true },
            colonia: { required: true },
            municipio: { required: true },
            telefono: {
                required: true,
                number: true,
                minlength: 7,
                maxlength: 10
            },
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
            telefono: {
                required: 'Agrega el numero de telefono',
                number: 'solo se aceptan numeros',
                minlength: 'el numero es muy corto',
                maxlength: 'el numero esta incorrecto es muy largo'
            },
            tipoInstitucion: { required: 'Seleciona el tipo de institucion' },
            file: { required: "Seleccione el archivo" }
        },
        submitHandler: function () {
            console.log("================ Agregar Escuela ===============");
            const urlParams = new URLSearchParams(window.location.search); 
            const idAlumno = parseInt(urlParams.get('alumno'));

            let data = {
                name: "addEscuela",
                param: {
                    idAlumno: idAlumno,
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

                let status = res.response.status;
                status ? location.href = `/educacion/views/datosPadre/addDatosPadre.php?step=2&alumno=${idAlumno}` : mostrarRequestAlerResult(res.response.status);

            }, auxToken[0],false);
        }
    });
}

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