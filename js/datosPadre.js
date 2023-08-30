const auxToken = [];

const strFormInject = '<form id="formAddDatosPadre" autocomplete="off">'
                    +  '<div class="row">'
                    +      '<div class="col-sm-8 ">'

                    +          '<div class="form-group mb-4">'
                    +              '<label for="inputGroupFile01">Credencial de Lector</label>'
                    +              '<div class="custom-file">' 
                    +                   '<input id="file" type="file" name="file" class="custom-file-input" accept="application/pdf" onchange="showPdf(this)">'
                    +                   '<label id="fileLabel" class="custom-file-label" for="inputGroupFile01">Selecciona el archivo</label>'
                    +              '</div>'
                    +          '</div>'

                    +          '<div class="form-group">'
                    +              '<input type="text" class="form-control" name="nombre" placeholder="Nombre del Padre">'
                    +          '</div>'

                    +          '<div class="form-group">'
                    +              '<input type="text" class="form-control" name="telefono" placeholder="Telefono">'
                    +          '</div>'

                    +          '<div class="form-group">'
                    +              '<label>Fecha de nacimiento</label>'
                    +              '<input type="date" class="form-control" name="fechaNacimiento" placeholder="Fecha de Nacimiento">'
                    +          '</div>'

                    +          '<div class="form-group">'
                    +              '<input type="text" class="form-control" name="curp" placeholder="Curp">'
                    +          '</div>'

                    +           '<div class="row">'
                    +               '<div class="col-md-8">'
                    +                   '<div class="form-group">'
                    +                       '<input type="text" class="form-control" name="calle" placeholder="Calle">'
                    +                   '</div>'
                    +               '</div>'
                    +               '<div class="col-md-4">'
                    +                   '<div class="form-group">'
                    +                       '<input type="text" class="form-control" name="no" placeholder="#">'
                    +                    '</div>'
                    +                '</div>'
                    +           '</div>'

                    +           '<div class="row">'
                    +               '<div class="col-md-8">'
                    +                   '<div class="form-group">'
                    +                       '<input type="text" class="form-control" name="colonia" placeholder="Colonia">'
                    +                   '</div>'
                    +               '</div>'
                    +               '<div class="col-md-4">'
                    +                   '<div class="form-group">'
                    +                       '<input type="text" class="form-control" name="cp" placeholder="Cp">'
                    +                   '</div>'
                    +               '</div>'
                    +            '</div>'

                    +          '<div class="form-group">'
                    +              '<input type="text" class="form-control" name="municipio" placeholder="Municipio">'
                    +          '</div>'

                    +          '<div class="form-group">'
                    +               '<label>Grado de Estudios</label>'
                    +               '<select class="form-control" name="gradoEstudios" aria-label="Floating label select example">'
                    +                   '<option value=""></option>'
                    +                   '<option value="primaria">Primaria</option>'
                    +                   '<option value="secundaria">Secundaria</option>'
                    +                   '<option value="preparatoria">Preparatoria</option>'
                    +                   '<option value="universidad">Univesidad</option>'
                    +               '</select>'
                    +           '</div>'

                    +           '<div class="row">'
                    +               '<div class="col-md-5">'
                    +                   '<label>Trabajo en los Ulimos 6 meses</label>'
                    +                   '<select class="form-control" name="trabajo6Meses" aria-label="Floating label select example">'
                    +                       '<option value=""></option>'
                    +                       '<option value="si">Si</option>'
                    +                       '<option value="no">No</option>'
                    +                   '</select>'
                    +               '</div>'
                    +               '<div class="col-md-7">'
                    +                   '<label><br /></label>'
                    +                   '<div class="form-group">'
                    +                       '<input type="text" class="form-control" name="motivoNoTrabajo" value="Sin motivo" placeholder="Motivo de no trabajo">'
                    +                   '</div>'
                    +               '</div>'
                    +           '</div>'

                    +           '<div class="form-group">'
                    +               '<label>Cuenta con Seguro Medico</label>'
                    +               '<select class="form-control" name="seguroMedico" aria-label="Floating label select example">'
                    +                   '<option value=""></option>'
                    +                   '<option value="ninguno">Ninguno</option>'
                    +                   '<option value="privado">Privado</option>'
                    +                   '<option value="seguro social">Seguro Social</option>'
                    +                   '<option value="IMSS">IMSS</option>'
                    +                   '<option value="ISSSTE">ISSSTE</option>'
                    +               '</select>'
                    +           '</div>'
                    +       '</div>'

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
    console.log("datos Padre");
    auxToken[0] = window.localStorage.getItem('auxToken');

    const urlParams = new URLSearchParams(window.location.search);
    const folio = urlParams.get('folio');
    const hiddenInputFolio = `<input type='hidden' value=\"${folio}\" id='folio'>`;
    
    const current_curp = window.localStorage.getItem('current_curp');
    console.log(current_curp);
    
    syncronizarFormDatosPadre(hiddenInputFolio,current_curp);
    
    formDatoisDone('idPadre',2);
});

/**
 * regex for a phone number i dont gonna used anymore
 * regexPhone: '[0-9]{3}-[0-9]{3}-[0-9]{4}' */

function syncronizarFormDatosPadre(hiddenInputFolio,current_curp){
    $('#injectedForm').append(hiddenInputFolio+strFormInject);

    $.validator.addMethod(
        "curpPadreAlumno",
        function (value, element, current_curp) {
            console.log(current_curp,"  ",value); 
            if (current_curp.localeCompare(value) === 0)
                return false;
            return true;
        },
        "Esta es la curp del alumno"
    );

    $('#formAddDatosPadre').validate({
        rules: {
            file: { required: true },
            nombre: { required: true },
            telefono: {  
                required:true,
                number:true,
                minlength:7,
                maxlength:10
            },
            fechaNacimiento: { required: true },
            curp: {
                regexCurp: '[A-Z]{1}[AEIOU]{1}[A-Z]{2}'
                    + '[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])'
                    + '[HM]{1}'
                    + '(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)'
                    + '[B-DF-HJ-NP-TV-Z]{3}'
                    + '[0-9A-Z]{1}'
                    + '[0-9]{1}$',
                curpPadreAlumno: current_curp
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
            file: { required : "Seleccione el archivo"},
            nombre: { required: 'Agrege el nombre' },
            telefono:{
                required:'Agrega el numero de telefono',
                number:'solo se aceptan numeros',
                minlength:'el numero es muy corto',
                maxlength:'el numero esta incorrecto es muy largo'
            },
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
                param: { ...getFormData($("#formAddDatosPadre")), file: blobPdf[0] }
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
                    name: "updateSolicitudIdPadre",
                    param: {
                        idSolicitud: folio,
                        idPadre: inserted
                    }
                }

                request('/educacion/Api/apiSolicitudes.php', dataUpdateSolicitud, function (res) {
                    console.log(res);
                    if (res.hasOwnProperty('error')) {
                        alert(res.error.message);
                        return;
                    }

                    let status = res.response.status;
                    status ? location.href = `/educacion/views/ingresosFamiliares/addIngresosFamiliares.php?step=3&folio=${folio}` : mostrarRequestAlerResult(status)
                },auxToken[0]);
            },auxToken[0]);
        }
    });
}