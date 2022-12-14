const token = window.localStorage.getItem('token');
console.log(token);

if (token == null || token == '')
    location.href = `/educacion/views/login`

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

function insertStrPaginador(numDatos, page, perPage, strNameFunctionPaginate) {
    console.log(`${strNameFunctionPaginate} ${page}`)
    let paginas = parseInt(numDatos / perPage);
    numDatos / perPage % 2 !== 0 ? paginas++ : null;
    let diferencia = 2;
    let mostarPaginas = 3;

    //console.log(paginas, diferencia);

    if (paginas > 1) {
        let mostrandoHtml = '<div class="col-sm-12 col-md-5">'
            + '<div class="dataTables_info" id="dataTable_info">'
            + `Mostrando del ${(page - 1) * perPage} al ${(page * perPage) - 1} `
            + '</div></div>';

        let disabledPrevious = page === 1 ? 'disabled' : '';

        let paginadorHtml = '<div class="col-sm-12 col-md-7">'
            + '<div id="dataTables_paginate paging_simple_number" class="dataTables_paginate">'
            + '<ul class="pagination">'
            + `<li class="page-item ${disabledPrevious}" onclick="${strNameFunctionPaginate}(${page - 1})"><a class="page-link" href="#" tabindex="-1">Previous</a></li>`;

        if (paginas >= 4) {
            let puntos = `<li class="page-item disabled" disabled><a class="page-link" href="#">...</a></li>`;
            let fin = page + mostarPaginas > paginas ? paginas : page + mostarPaginas;

            if (fin - page > diferencia) {

                for (let i = page; i < fin; i++) {
                    let active = page === i ? 'active' : null;
                    paginadorHtml += `<li class="page-item ${active}" onclick="${strNameFunctionPaginate}(${i})"><a class="page-link" href="#">${i}</a></li>`
                }
                paginadorHtml += puntos;

            } else {
                paginadorHtml += puntos;
                for (let i = page; i < fin; i++) {
                    let active = page === i ? 'active' : null;
                    paginadorHtml += `<li class="page-item ${active}" onclick="${strNameFunctionPaginate}(${i})"><a class="page-link" href="#">${i}</a></li>`
                }
            }


        } else {
            for (let i = 1; i <= paginas; i++) {
                let active = page === i ? 'active' : null;
                paginadorHtml += `<li class="page-item ${active}" onclick="${strNameFunctionPaginate}(${i})"><a class="page-link" href="#">${i}</a></li>`
            }
        }


        let disabledNext = page === paginas ? 'disabled' : '';
        mostrandoHtml += paginadorHtml + `<li class="page-item ${disabledNext}" onclick="${strNameFunctionPaginate}(${page + 1})"><a class="page-link" href="#">Next</a></li></ul> </div> </div>`;

        $(`#paginador`).empty();
        $(`#paginador`).append(mostrandoHtml);
    }
}


$("#selectPerPage").on('change', function () {
    console.log("========= Repaginar =====");
    paginar(1);
});

