const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjUxNjkzNzksImlzcyI6ImxvY2FsaG9zdCIsImV4cCI6MTY2NTE3NTM3OSwidXNlcklkIjoiOCJ9.qtcR-s9o7zufJNNLuNea8IM-fuGtdR3-WoqXLsLaeSc"

function getFormData($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function mostrarRequestAlerResult(status) {
    let trueResponse = '<div class="alert alert-success"><strong>Success!</strong> Se ha Actualizado correctamente al usuario.</div>';
    let falseResponse = '<div class="alert alert-danger"><strong>Error!</strong> Algo ha salido mal al actualizar el usuario.</div>';
    status === 200 ? $("#alert").append(trueResponse) : $("#alert").append(falseResponse);
}

function insertStrPaginador(numDatos,page,perPage) {
    let paginas = parseInt(numDatos / perPage);
    numDatos / perPage % 2 !== 0 ? paginas++ : null;
    let diferencia = 2;
    let mostarPaginas = 3;
    console.log(paginas, diferencia);

    if (paginas > 1) {
        let mostrandoHtml = '<div class="col-sm-12 col-md-5">'
            + '<div class="dataTables_info" id="dataTable_info">'
            + `Mostrando del ${(page - 1) * perPage} al ${(page * perPage) - 1} `
            + '</div></div>';

        let disabledPrevious = page === 1 ? 'disabled' : '';

        let paginadorHtml = '<div class="col-sm-12 col-md-7">'
            + '<div id="dataTables_paginate paging_simple_number" class="dataTables_paginate">'
            + '<ul class="pagination">'
            + `<li class="page-item ${disabledPrevious}" onclick="paginar(${page - 1})"><a class="page-link" href="#" tabindex="-1">Previous</a></li>`;

        if (paginas >= 4) {
            let puntos = `<li class="page-item disabled" disabled><a class="page-link" href="#">...</a></li>`;
            let fin = page + mostarPaginas > paginas ? paginas : page + mostarPaginas;

            if (fin - page > diferencia) {

                for (let i = page; i < fin; i++) {
                    let active = page === i ? 'active' : null;
                    paginadorHtml += `<li class="page-item ${active}" onclick="paginar(${i})"><a class="page-link" href="#">${i}</a></li>`
                }
                paginadorHtml += puntos;

            } else {
                paginadorHtml += puntos;
                for (let i = page; i < fin; i++) {
                    let active = page === i ? 'active' : null;
                    paginadorHtml += `<li class="page-item ${active}" onclick="paginar(${i})"><a class="page-link" href="#">${i}</a></li>`
                }
            }


        } else {
            for (let i = 1; i <= paginas; i++) {
                let active = page === i ? 'active' : null;
                paginadorHtml += `<li class="page-item ${active}"><a class="page-link" href="#">${i}</a></li>`
            }
        }


        let disabledNext = page === paginas ? 'disabled' : '';
        mostrandoHtml += paginadorHtml + `<li class="page-item ${disabledNext}" onclick="paginar(${page + 1})"><a class="page-link" href="#">Next</a></li></ul> </div> </div>`;

        $(`#paginador`).empty();
        $(`#paginador`).append(mostrandoHtml);
    }
}

function request(url,data,callback){
    $.ajax({
        url,
        type: "POST",
        dataType: 'json',
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', "Bearer " + token);
            xhr.setRequestHeader('Content-Type', 'application/json');
        },
        success: callback,
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    });
}