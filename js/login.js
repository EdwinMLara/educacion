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
        password: { required: 'teclea la contraseña' }
    },
    submitHandler: function () {
        console.log("=============  iniciar Sesion =============");

        let data = {
            name: "generateToken",
            param: getFormData($("#formLogin"))
        }
        console.log(data);

        let username = data.param.username

        $.ajax({
            url: 'http://192.168.1.72/educacion/Api/apiUsuarios.php',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Origin', 'http://192.168.1.72:80/');
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
                    window.localStorage.setItem('username', username);
                    window.localStorage.setItem('tipoCuenta',res.response.result.tipoCuenta);
                    res.response.status === 200 ? location.href = `/educacion/` : null;
                    return;
                }

                alert('Error fatal consulte al Desarrollador')
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    }
});

const loggedOut = (e) => {
    console.log("logged out");
    window.localStorage.setItem('token', null);
    window.localStorage.setItem('username', null);
    location.href = `/educacion/views/login.php`
}