async function request(url, data, callback) {
    let strData = JSON.stringify(data);
    console.log(strData);
    $.ajax({
        url,
        type: "POST",
        processData: false,
        contentType: false,
        dataType: 'json',
        data: strData,
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


/**Forma de agregar un metodo al objeto validador con la finalidad de validar la curp
 * utilizando una expresion regular
 */
 $.validator.addMethod(
    "regexPhone",
    function (value, element, regexp) {
        if (regexp.constructor != RegExp)
            regexp = new RegExp(regexp);
        else if (regexp.global)
            regexp.lastIndex = 0;
        return regexp.test(value);
    },
    "Ejemplo numero de telefono : 445-457-5022"
);

$.validator.addMethod(
    "regexCurp",
    function (value, element, regexp) {
        if (regexp.constructor != RegExp)
            regexp = new RegExp(regexp);
        else if (regexp.global)
            regexp.lastIndex = 0;
        return regexp.test(value);
    },
    "La curp no es valida"
);

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

const createSolicitudPdf = async (solicitud, fecha = "2021 - 2024") => {
    console.log(solicitud);

    /**Esta imagen tiene error */
    let img = await getBase64FromUrl('/educacion/img/logo uriangato.png');

    let img2 = await getBase64FromUrl('/educacion/img/logo_sombra.png');
    
    //  ================   Datos Alumno ====================
    if (!(solicitud.idAlumno.length > 0))
        return false;
    let datosALumno = solicitud.idAlumno[0];

    let nivelEstudios = solicitud.nivelEstudios;
    let arrayEstudios = ['primaria', 'secundaria', 'preparatoria', 'universidad', 'caso especial']
    let arrayEstudiosResult = arrayEstudios.map(nivel => {
        return nivel == nivelEstudios ? 'X' : ''
    })

    if (!(solicitud.idAlumno.length > 0))
        return false;
    let datosEscuela = solicitud.idEscuela[0];
    let promedio = solicitud.promedioReciente;

    //  ================   Datos Padre ====================
    if (!(solicitud.idPadre.length > 0))
        return false;
    let datosPadre = solicitud.idPadre[0];
    let seguroMedico = datosPadre.seguroMedico;
    let arraySeguroMedico = ['privado','seguro social', 'IMSS', 'ISSSTE', 'otra institucion','ninguno'];
    let arraySeguroMedicoResult = arraySeguroMedico.map(seguro => {
        return seguro == seguroMedico ? 'X' : '';
    });   
    
    //  ================   Datos Ingresos Familiares ====================
    if (!(solicitud.idIngresosFamiliares.length > 0))
        return false;
    let datosIngresosFamiliares = solicitud.idIngresosFamiliares[0];
    let ingresoOtros = parseFloat(datosIngresosFamiliares.ingresoHermanos) + parseFloat(datosIngresosFamiliares.ingresoAbuelos);
    let ingresoTotal = parseFloat(datosIngresosFamiliares.ingresoMama) + parseFloat(datosIngresosFamiliares.ingresoPapa) + parseFloat(datosIngresosFamiliares.ingresoHermanos) + parseFloat(datosIngresosFamiliares.ingresoAbuelos);
    

    //  ================   Datos Servicios ====================
    if(!(solicitud.idServicios.length > 0))
        return false;

    let datosServicios = solicitud.idServicios[0];
    let serviciosColumna1 = [];
    
    Object.entries(datosServicios).forEach(entry => {
        let [key, value] = entry;
        if(key == 'idServicios') 
            return
        let objAux = value == 'si' ? { style: 'tableContainSelected', text:key} : { style: '', text: key}
        serviciosColumna1.push(objAux);
    }); 

    //  ================   Datos Requisitos Adicionales ====================

    if (!(solicitud.idRequisitosAdicionales.length > 0))
        return false;
    
    let datosRequisitosAdicionales = solicitud.idRequisitosAdicionales[0];
    let tipoTransporte = datosRequisitosAdicionales.tipoTransporte;
    let arrayTipoTransporte = ['caminando','bicicleta','transporte publico','moto','carro'];
    let arrayTipoTransporteResult = arrayTipoTransporte.map(transporte => {
        return transporte == tipoTransporte ? { style: 'tableContainSelected', text:transporte} : { style: '', text: transporte}
    });

    let tipotecho = datosRequisitosAdicionales.tipoTechoCasa
    let arrayTechoCasa = ['concreto','lamina','carton u otro'];
    let arrayTechoCasaResult = arrayTechoCasa.map(techo =>{
        return techo == tipotecho ? 'X' : '';
    });

    let tomaAgua = datosRequisitosAdicionales.aguaEnCasa;
    let arrayTomaAgua = ['en casa', 'comunitaria','no tiene'];
    let arrayTomaAguaResult = arrayTomaAgua.map(toma => {
        return toma == tomaAgua ? 'X' : '';
    });

    let tipoPisoCasa = datosRequisitosAdicionales.tipoMaterialPisoCasa;
    let arrayTipoPisoCasa = ['tierra','ladrillo o semento'];
    let arrayTipoPisoCasaResult = arrayTipoPisoCasa.map(piso =>{
        return piso == tipoPisoCasa ? 'X' : '';
    })

    let energiaElectrica = datosRequisitosAdicionales.energiaElectrica == 'si' ? 'X' : '';

    let tipoMurosCasa = datosRequisitosAdicionales.tipoMaterialMurosCasa;
    let arrayMurosCasa = ['ladrillo o block','adobe, lamina o teja','carton o madera'];
    let arrayMurosCasaResult = arrayMurosCasa.map( muros => {
        return muros == tipoMurosCasa ? 'X' : '';
    });

    let recibeApoyo = datosRequisitosAdicionales.recibeOtroApoyo;
    let tipoApoyo = datosRequisitosAdicionales.tipoApoyo;


    let folio = 'BMU-01'
    var docDefinition = {
        compress: true,
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
                        [{ text: datosALumno.nombre, style: 'tableContain' }, { text: datosALumno.fechaNacimiento, style: 'tableContain' }, { text: datosALumno.curp, style: 'tableContain' }],
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
                        [{ text: arrayEstudiosResult[0], style: 'tableContain' }, { text: arrayEstudiosResult[1], style: 'tableContain' }, { text: arrayEstudiosResult[2], style: 'tableContain' }, { text: arrayEstudiosResult[3], style: 'tableContain' }, { text: arrayEstudiosResult[4], style: 'tableContain' }],
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
                        [{ text: datosEscuela.calle, style: 'tableContain' }, { text: datosEscuela.no, style: 'tableContain' }, { text: datosEscuela.colonia, style: 'tableContain' }, { text: '38980', style: 'tableContain' }, { text: datosEscuela.municipio, style: 'tableContain' }],
                        [{ text: 'Telefono', style: 'tableSubHeader', colSpan: 2 }, {}, { text: 'Promedio', style: 'tableSubHeader' }, { text: 'Tipo Institucion', style: 'tableSubHeader', colSpan: 2 }, {}],
                        [{ text: datosEscuela.telefono, style: 'tableContain', colSpan: 2 }, {}, { text: promedio, style: 'tableContain' }, { text: datosEscuela.tipoInstitucion, style: 'tableContain', colSpan: 2 }, {}],
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
                        [{ text: datosPadre.nombre, style: 'tableContain', colSpan: 2 }, {}, { text: datosPadre.fechaNacimiento, style: 'tableContain', colSpan: 2 }, {}, { text: datosPadre.telefono, style: 'tableContain' }],
                        [{ text: 'Calle', style: 'tableSubHeader' }, { text: 'No', style: 'tableSubHeader' }, { text: 'Colonia', style: 'tableSubHeader' }, { text: 'Cp', style: 'tableSubHeader' }, { text: 'Municipio', style: 'tableSubHeader' }],
                        [{ text: datosPadre.calle, style: 'tableContain' }, { text: datosPadre.no, style: 'tableContain' }, { text: datosPadre.colonia, style: 'tableContain' }, { text: datosPadre.cp, style: 'tableContain' }, { text: datosPadre.municipio, style: 'tableContain' }],
                        [{ text: 'Grado de Estudios concluido', style: 'tableSubHeader', colSpan: 2 }, {}, { text: 'Ha tenido trabajo en los ultimos 3 meses', style: 'tableSubHeader', colSpan: 3 }, {}, {}],
                        [{ text: datosPadre.gradoEstudios, style: 'tableContain', colSpan: 2 }, {}, { text: datosPadre.trabajo6Meses, style: 'tableContain', colSpan: 3 }, {}, {}],
                        [{ text: 'Numero de personas que trabajan en su Familia', style: 'tableSubHeader', colSpan: 4 }, {}, {}, {}, { text: 'Cuantas personas dependen del ingreso', style: 'tableSubHeader' }],
                        [{
                            style: 'listas',
                            columns: [
                                { text: 'Papa' }, { text: datosIngresosFamiliares.ingresoPapa ? 'X' : ''},
                                { text: 'Mama' }, { text: datosIngresosFamiliares.ingresoMama ? 'X' : '' },
                                { text: 'Hermanos' }, { text: datosIngresosFamiliares.ingresoHermanos ? 'X' : ''},
                                { text: 'Abuelos' }, { text: datosIngresosFamiliares.ingresoAbuelos ? 'X' : ''},
                            ],
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
                        [{ text: 'Desglose la Cantidad que gana por semana', style: 'tableSubHeader' }, { text: 'Se??ale los servicios  con los que cuenta la colonia', style: 'tableSubHeader' }],
                        [{
                            style: 'listasCenter',
                            columns: [
                                {
                                    type: 'none',
                                    ul: [
                                        'Papa',
                                        datosIngresosFamiliares.ingresoPapa
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Mama',
                                        datosIngresosFamiliares.ingresoMama
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Otros',
                                        ingresoOtros
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Total',
                                        ingresoTotal
                                    ]
                                }

                            ]
                        }, {
                            style: 'listas',
                            columns: [
                                {
                                    ul: serviciosColumna1.slice(0,3)
                                },
                                {
                                    ul: serviciosColumna1.slice(3,6)
                                },
                                {
                                    ul: serviciosColumna1.slice(6,9)
                                }
                            ]
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
                            style: 'listasCenter',
                            columns: [
                                {
                                    type: 'none',
                                    ul: [
                                        'Privado',
                                        arraySeguroMedicoResult[0]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Seguro Social',
                                        arraySeguroMedicoResult[1]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'IMSS',
                                        arraySeguroMedicoResult[2]
                                    ]
                                }
                                ,
                                {
                                    type: 'none',
                                    ul: [
                                        'ISSSTE',
                                        arraySeguroMedicoResult[3]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Otra institucion',
                                        arraySeguroMedicoResult[4]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Ninguno',
                                        arraySeguroMedicoResult[5]
                                    ]
                                },
                            ]
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
                        [{ text: datosRequisitosAdicionales.escuelaDentroMunicipio , style: 'tableContain' }, { text: datosRequisitosAdicionales.tiempoTranslado, style: 'tableContain' }, {
                            style: 'listas',
                            columns: [
                                {
                                    ul: arrayTipoTransporteResult.slice(0,2)
                                },
                                {
                                    ul: arrayTipoTransporteResult.slice(2,4)
                                },
                                {
                                    ul: arrayTipoTransporteResult.slice(4,5)
                                }

                            ], colSpan: 2
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
                            style: 'listasCenter',
                            columns: [
                                {
                                    type: 'none',
                                    ul: [
                                        'Concreto',
                                        arrayTechoCasaResult[0]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Lamina',
                                        arrayTechoCasaResult[1]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Carton u otro',
                                        arrayTechoCasaResult[2]
                                    ]
                                }
                            ]
                        }, {
                            style: 'listasCenter',
                            columns: [
                                {
                                    type: 'none',
                                    ul: [
                                        'En casa',
                                        arrayTomaAguaResult[0]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Comunitaria',
                                        arrayTomaAguaResult[1]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'No tiene',
                                        arrayTomaAguaResult[2]
                                    ]
                                }
                            ]
                        }],
                        [{ text: 'De que material es el piso de tu casa y energia electrica', style: 'tableSubHeader' }, { text: 'De que material son los muros de tu casa', style: 'tableSubHeader' }],
                        [{
                            style: 'listasCenter',
                            columns: [
                                {
                                    type: 'none',
                                    ul: [
                                        'Tierra',
                                        arrayTipoPisoCasaResult[0]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Ladrillo o semento',
                                        arrayTipoPisoCasaResult[1]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Energia electrica',
                                        energiaElectrica
                                    ]
                                }
                            ]
                        }, {
                            style: 'listasCenter',
                            columns: [
                                {
                                    type: 'none',
                                    ul: [
                                        'Ladrillo o block',
                                        arrayMurosCasaResult[0]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Adobe, Lamina o teja',
                                        arrayMurosCasaResult[1]
                                    ]
                                },
                                {
                                    type: 'none',
                                    ul: [
                                        'Carton o madera',
                                        arrayMurosCasaResult[2]
                                    ]
                                }
                            ]
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
                        [{ text: 'RECIBE ALG??N OTRO APOYO', style: 'tableHeader', colSpan: 2 }, {}],
                        [{ text: 'Si o No', style: 'tableSubHeader' }, { text: 'tipo de apoyo que recibe', style: 'tableSubHeader' }],
                        [{ text: recibeApoyo, style: 'tableContain' }, { text: tipoApoyo, style: 'tableContain' }],
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
            listas: {
                fontSize: 8,
            },
            listasCenter: {
                fontSize: 8,
                alignment: 'center'
            },
            subindice: {
                bold: true,
                fontSize: 8,
                color: 'black',
                alignment: 'center'
            },
            firma: {
                margin: [0, 15, 0, 5],
                alignment: 'center'
            },
            tableContainSelected:{
                fontSize: 8,
                color: 'black',
                decoration:'lineThrough',
                decorationColor: 'red'
            }
        }

    }
    pdfMake.createPdf(docDefinition).open();
}

const blobPdf = [];

const showPdf = e => {
    let ruta = e.value;
    $("#fileLabel").html(ruta);
    let extPermitidas = /(.pdf)$/i;
    if (!extPermitidas.exec(ruta)) {
        alert('Asegurese de haber seleccionado un PDF');
        $("#fileLabel").html('');
        return;
    }

    if (e.files && e.files[0]) {
        var visor = new FileReader();
        visor.onload = function (e) {
            const targetElement = document.querySelector('#iframeContainer');
            blobPdf[0] = e.target.result;
            targetElement.src = e.target.result;
        };
        visor.readAsDataURL(e.files[0]);
    }
}