$(function () {
    console.log('solicitud');
});


$('#formUpdateSolicitud').validate({
    rules: {
        nivelEstudios:{
            required:true
        },
        promedioReciente: {
            required: true,
            min: 0,
            max: 10
        }
    },
    messages: {
        nivelEstudios:{
            required:'Agrege el nivel de estudios'
        },
        promedioReciente: {
            required: 'tecle el promedio del perido pasado',
            min: 'agrege valor mayor a 0',
            max: 'agrege valor menor a 10'
        }
    },
    submitHandler: function (res) {
        console.log("================ Registrar solicitud de beca ===============");
        
        let dataUpdateSolicitud = {
            name: "updateSolicitud",
            param: getFormData($("#formUpdateSolicitud"))
        }

        console.log(dataUpdateSolicitud);
        request('/educacion/Api/apiSolicitudes.php',dataUpdateSolicitud,function (res){
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
            status ? location.href = alert('Se ha registrado su solicitud') : mostrarRequestAlerResult(status)
        });
    }
});