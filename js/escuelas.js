//falta agregar las funciones de actulizar y eliminar 

$("#formAddEscuelas").validate({
    rules:{
        nombre:{
            required:true
        },
        calle:{
            required:true
        },
        no:{
            required:true
        },
        colonia:{
            required:true
        },
        municipio:{
            required:true
        },
        telefono:{
            required:true
        },
        tipoInstitucion:{
            required:true
        }
    },
    messages:{
        nombre:{
            required:'Teclea el nombre por favor'
        },
        calle:{
            required:'Teclea la calle por favor'
        },
        no:{
            required:'Agrega el numero'
        },
        colonia:{
            required:'Teclea la colonia'
        },
        municipio:{
            required:'Teclea el municipio'
        },
        telefono:{
            required:'Agrega el telefono'
        },
        tipoInstitucion:{
            required: 'Seleciona el tipo de institucion'
        }
    },
    submitHandler:function () {
        console.log("================ Agregar Escuela ===============");
        let data = {
            name:"addEscuela",
            param:getFormData($("#formAddEscuelas"))
        }

        console.log(data);

        request('/educacion/Api/apiEscuelas.php',data,function (res){
            console.log(res);
            if (res.hasOwnProperty('error')){
                alert(res.error.message);
                return
            }

            mostrarRequestAlerResult(res.response.status);
        });
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
        if (res.hasOwnProperty('error')){
            alert(res.error.message);
            return
        }

        let numDatos = res.response.result.total;
        let escuelas = res.response.result.escuelas;
        let trHTML = '';

        escuelas.forEach(escuela => {
            trHTML +='<tr>'
                        +'<td>' + escuela.nombre + '</td>'
                        +'<td>' + escuela.calle + '</td>'
                        +'<td>' + escuela.no + '</td>'
                        +'<td>' + escuela.colonia + '</td>'
                        +'<td>' + escuela.municipio + '</td>'
                        +'<td>' + escuela.telefono + '</td>'
                        +'<td>' + escuela.tipoInstitucion + '</td>'
                        + '<td>'  
                            + `<button type="button" onclick="location.href=\'./updateEscuelas.php?idEscuelas=${escuela.idEscuela}&nombre=${escuela.nombre}\'" class="btn btn-warning"><i class="far fa-edit" aria-hidden="true"></i></button>`
                            + `<button type="button" onclick="deleteUsuario(${escuela.idEscuela})" class="btn btn-danger"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>`
                    +'</tr>'
        });

        $('#bodyEscuelasTable').empty();
        $('#bodyEscuelasTable').append(trHTML);

        insertStrPaginador(numDatos,page,perPage,"readEscuelasPaginadas");
    });
}

$(function () {
    if($('#bodyEscuelasTable').length)
        readEscuelasPaginadas(1);
})