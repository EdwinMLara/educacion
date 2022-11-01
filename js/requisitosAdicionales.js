$(function (){
    console.log("requisitos Adicionales");
})

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
        tipoApoyo:{required:'Agrege su respuesta'}
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
            });
        });
    }
})