const auxToken = [];

const strFormInject = '<form id="formAddRequisitosAdicionales">'
                    
                    +       '<div class="form-group">'
                    +           '<label>La escuela esta dentro del municipio</label>'
                    +           '<select class="form-control" name="escuelaDentroMunicipio" aria-label="Floating label select example">'
                    +               '<option value=""></option>'
                    +               '<option value="si">Si</option>'
                    +               '<option value="no">No</option>'
                    +           '</select>'
                    +        '</div>'

                    +       '<div class="row">'
                    +           '<div class="col-md-6">'
                    +               '<label>Tipo de transporte</label>'
                    +               '<select class="form-control" name="tipoTransporte" aria-label="Floating label select example">'
                    +                   '<option value=""></option>'
                    +                   '<option value="caminando">Caminando</option>'
                    +                   '<option value="transporte publico">Transporte publico</option>'
                    +                   '<option value="bicicleta">Bicicleta</option>'
                    +                   '<option value="moto">Moto</option>'
                    +                   '<option value="carro">Carro</option>'
                    +               '</select>'
                    +          '</div>'
                    +          '<div class="col-md-6">'
                    +               '<div class="form-group">'
                    +                   '<label>Tiempo de traslado en minutos</label>'
                    +                   '<input type="text" class="form-control" name="tiempoTranslado" placeholder="Tiempo de Traslado">'
                    +               '</div>'
                    +          '</div>'
                    +       '</div>'


                    +       '<div class="row">'
                    +           '<div class="col-md-6">'
                    +               '<div class="form-group">'
                    +                   '<label>Material del techo en casa</label>'
                    +                   '<select class="form-control" name="tipoTechoCasa" aria-label="Floating label select example">'
                    +                       '<option value=""></option>'
                    +                       '<option value="concreto">Concreto</option>'
                    +                       '<option value="lamina">Lamina</option>'
                    +                       '<option value="carton u otro">Carton u Otro</option>'
                    +                   '</select>'
                    +               '</div>'
                    +           '</div>'
                    +           '<div class="col-md-6">'
                    +               '<div class="form-group">'
                    +                   '<label>Cuenta con toma de agua</label>'
                    +                   '<select class="form-control" name="aguaEnCasa" aria-label="Floating label select example">'
                    +                       '<option value=""></option>'
                    +                       '<option value="en casa">En su casa</option>'
                    +                       '<option value="comunitaria">Comunitaria</option>'
                    +                       '<option value="no tiene">No tiene</option>'
                    +                   '</select>'
                    +               '</div>'
                    +           '</div>'
                    +       '</div>'


                    +       '<div class="row">'
                    +           '<div class="col-md-8">'
                    +               '<label>Tipo de material del piso en casa</label>'
                    +                   '<select class="form-control" name="tipoMaterialPisoCasa" aria-label="Floating label select example">'
                    +                       '<option value=""></option>'
                    +                       '<option value="tierra">Tierra</option>'
                    +                       '<option value="ladrillo o semento">Ladrillo o semento</option>'
                    +                   '</select>'
                    +           '</div>'
                    +           '<div class="col-md-4">'
                    +               '<label>Cuenta con energia electrica</label>'
                    +               '<select class="form-control" name="energiaElectrica" aria-label="Floating label select example">'
                    +                   '<option value=""></option>'
                    +                   '<option value="si">Si</option>'
                    +                   '<option value="no">No</option>'
                    +               '</select>'
                    +           '</div>'
                    +       '</div>'


                    +       '<div class="row">'
                    +          '<div class="col-md-8">'
                    +               '<label>Tipo de material de los muros en casa</label>'
                    +               '<select class="form-control" name="tipoMaterialMurosCasa" aria-label="Floating label select example">'
                    +                   '<option value=""></option>'
                    +                   '<option value="ladrillo o block">Ladrillo o Block</option>'
                    +                   '<option value="adobe, lamina o teja">Adobe, lamina o teja</option>'
                    +                   '<option value="carton o madera">Carton o madera</option>'
                    +                '</select>'
                    +           '</div>'
                    +           '<div class="col-md-4">'
                    +               '<label>Recibe otro apoyo</label>'
                    +               '<select class="form-control" name="recibeOtroApoyo" aria-label="Floating label select example">'
                    +                   '<option value=""></option>'
                    +                   '<option value="si">Si</option>'
                    +                   '<option value="no">No</option>'
                    +               '</select>'
                    +           '</div>'
                    +       '</div>'

                    +       '<div class="form-group mt-2">'
                    +           '<label>Tipo de Apoyo</label>'
                    +               '<input type="text" class="form-control" name="tipoApoyo">'
                    +       '</div>'

                    +       '<div class="col-auto">'
                    +          '<button type="submit" class="btn btn-primary btn-user btn-block">'
                    +              'Siguiente'                    
                    +          '</button>'
                    +       '</div>'
                    
                    + '</form>';

