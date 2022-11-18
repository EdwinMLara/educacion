$(function () {
    console.log('solicitud');
    paginar(1);
});


$('#formUpdateSolicitud').validate({
    rules: {
        nivelEstudios: {
            required: true
        },
        promedioReciente: {
            required: true,
            min: 0,
            max: 10
        }
    },
    messages: {
        nivelEstudios: {
            required: 'Agrege el nivel de estudios'
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
        request('/educacion/Api/apiSolicitudes.php', dataUpdateSolicitud, function (res) {
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


const paginar = (page) => {
    console.log("=============  Leer Usuarios Paginando =============");
    let perPage = $("#selectPerPage :selected").val();

    let data = {
        name: "getSolicitudesPaginate",
        param: {
            page,
            perPage
        }
    }


    console.log(data);

    request('/educacion/Api/apiSolicitudes.php', data, function (res) {
        console.log(res);

        if (res.hasOwnProperty('error')) {
            let expiredToken = res.error.status;
            expiredToken === 301 ? location.href = `/educacion/views/login.php` : alert(res.error.message);
            return
        }

        let numDatos = res.response.result.total;
        let solicitudes = res.response.result.solicitudes;

        window.localStorage.setItem('currentSolicitudes', JSON.stringify(solicitudes));

        let trHTML = '';
        solicitudes.forEach((solicitud, index) => {
            let alumno = solicitud.idAlumno.length > 0 ? solicitud.idAlumno[0].nombre : 'NO-REGISTRADO';
            let escuela = solicitud.idEscuela.length > 0 ? solicitud.idEscuela[0].nombre : 'NO-REGISTRADO';
            let padre = solicitud.idPadre.length > 0 ? solicitud.idPadre[0].nombre : 'NO-REGISTRADO';
            trHTML += '<tr>'
                + '<td>' + alumno + '</td>'
                + '<td>' + escuela + '</td>'
                + '<td>' + padre + '</td>'
                + '<td>' + solicitud.nivelEstudios + '</td>'
                + '<td>' + solicitud.promedioReciente + '</td>'
                + `<td class="d-flex justify-content-around">`
                + `<button type="button"  data-toggle="modal" data-target="#detallesSolicitudModal" onClick="detallesSolicitud(${index})" class="btn btn-info"><i class="fa fa-question fa-fw" aria-hidden="true"></i></button>`
                + `<button type="button"  onClick="print(${index})" class="btn btn-warning"><i class="fa fa-print fa-fw" aria-hidden="true"></i></button>`
                + '</td>'
                + '</tr>';
        });

        $('#bodySolicitudesTable').empty();
        $('#bodySolicitudesTable').append(trHTML);
        insertStrPaginador(numDatos, page, perPage, "paginar");
    });
}

/**se utiliza el indece para el arreglo current solicitudes */

const detallesSolicitud = (indiceSolicitud, step = 1) => {
    console.log('--------- Mostrar Destalles de Solicitud -------------');
    const solicitudes = JSON.parse(window.localStorage.getItem('currentSolicitudes'));
    console.log(solicitudes[indiceSolicitud]);

    let formHMTL = '<form class="formLogin" id="formLogin">';
    let finFormHTML = '</form> </div>';

    let disableButtonNext = "";
    let disableButtonBack = "";
    let detallesSolicitudToShow;

    $('#modalBodySolicitud').empty();
    $('#modalFooterSolicitud').empty();

    console.log('step: ', step);

    if (step > 5)
        disableButtonNext = 'disabled';
    if (step < 2)
        disableButtonBack = 'disabled';

    switch (step) {
        case 1:
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idAlumno[0];
            break;
        case 2:
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idEscuela[0];
            break;
        case 3:
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idPadre[0];
            break;
        case 4:
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idIngresosFamiliares[0];
            break;
        case 5:
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idServicios[0];
            break;
        case 6:
            detallesSolicitudToShow = solicitudes[indiceSolicitud].idRequisitosAdicionales[0];
            break;
    }

    let buttonsHTML = `<button type="button" ${disableButtonBack} onclick="detallesSolicitud(${indiceSolicitud},${step - 1})" class="btn btn-secondary">Anterior</button>`
        + `<button type="button" ${disableButtonNext} onclick="detallesSolicitud(${indiceSolicitud},${step + 1})" class="btn btn-primary">Siguiente</button>`;


    $('#modalFooterSolicitud').append(buttonsHTML);

    if (detallesSolicitudToShow == undefined) {
        $('#modalBodySolicitud').append('NO-REGISTRADO');
        return;
    }

    Object.keys(detallesSolicitudToShow).forEach(function (key) {

        console.log(key, detallesSolicitudToShow[key]);
        let inputHMTL = `<label>${key}</label>`
            + '<div class="form-group">'
            + `<input type="text" class="form-control form-control-user" name="${key}" value="${detallesSolicitudToShow[key]}">`
            + '</div>';
        formHMTL += inputHMTL;
    });

    formHMTL += finFormHTML;
    console.log(formHMTL);

    $('#modalBodySolicitud').append(formHMTL);
}


const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    let promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            return resolve(base64data);
        }
    });

    return await promise.then(str => str);
}

const print = async (indiceSolicitud, fecha = '2021 - 2024') => {

    let img = await getBase64FromUrl('/educacion/img/logo uriangato.png');
    console.log(img);

    let img2 = await getBase64FromUrl('/educacion/img/logo_sombra.png');
    console.log(img2);

    let folio = 'BMU-01'
    var docDefinition = {
        content: [
            {
                alignment: 'center',
                columns: [
                    {
                        image: img2,
                        width: 50,
                        height: 50
                    },
                    [{
                        style: 'header',
                        text: `FORMATO DE SOLICITUD DE BECA MUNICIPAL`
                    },
                    {
                        style: 'subheader',
                        text: `AYUNTAMIENTO ${fecha}`
                    }, `Folio : ${folio}`]

                    ,
                    {
                        image: img2,
                        width: 50,
                        height: 50
                    }
                ],

            },
            {
                table: {
                    widths: ['*', 'auto', 'auto'],
                    headerRows: 2,
                    body: [
                        [{ text: '1 .- DATOS DEL ALUMNO (A)', style: 'tableHeader', colSpan: 3 }, {}, {}],
                        [{ text: 'Nombre', style: 'tableSubHeader' }, { text: 'Fecha de Nacimiento', style: 'tableSubHeader' }, { text: 'CURP', style: 'tableSubHeader' }],
                        [{ text: 'Edwin Miguel Lara Espinoza', style: 'tableContain' }, { text: '17/jul/1992', style: 'tableContain' }, { text: 'LAKSDFL5462165820135', style: 'tableContain' }],
                    ]
                }
            }
            ,
            {
                table: {
                    widths: ['*', '*', '*', '*', '*'],
                    headerRows: 2,
                    body: [
                        [{ text: '2 .- NIVEL DE ESTUDIOS PARA LA CUAL SOLICITA LA BECA', style: 'tableHeader', colSpan: 5 }, {}, {}, {}, {}],
                        [{ text: 'Primaria', style: 'tableSubHeader' }, { text: 'Secundaria', style: 'tableSubHeader' }, { text: 'Preparatoria', style: 'tableSubHeader' }, { text: 'Universidad', style: 'tableSubHeader' }, { text: 'Caso especial', style: 'tableSubHeader' }],
                        [{ text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: 'X', style: 'tableContain' }, { text: '', style: 'tableContain' }],
                    ]
                }
            }
            ,
            {
                table: {
                    widths: ['*', '*', '*', '*', '*'],
                    headerRows: 2,
                    body: [
                        [{ text: '3 .- NOMBRE Y DATOS DE LA INSTITUCION', style: 'tableHeader', colSpan: 5 }, {}, {}, {}, {}],
                        [{ text: 'Calle', style: 'tableSubHeader' }, { text: 'No', style: 'tableSubHeader' }, { text: 'Colonia', style: 'tableSubHeader' }, { text: 'Cp', style: 'tableSubHeader' }, { text: 'Municipio', style: 'tableSubHeader' }],
                        [{ text: 'av. Universidad', style: 'tableContain' }, { text: 'sn', style: 'tableContain' }, { text: 'Yacatitas', style: 'tableContain' }, { text: '38980', style: 'tableContain' }, { text: 'Uriangato', style: 'tableContain' }],
                        [{ text: 'Telefono', style: 'tableSubHeader', colSpan: 2 }, {}, { text: 'Promedio', style: 'tableSubHeader' }, { text: 'Tipo Institucion', style: 'tableSubHeader', colSpan: 2 }, {}],
                        [{ text: '4451107150', style: 'tableContain', colSpan: 2 }, {}, { text: '6.5', style: 'tableContain' }, { text: 'NO se que es', style: 'tableContain', colSpan: 2 }, {}],
                    ]
                }
            }
            ,
            {
                table: {
                    widths: ['*', '*', '*', '*', '*'],
                    headerRows: 2,
                    body: [
                        [{ text: '4 .- DATOS GENERALES DEL PADRE O TUTOR (A)', style: 'tableHeader', colSpan: 5 }, {}, {}, {}, {}],
                        [{ text: 'Nombre', style: 'tableSubHeader', colSpan: 2 }, {}, { text: 'Fecha de Nacimiento', style: 'tableSubHeader', colSpan: 2 }, {}, { text: 'Telefono', style: 'tableSubHeader' }],
                        [{ text: 'Juan Enrique Lara Gutierrez', style: 'tableContain', colSpan: 2 }, {}, { text: '18/Nov/1965', style: 'tableContain', colSpan: 2 }, {}, { text: '4454587243', style: 'tableContain' }],
                        [{ text: 'Calle', style: 'tableSubHeader' }, { text: 'No', style: 'tableSubHeader' }, { text: 'Colonia', style: 'tableSubHeader' }, { text: 'Cp', style: 'tableSubHeader' }, { text: 'Municipio', style: 'tableSubHeader' }],
                        [{ text: '2da privada 5 de febrero', style: 'tableContain' }, { text: '87', style: 'tableContain' }, { text: 'niños heroes', style: 'tableContain' }, { text: '38850', style: 'tableContain' }, { text: 'Moroleon', style: 'tableContain' }],
                        [{ text: 'Grado de Estudios concluido', style: 'tableSubHeader', colSpan: 2 }, {}, { text: 'Ha tenido trabajo en los ultimos 3 meses', style: 'tableSubHeader', colSpan: 3 }, {}, {}],
                        [{ text: 'Secundaria', style: 'tableContain', colSpan: 2 }, {}, { text: 'SI', style: 'tableContain', colSpan: 3 }, {}, {}],
                        [{ text: 'Numero de personas que trabajan en su Familia', style: 'tableSubHeader', colSpan: 4 }, {}, {}, {}, { text: 'Cuantas personas dependen del ingreso', style: 'tableSubHeader' }],
                        [{
                            table: {
                                widths: ['*', '*', '*', '*'],
                                body: [
                                    [{ text: 'Papa', style: 'tableSubHeader' }, { text: 'Mama', style: 'tableSubHeader' }, { text: 'Hermanos', style: 'tableSubHeader' }, { text: 'Abuelos', style: 'tableSubHeader' }],
                                    [{ text: 'X', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }],
                                ]
                            },
                            colSpan: 4
                        }, {}, {}, {}, { text: '5', style: 'tableContain' }],
                    ]
                }
            }
            ,
            {
                table: {
                    widths: ['*', '*'],
                    headerRows: 2,
                    body: [
                        [{ text: 'Desglose la Cantidad que gana por semana', style: 'tableSubHeader' }, { text: 'Señale los servicios  con los que cuenta la colonia', style: 'tableSubHeader' }],
                        [{
                            table: {
                                widths: ['*', '*', '*', '*'],
                                body: [
                                    [{ text: 'Papa', style: 'tableSubHeader' }, { text: 'Mama', style: 'tableSubHeader' }, { text: 'Otro', style: 'tableSubHeader' }, { text: 'Total', style: 'tableSubHeader' }],
                                    [{ text: '20', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: '20', style: 'tableContain' }],
                                ]
                            },
                        }, {
                            table: {
                                widths: ['*', '*', '*'],
                                body: [
                                    [{ text: 'Calles pavimentadas', style: 'tableSubHeader' }, { text: 'Recolección de basura', style: 'tableSubHeader' }, { text: 'Trasporte Publico', style: 'tableSubHeader' }],
                                    [{ text: 'Si', style: 'tableContain' }, { text: 'No', style: 'tableContain' }, { text: 'Si', style: 'tableContain' }],
                                    [{ text: 'Drenaje', style: 'tableSubHeader' }, { text: 'Alumbrado público', style: 'tableSubHeader' }, { text: 'Red de agua potable', style: 'tableSubHeader' }],
                                    [{ text: 'Si', style: 'tableContain' }, { text: 'No', style: 'tableContain' }, { text: 'Si', style: 'tableContain' }],
                                    [{ text: 'Biblioteca', style: 'tableSubHeader' }, { text: 'Telefono público', style: 'tableSubHeader' }, { text: 'Juego o canchas deportivas', style: 'tableSubHeader' }],
                                    [{ text: 'Si', style: 'tableContain' }, { text: 'No', style: 'tableContain' }, { text: 'Si', style: 'tableContain' }],
                                ]
                            },
                        }],
                    ]
                }
            }
            ,
            {
                table: {
                    widths: ['*'],
                    headerRows: 2,
                    body: [
                        [{ text: 'Que tipo de servicio medico cuenta actualmente', style: 'tableSubHeader' }],
                        [{
                            table: {
                                widths: ['*', '*', '*', '*', '*', '*'],
                                body: [
                                    [{ text: 'Privado', style: 'tableSubHeader' }, { text: 'Seguro Social', style: 'tableSubHeader' }, { text: 'Seguro Federal', style: 'tableSubHeader' }, { text: 'IMSS', style: 'tableSubHeader' }, { text: 'ISSSTE', style: 'tableSubHeader' }, { text: 'Otra institución', style: 'tableSubHeader' }],
                                    [{ text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: 'X', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }],
                                ]
                            },
                        }],
                    ]
                }
            }
            ,
            {
                table: {
                    widths: ['*', '*', '*', '*'],
                    headerRows: 2,
                    body: [
                        [{ text: 'Tu escuela esta dentro del municipio', style: 'tableSubHeader' }, { text: 'Tiempo que tarde en llegar a la escuela', style: 'tableSubHeader' }, { text: 'Tipo de transporte en el que se translada al trabajo', style: 'tableSubHeader', colSpan: 2 }],
                        [{ text: 'Si', style: 'tableContain' }, { text: '50 min', style: 'tableContain' }, {
                            table: {
                                widths: ['*', '*', '*'],
                                body: [
                                    [{ text: 'Bicicleta', style: 'tableSubHeader' }, { text: 'Caminando', style: 'tableSubHeader' }, { text: 'Transporte público', style: 'tableSubHeader' }],
                                    [{ text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: 'X', style: 'tableContain' }],
                                    [{ text: 'Moto', style: 'tableSubHeader' }, {}, { text: 'Carro', style: 'tableSubHeader' }],
                                    [{ text: '', style: 'tableContain' }, {}, { text: '', style: 'tableContain' }],
                                ]
                            }, colSpan: 2
                        }],
                    ]
                }
            }
            , {
                table: {
                    widths: ['*', '*'],
                    headerRows: 2,
                    body: [
                        [{ text: 'Tu casa cuenta con techo', style: 'tableSubHeader' }, { text: 'Cuenta con toma de agua', style: 'tableSubHeader' }],
                        [{
                            table: {
                                widths: ['*', '*', '*'],
                                body: [
                                    [{ text: 'Concreto', style: 'tableSubHeader' }, { text: 'Lamina', style: 'tableSubHeader' }, { text: 'Carton o Semejante', style: 'tableSubHeader' }],
                                    [{ text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: 'X', style: 'tableContain' }],
                                ]
                            }
                        }, {
                            table: {
                                widths: ['*', '*', '*'],
                                body: [
                                    [{ text: 'En casa', style: 'tableSubHeader' }, { text: 'Comunitaria', style: 'tableSubHeader' }, { text: 'No Tiene', style: 'tableSubHeader' }],
                                    [{ text: 'X', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }],
                                ]
                            }
                        }],
                        [{ text: 'De que material es el piso de tu casa y energia electrica', style: 'tableSubHeader' }, { text: 'De que material son los muros de tu casa', style: 'tableSubHeader' }],
                        [{
                            table: {
                                widths: ['*', '*', '*'],
                                body: [
                                    [{ text: 'Tierra', style: 'tableSubHeader' }, { text: 'Ladrillo o semento', style: 'tableSubHeader' }, { text: 'Energia electrica', style: 'tableSubHeader' }],
                                    [{ text: '', style: 'tableContain' }, { text: 'X', style: 'tableContain' }, { text: 'Si', style: 'tableContain' }],
                                ]
                            }
                        }, {
                            table: {
                                widths: ['*', '*', '*'],
                                body: [
                                    [{ text: 'Ladrillo block', style: 'tableSubHeader' }, { text: 'Adobe, lamina o teja', style: 'tableSubHeader' }, { text: 'Carton o madera', style: 'tableSubHeader' }],
                                    [{ text: 'X', style: 'tableContain' }, { text: '', style: 'tableContain' }, { text: '', style: 'tableContain' }],
                                ]
                            }
                        }],
                    ]
                }
            }
            ,
            {
                table: {
                    widths: ['*', '*'],
                    headerRows: 2,
                    body: [
                        [{ text: 'RECIBE ALGÚN OTRO APOYO', style: 'tableHeader', colSpan: 2 }, {}],
                        [{ text: 'Si o No', style: 'tableSubHeader' }, { text: 'tipo de apoyo que recibe', style: 'tableSubHeader' }],
                        [{ text: 'NO', style: 'tableContain' }, { text: 'Ninguno', style: 'tableContain' }],
                    ]
                }
            }
            ,
            {
                table: {
                    widths: ['*'],
                    headerRows: 2,
                    body: [
                        [{ text: 'NOMBRE Y FIRMA DEL PADRE,MADRE O TUTOR', style: 'tableHeader' }],
                        [{ text: '_______________________________________', style: 'firma' }],
                    ]
                }
            }
            ,
            {
                style: 'subindice',
                text: `en caso de que el alumno sea mayor de edad firmara la solicitud`
            }
            ,
            {
                style: 'firma',
                text: `____________________________________________________`
            }
            ,
            {
                style: 'subindice',
                text: `C.JORGE LUIS HERNANDEZ TELLEZ`
            },
            {
                style: 'subindice',
                text: `Director de educacion y civismo`
            }
        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true,
                color: 'red'
            },
            subheader: {
                fontSize: 10,
                bold: true
            },
            title: {
                width: 100,
                background: 'red',
                color: 'white',
                bold: true
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 10,
                color: 'white',
                alignment: 'center',
                fillColor: 'red'
            }, tableSubHeader: {
                bold: true,
                fontSize: 8,
                color: 'black',
                alignment: 'center',
                fillColor: '#CFC8C8'
            },
            tableContain: {
                fontSize: 8,
                color: 'black',
                alignment: 'center'
            },
            subindice:{
                bold: true,
                fontSize: 8,
                color: 'black',
                alignment: 'center'
            },
            firma:{
                margin: [0, 15, 0, 5],
                alignment: 'center'
            }
        }

    }
    pdfMake.createPdf(docDefinition).open();
}