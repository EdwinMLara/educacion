const auxToken = [];
const strFormInject = '<form id="formAddServicios" autocomplete="off">'
                    +  '<div class="row mb-4">'
                    +      '<div class="col-sm-8 ">'

                    +          '<div class="form-group mb-4">'
                    +              '<label for="inputGroupFile01">Comprobante de Domicilio</label>'
                    +              '<div class="custom-file">' 
                    +                   '<input id="file" type="file" name="file" class="custom-file-input" accept="application/pdf, image/png, image/jpeg, image/jpg" onchange="showPdf(this)">'
                    +                   '<label id="fileLabel" class="custom-file-label" for="inputGroupFile01">Selecciona el archivo</label>'
                    +              '</div>'
                    +          '</div>'

                    +           '<div class="row">'
                    +               '<div class="col-md-6">'
                    +                   '<label>Cuenta con calle pavimentadas</label>'
                    +                   '<select class="form-control" name="callesPavimentadas" aria-label="Floating label select example">'
                    +                       '<option value="">seleccione su respuesta</option>'
                    +                       '<option value="si">Si</option>'
                    +                       '<option value="no">No</option>'
                    +                   '</select>'
                    +               '</div>'
                    +               '<div class="col-md-6">'
                    +                   '<label>Cuenta con drenaje</label>'
                    +                   '<select class="form-control" name="drenaje" aria-label="Floating label select example">'
                    +                       '<option value="">seleccione su respuesta</option>'
                    +                       '<option value="si">Si</option>'
                    +                       '<option value="no">No</option>'
                    +                   '</select>'
                    +               '</div>'
                    +           '</div>'

                    +           '<div class="row">'
                    +               '<div class="col-md-6">'
                    +                   '<label>Cuenta con biblioteca</label>'
                    +                   '<select class="form-control" name="biblioteca" aria-label="Floating label select example">'
                    +                       '<option value="">seleccione su respuesta</option>'
                    +                       '<option value="si">Si</option>'
                    +                       '<option value="no">No</option>'
                    +                   '</select>'
                    +               '</div>'
                    +               '<div class="col-md-6">'
                    +                   '<label>Hay recoleccion de basura</label>'
                    +                   '<select class="form-control" name="recoleccionBasura" aria-label="Floating label select example">'
                    +                       '<option value="">seleccione su respuesta</option>'
                    +                       '<option value="si">Si</option>'
                    +                       '<option value="no">No</option>'
                    +                   '</select>'
                    +               '</div>'
                    +           '</div>'

                    +           '<div class="row">'
                    +               '<div class="col-md-6">'
                    +                   '<label>Hay Alumbrado publico</label>'
                    +                       '<select class="form-control" name="alumbradoPublico" aria-label="Floating label select example">'
                    +                           '<option value="">seleccione su respuesta</option>'
                    +                           '<option value="si">Si</option>'
                    +                           '<option value="no">No</option>'
                    +                       '</select>'
                    +               '</div>'
                    +               '<div class="col-md-6">'
                    +                   '<label>Cuenta con telefono publico</label>'
                    +                   '<select class="form-control" name="telefonoPublico" aria-label="Floating label select example">'
                    +                       '<option value="">seleccione su respuesta</option>'
                    +                       '<option value="si">Si</option>'
                    +                       '<option value="no">No</option>'
                    +                   '</select>'
                    +               '</div>'
                    +           '</div>'

                    +           '<div class="row">'
                    +               '<div class="col-md-6">'
                    +                   '<label>Cuenta con transporte publico</label>'
                    +                   '<select class="form-control" name="transportePublico" aria-label="Floating label select example">'
                    +                       '<option value="">seleccione su respuesta</option>'
                    +                       '<option value="si">Si</option>'
                    +                       '<option value="no">No</option>'
                    +                   '</select>'
                    +               '</div>'
                    +               '<div class="col-md-6">'
                    +                   '<label>Cuenta con red de agua potable</label>'
                    +                   '<select class="form-control" name="aguaPotable" aria-label="Floating label select example">'
                    +                       '<option value="">seleccione su respuesta</option>'
                    +                       '<option value="si">Si</option>'
                    +                       '<option value="no">No</option>'
                    +                   '</select>'
                    +               '</div>'
                    +           '</div>'


                    +           '<div class="row">'
                    +               '<div class="col-md-6">'
                    +                   '<label>Hay juego o canchas deportivas</label>'
                    +                   '<select class="form-control" name="juegosOCanchas" aria-label="Floating label select example">'
                    +                       '<option value="">seleccione su respuesta</option>'
                    +                       '<option value="si">Si</option>'
                    +                       '<option value="no">No</option>'
                    +                   '</select>'
                    +               '</div>'
                    +               '<div class="col-md-6">'
                    +               '</div>'
                    +           '</div>'

                    +      '</div>'

                    +      '<div class="col-sm-4">'
                    +          '<div style="height: 90%; background-color: rgba(255,0,0,0.1);">'
                    +              '<iframe id="iframeContainer" class="w-100 h-100" src="" title="Evidencia"> </iframe>'                    
                    +          '</div>'
                    +      '</div>'

                    +  '</div>'
                    + '</div>'

                    +  '<div class="row"> '
                    +      '<div class="col-sm">'
                    +          '<button type="submit" class="btn btn-primary btn-user btn-block">'
                    +              'Siguiente'                    
                    +          '</button>'
                    +      '</div>'
                    +  '</div>'
                    + '</form>';

$(function () {
    console.log("servicios");
    auxToken[0] = window.localStorage.getItem('auxToken');

    syncronizarFormServicios();

    formDatoisDone('idServicios',4);
});

function syncronizarFormServicios(){
    $('#injectedForm').append(strFormInject);
    
    $("#formAddServicios").validate({
        rules: {
            file: { required : true},
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
            file: { required : "Seleccione el archivo"},
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
            const urlParams = new URLSearchParams(window.location.search); 
            const idAlumno = urlParams.get('alumno');

            let data = {
                name: "addServicios",
                param: {
                    idAlumno,
                    ...getFormData($("#formAddServicios")),
                    file:blobPdf[0]
                }
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

                let status = res.response.status;
                status ? location.href = `/educacion/views/requisitosAdicionales/addRequisitosAdicionales.php?step=5&alumno=${idAlumno}` : mostrarRequestAlerResult(status)

            },auxToken[0],false);
        }
    });
}