$(function (){
    console.log("requisitos Adicionales");
    auxToken[0] = window.localStorage.getItem('auxToken');

    const urlParams = new URLSearchParams(window.location.search);
    const folio = urlParams.get('folio');
    const hiddenInputFolio = `<input type='hidden' value=\"${folio}\" id='folio'>`;
    syncronizarFormRequisitosAdicionales(hiddenInputFolio);


    formDatoisDone('idRequisitosAdicionales',5);
})

function syncronizarFormRequisitosAdicionales(hiddenInputFolio){
    $('#injectedForm').append(hiddenInputFolio+strFormInject);
        $('#formAddRequisitosAdicionales').validate({
            rules:{
                escuelaDentroMunicipio:{required:true},
                tipoTransporte:{required:true},
                tiempoTranslado:{required:true},
                tipoTechoCasa:{required:true},
                aguaEnCasa:{required:true},
                tipoMaterialPisoCasa:{required:true},
                energiaElectricaCasa:{required:true},
                tipoMaterialMurosCasa:{required:true},
                recibeOtroApoyo:{required:true},
                tipoApoyo:{required:true}
            },
            messages:{
                escuelaDentroMunicipio:{required:'Seleccione una opcion'},
                tipoTransporte:{required:'Seleccione una opcion'},
                tiempoTranslado:{required:'Agrege su respuesta'},
                tipoTechoCasa:{required:'Seleccione una opcion'},
                aguaEnCasa:{required:'Seleccione una opcion'},
                tipoMaterialPisoCasa:{required:'Seleccione una opcion'},
                energiaElectricaCasa:{required:'Seleccione una opcion'},
                tipoMaterialMurosCasa:{required:'Seleccione una opcion'},
                recibeOtroApoyo:{required:'Agrege su respuesta'},
                tipoApoyo:{required:'Si no cuenta con apoyo, escriba Ninguno'}
            },
            submitHandler:function (){
                console.log("================ Registrar requisitos Adicionales ===============");
                let data = {
                    name:"addRequisitosAdicionales",
                    param:getFormData($("#formAddRequisitosAdicionales"))
                }
                console.log(data);

                request('/educacion/Api/apiRequisitosAdicionales.php',data,function (res){
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
                        name: "updateSolicitudIdRequisitosAdicionales",
                        param: {
                            idSolicitud: folio,
                            idRequisitosAdicionales: inserted
                        }
                    }

                    request('/educacion/Api/apiSolicitudes.php', dataUpdateSolicitud, function (res) {
                        console.log(res);
                        if (res.hasOwnProperty('error')) {
                            alert(res.error.message);
                            return;
                        }

                        let status = res.response.status;
                        status ? location.href = `/educacion/views/solicitudes/updateSolicitud.php?step=6&folio=${folio}` : mostrarRequestAlerResult(status)
                    },auxToken[0]);
                },auxToken[0]);
            }
        });
} 