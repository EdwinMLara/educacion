/** revisar evento de buscar cuando no hay nada*/

//Crear usuario
$("#formAddUsuarios").validate({ // initialize the plugin
    rules: {
        username: {
            required: true,
            minlength: 5
        },
        password: {
            required: true,
            minlength: 5
        },
    },
    messages: {
        username: {
            required: 'Teclea el nombre de usuario',
            minlength: 'Teclea al menos 5 caracteres'
        },
        password: {
            required: 'Teclea una contraseña',
            minlength: 'Teclea al menos 5 caracteres'
        }
    },
    submitHandler: function () {
        console.log("=============  Agregar usuario =============");
        let data = {
            name: "addUser",
            param: getFormData($("#formAddUsuarios"))
        }
        console.log(data);

        $.ajax({
            url: '/educacion/Api/apiUsuarios.php',
            type: "POST",
            dataType: 'json',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + token);
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (res) {
                console.log(res);
                if (!res.hasOwnProperty('error')) {
                    let trueResponse = '<div class="alert alert-success"><strong>Success!</strong> Se ha Actualizado correctamente al usuario.</div>';
                    let falseResponse = '<div class="alert alert-danger"><strong>Error!</strong> Algo ha salido mal al actualizar el usuario.</div>';
                    let status = res.response.status;
                    status === 200 ? $("#alertAddUsuarios").append(trueResponse) : $("#alertAddUsuarios").append(falseResponse);
                } else {
                    alert(res.error.message);
                }
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    }
});

/*
* Leer Datos Read
* Validar expiro el token
quitar onclick  al desactivar
creo hay un error la paginar pocos pero necesito avanzar*/

const paginar = (page) => {
    console.log("=============  Leer Usuarios Paginando =============");
    let perPage = $("#selectPerPage :selected").val();

    let data = {
        name: "getUserPaginate",
        param: {
            page,
            perPage
        }
    }
    request('/educacion/Api/apiUsuarios.php', data, function (res) {
        console.log(res);
        if (!res.hasOwnProperty('error')) {
            let numDatos = res.response.result.total;
            let usuarios = res.response.result.usuarios;

            let trHTML = '';
            usuarios.forEach(user => {
                trHTML += '<tr><td>' + user.idUsuarios + '</td><td>'
                    + user.username + '</td><td>' + user.password
                    + '</td><td>' + user.tipoCuenta + '</td><td>'
                    + `<button type="button" onclick="location.href=\'./updateUsuarios.php?idUsuarios=${user.idUsuarios}&username=${user.username}\'" class="btn btn-warning"><i class="far fa-edit" aria-hidden="true"></i></button>`
                    + `<button type="button" onclick="deleteUsuario(${user.idUsuarios})" class="btn btn-danger"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>`
                    + '</td></tr>';
            });

            $('#bodyUsuariosTable').empty();
            $('#bodyUsuariosTable').append(trHTML);
            insertStrPaginador(numDatos,page,perPage,"paginar");
        }
    });
}

$(function () {
    paginar(1);
});

/**Actualizar datos de usuario */
$("#formUpdateUsuarios").validate({
    rules: {
        username: {
            required: true,
            minlength: 5
        },
        password: {
            required: true,
            minlength: 5
        },
    },
    messages: {
        username: {
            required: 'Teclea el nombre de usuario',
            minlength: 'Teclea al menos 5 caracteres'
        },
        password: {
            required: 'Teclea una contraseña',
            minlength: 'Teclea al menos 5 caracteres'
        }
    },
    submitHandler: function () {
        console.log("=================== Actualizando Usuario ===============");
        let data = {
            name: "updateUser",
            param: getFormData($("#formUpdateUsuarios"))
        }
        //console.log(data);

        $.ajax({
            url: '/educacion/Api/apiUsuarios.php',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + token);
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (res) {
                //console.log(res);
                if (!res.hasOwnProperty('error')) {
                    let trueResponse = '<div class="alert alert-success"><strong>Success!</strong> Se ha Agreado correctamente al usuario.</div>';
                    let falseResponse = '<div class="alert alert-danger"><strong>Error!</strong> Algo ha salido mal al ingresar el usuario.</div>';
                    let status = res.response.status;
                    status === 200 ? $("#alertUpdateUsuarios").append(trueResponse) : $("#alertUpdateUsuarios").append(falseResponse);
                } else {
                    alert(res.error.message);
                }
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    }
});


/**Eliminar Usuario */
const deleteUsuario = (id) => {
    if (confirm('Desea eliminar el usuario')) {
        console.log("=================== Eliminar Usuario ===============");

        let data = {
            name: "deleteUser",
            param: {
                idUsuarios: id
            }
        }

        $.ajax({
            url: '/educacion/Api/apiUsuarios.php',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(data),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + token);
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (res) {
                console.log(res);
                if (!res.hasOwnProperty('error')) {
                    let status = res.response.status;
                    status === 200 ? location.reload() : alert('Error al eliminar');
                } else {
                    alert(res.error.message);
                }
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    }
}

$("input[name=search]").on('change', function () {
    let buscar = $(this).val();

    console.log("============= Buscar en Usuarios por Nombre =============");
    let data = {
        name: "getByNameLike",
        param: {
            buscar
        }
    }

    $.ajax({
        url: '/educacion/Api/apiUsuarios.php',
        type: "POST",
        dataType: 'json',
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + token);
            xhr.setRequestHeader('Content-Type', 'application/json');
        },
        success: function (res) {
            console.log(res);
            if (!res.hasOwnProperty('error')) {
                let usuarios = res.response.result.usuarios;

                let trHTML = '';
                usuarios.forEach(user => {
                    trHTML += '<tr><td>' + user.idUsuarios + '</td><td>'
                        + user.username + '</td><td>' + user.password
                        + '</td><td>' + user.tipoCuenta + '</td><td>'
                        + `<button type="button" onclick="location.href=\'./updateUsuarios.php?idUsuarios=${user.idUsuarios}&username=${user.username}\'" class="btn btn-warning"><i class="far fa-edit" aria-hidden="true"></i></button>`
                        + `<button type="button" onclick="deleteUsuario(${user.idUsuarios})" class="btn btn-danger"><i class="fas fa-trash-alt" aria-hidden="true"></i></button>`
                        + '</td></tr>';
                });

                $('#bodyUsuariosTable').empty();
                $('#bodyUsuariosTable').append(trHTML);

                $(`#paginadorUsuarios`).empty();
            } else {
                alert(res.error.message);
            }
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });
});

