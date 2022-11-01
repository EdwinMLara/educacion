$(function () {
    console.log("login");
});

$('#formLogin').validate({
    rules: {
        username: { required: true },
        password: { required: true }
    },
    messages: {
        username: { required: 'agrega tu nombre de usuario' },
        password: { required: 'tecle su contraseña' }
    },
    submitHandler: function () {
        console.log("=============  iniciar Sesion =============");

        let data = {
            name: "generateToken",
            param: getFormData($("#formLogin"))
        }
        console.log(data);

        $.ajax({
            url: 'http://localhost/educacion/Api/apiUsuarios.php',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (res) {
                console.log(res);
                if (res.hasOwnProperty('error')) {
                    let message = res.error.message;
                    let Response = `<div class="alert alert-danger"><strong>Error!</strong> ${message}.</div>`;
                    $("#alert").empty();
                    $("#alert").append(Response);
                    return;
                }

                if(res.hasOwnProperty('response')){
                    window.localStorage.setItem('token', res.response.result.token);
                    res.response.status === 200 ? location.href = `/educacion/` : null;
                    return;
                }

                alert('Error fatal consulte al Desarrollador')
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    }
});