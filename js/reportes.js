const strFormInjectFilters = ''


+ '<div class="d-flex justify-content-center">'


+           '<form id="formFilterReports" autocomplete="off">'

+   '<div class="form-row align-items-center" >'


+       '<div class="col-auto">'
+           '<label>Periodo</label>'
+           '<input type="date" class="form-control" name="fecha" placeholder="Fecha">'
+       '</div>'


+               '<div class="col-auto">'
+                   '<label>Nivel de Estudios</label>'
+                       '<select class="form-control" name="nivelEstudios" aria-label="Floating label select example">'
+                            '<option value=""></option>'
+                            '<option value="primaria">Primaria</option>'
+                            '<option value="secundaria">Secundaria</option>'
+                            '<option value="preparatoria">Preparatoria</option>'
+                            '<option value="universidad">Univesidad</option>'
+                            '<option value="caso especial">Caso Especial</option>'
+                       '</select>'
+                '</div>'




+       '<div class="col-auto">'
+            '<label>Estatus</label>'
+            '<select class="form-control" name="status" aria-label="Floating label select example">'
+                '<option value=""></option>'
+                '<option value="pendiente">pendiente</option>'
+                '<option value="aceptada">aceptadas</option>'
+                '<option value="rechazada">rechazadas</option>'
+             '</select>'
+       '</div>'


+               '<div class="col-auto">'
+                   '<button type="submit" class="btn btn-primary btn-sm">'
+                       'Generar'
+                   '</button>'
+               '</div>'

+               '</div>'


+           '</form>'


+   '</div>'


const reporte = {
    solicitudes : undefined,
    params: undefined
};

function syncronizarForm(){
    $('#formFilters').append(strFormInjectFilters);

    const formulario = $("#formFilterReports");
    
    formulario.validate({
        rules:{
            fecha:{
                required:true,
            },
            nivelEstudios:{
                required:true
            },
            status:{
                required:true
            }
        },
        messages:{
            nivelEstudios:"Seleccione una opción",
            fecha:"fecha de periodo",
            status:"Seleccione una opción"
        },
        submitHandler:function(form){

            let data = {
                name:"getSolicitudesFilter",
                param:{...getFormData(formulario)}
            }

            reporte.params = data.param;

            request('/educacion/Api/apiSolicitudes.php', data,function (res){

                console.log(res);
                
                if (res.hasOwnProperty('error')) {
                    let expiredToken = res.error.status;
                    expiredToken === 301 ? location.href = `/educacion/views/login.php` : alert(res.error.message);
                    return
                }
        
                if (res.response.status === 204) {
                    alert(res.response.result);
                    return;
                }

                let solicitudes = res.response.result;
                reporte.solicitudes = solicitudes;
                let trHTML = '';
                
                solicitudes.forEach(solicitud => {
                    let alumno = solicitud.idAlumno != null && solicitud.idAlumno[0].nombre;
                    let escuela = solicitud.idEscuela != null && solicitud.idEscuela[0].nombre;
                    let padre = solicitud.idPadre != null && solicitud.idPadre[0].nombre;
                    let nivelEstudios = solicitud.nivelEstudios != null && solicitud.nivelEstudios;
                    
                    trHTML += ''
                    + '<tr>'
                    +       '<td>' + alumno + '</td>'
                    +       '<td>' + escuela + '</td>'
                    +       '<td>' + padre + '</td>'
                    +       '<td>' + nivelEstudios + '</td>'
                    + '</tr>';
                });

                $('#bodySolicitudesTable').empty();
                $('#bodySolicitudesTable').append(trHTML);

            },token,false);
        }
    })
}

function pdf(){
    console.log('crear pdf');

    let nivelEstudios = reporte.params.nivelEstudios;
    let fecha = reporte.params.fecha;
    let status = reporte.params.status;

    let solicitudes = reporte.solicitudes;

    console.log(solicitudes);

    let reducer = solicitudes.reduce((acumulador,currentValue) => {
        let folio = `EDUU-${currentValue.idSolicitud}`
        let auxArray =  [{ text: folio , style: 'tableContain' },{ text: status, style: 'tableContain' }]
        acumulador.push(auxArray)
        return acumulador;
    },[]);

    console.log(reducer);

    let docReporteDefinition = {
        compress: true,
        content:[
            {
                alignment: 'center',
                columns:[
                    [
                        {
                            style:'header',
                            text:`RESULTADOS SOLICITUD DE BECA DEL PERIODO ${fecha}` 
                        },
                        {
                            style:'subheader',
                            text: `Nivel de Estudios: ${nivelEstudios}`
                        }
                    ]
                ]
            },
            {
                table: {
                    widths: ['*', '*'],
                    headerRows: 1,
                    body: [
                        [{ text: `Listado de alumnos ${status}`, style: 'tableHeader', colSpan: 2 }, {}],
                        [{ text: '# - Folio', style: 'tableSubHeader' }, { text: 'Estatus', style: 'tableSubHeader' }],
                        ...reducer
                    ]
                }
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
            tableContainSelected: {
                fontSize: 8,
                color: 'black',
                decoration: 'lineThrough',
                decorationColor: 'red'
            }
        }
    }

    pdfMake.createPdf(docReporteDefinition).open();
}

function excel(){
    console.log('crear excel');
    let strHeaders = "Folio,Alumno,Escuela,Padre,Nivel de Estudios,Estatus\n";

    let status = reporte.params.status;
    let solicitudes = reporte.solicitudes;

    solicitudes.forEach((solicitud) => {
        let strRow = `EDUU-${solicitud.idSolicitud},${solicitud.idAlumno[0].nombre}, ${solicitud.idEscuela[0].nombre},Padre Prueba,${solicitud.nivelEstudios},${status}\n`;
        strHeaders += strRow;
    });

    const blob = new Blob([strHeaders],{type:'text/plain; charset=utf-8'});
    let a = document.createElement('a');
    a.download = 'prueba.csv';
    a.href = window.URL.createObjectURL(blob);
    a.click();
}

function crearReporte(){
    
    if(reporte.solicitudes == undefined && reporte.params == undefined){
        alert("No se han cargado los datos");
        return;
    }

    let formato = $("#selectFormato :selected").val();

    if(formato.localeCompare('pdf') == 0){
        pdf();
        return;
    }

    if(formato.localeCompare('excel') == 0){
        excel();
        return;
    }
}

$(function () {
    syncronizarForm();
})