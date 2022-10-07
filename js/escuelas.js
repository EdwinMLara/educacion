$("#formAddEscuelas").validate({
    SubmitHandler: function () {
        console.log("Probando");
    } 
})

const readEscuelasPaginadas = (page) => {
    console.log(`============== Mostrar escuelas pagina: ${page} ================`);
    let perPage = $("#selectPerPage :selected").val();

    let data = {
        name:"getEscuelas",
        param:{
            page,
            perPage
        }
    }

    console.log(data);
    request('/educacion/Api/apiEscuelas.php',data, function (res) { 
        console.log(res);
        if(!res.hasOwnProperty('error')){
            let numDatos = res.response.result.total;
            let usuarios = res.response.result.escuelas;
            let trHTML = '';
        }else{
            alert(res.error.message);
        }
    });
}

$(function (){
    readEscuelasPaginadas(1);
})