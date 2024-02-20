import curp from  './curp.txt';
import credencial from 'credencial base64.txt';

const urls = [
    '/educacion/Api/apiAlumnos.php',
    '/educacion/Api/apiEscuelas.php',
    '/educacion/Api/apiDatosPadre.php',
    '/educacion/Api/apiIngresosFamiliares.php',
    '/educacion/Api/apiServicios.php',
    '/educacion/Api/apiRequisitosAdicionales.php',
    '/educacion/Api/apiSolicitudes.php'
];

const postDataArray = [{
    name: "addAlumno",
    param:{
        curp:'LAEE920717HMCRSD09',
        email:'em.laraespinoza@hotmail.com',
        fechaNacimiento:'1992-07-17',
        file:curp
    }
},{
    name:"addEscuela",
    param:{
        idAlumno: 1,
        nombre:'Juan Enrique Lara Gutierrez',
        calle:'2da privada 5 de febrero',
        no:'87',
        cp:'38850',
        colonia:'Niños heroes',
        municipio:'Moroleón',
        telefono:'4451107150',
        tipoInstitucion:'Publica',
        file: credencial
    }
}
];


console.log(postDataArray);
