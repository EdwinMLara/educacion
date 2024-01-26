const auxToken = [];
const strFormInject = '<form id="formIngresosFamiliares" autocomplete="off">'
                    +  '<div class="row">'
                    +      '<div class="col-sm-8 ">'

                    +          '<div class="form-group mb-4">'
                    +              '<label for="inputGroupFile01">Constancia de Ingresos Familiares</label>'
                    +              '<div class="custom-file">' 
                    +                   '<input id="file" type="file" name="file" class="custom-file-input" accept="application/pdf" onchange="showPdf(this)">'
                    +                   '<label id="fileLabel" class="custom-file-label" for="inputGroupFile01">Selecciona el archivo</label>'
                    +              '</div>'
                    +          '</div>'

                    +           '<div class="row">'
                    +               '<div class="col-md-6">'
                    +                   '<div class="form-group">'
                    +                       '<input type="text" class="form-control" name="ingresoPapa" placeholder="Ingresos Papa">'
                    +                   '</div>'
                    +               '</div>'
                    +               '<div class="col-md-6">'
                    +                   '<div class="form-group">'
                    +                       '<input type="text" class="form-control" name="ingresoMama" placeholder="Ingresos Mama">'
                    +                   '</div>'
                    +               '</div>'
                    +           '</div>'


                    +           '<div class="row">'
                    +               '<div class="col-md-6">'
                    +                   '<div class="form-group">'
                    +                       '<input type="text" class="form-control" name="ingresoHermanos" placeholder="Ingresos Hermanos">'
                    +                   '</div>'
                    +               '</div>'
                    +               '<div class="col-md-6">'
                    +                   '<div class="form-group">'
                    +                       '<input type="text" class="form-control" name="ingresoAbuelos" placeholder="Ingresos Abuelos">'
                    +                   '</div>'
                    +               '</div>'
                    +           '</div>'

                    +           '<div class="form-group">'
                    +               '<input type="text" class="form-control" name="personasDependientes" placeholder="Personas Dependientes de este ingreso">'
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
    console.log("Ingresos Familiares");
    auxToken[0] = window.localStorage.getItem('auxToken');

    syncronizarFormFamiliares();

    formDatoisDone('idIngresosFamiliares',3);
})


function syncronizarFormFamiliares(){
    $('#injectedForm').append(strFormInject);
    
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
            file: { required : "Seleccione el archivo"},
            ingresoPapa: { required: 'Agregar el ingreso del padre', digits: 'Solo numeros'},
            ingresoMama: { required: 'Agregar el ingreso de mama', digits: 'Solo numeros' },
            ingresoHermanos: { required: 'Agregar el ingreso de los hermanos', digits: 'Solo numeros' },
            ingresoAbuelos: { required: 'Agregar el ingreso de los abuelos', digits: 'Solo numeros' },
            personasDependientes: { required: 'Agrega el numero de personas que dependen del ingreso', digits: 'Solo numeros', max: 'el numero es muy grande'}
        },
        submitHandler: function () {
            console.log("================== Registrar Ingresos Familiares ================= ");

            const urlParams = new URLSearchParams(window.location.search); 
            const idAlumno = urlParams.get('alumno');

            let data = {
                name: "addIngresosFamiliares",
                param: {
                    idAlumno,
                    ...getFormData($("#formIngresosFamiliares")),
                    file: blobPdf[0] 
                }
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

                let status = res.response.status;
                    status ? location.href = `/educacion/views/servicios/addServicios.php?step=4&alumno=${idAlumno}` : mostrarRequestAlerResult(status)
        },auxToken[0]);
        }
    });
}