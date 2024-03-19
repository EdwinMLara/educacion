<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/Solicitudes.php");
require_once("../Modelos/Alumnos.php");
require_once("../Modelos/EscuelaInstitucion.php");
require_once("../Modelos/DatosPadre.php");
require_once("../Modelos/IngresosFamiliares.php");
require_once("../Modelos/Servicios.php");
require_once("../Modelos/RequisitosAdicionales.php");

class SolicitudesRouter extends RestApi
{
    public function __construct()
    {
        parent::__construct("solicitudes");
    }

    public function addSolicitude()
    {
        $idAlumno = $this->validateParameter('idAlumno', $this->param['idAlumno'], STRING);
        $idEscuela = $this->validateParameter('idEscuela', $this->param['idEscuela'], STRING);
        $idPadre = $this->validateParameter('idPadre', $this->param['idPadre'], STRING);
        $idIngresosFamiliares = $this->validateParameter('idIngresosFamiliares', $this->param['idIngresosFamiliares'], STRING);
        $idServicios = $this->validateParameter('idServicios', $this->param['idServicios'], STRING);
        $idRequisitosAdicionales = $this->validateParameter('idRequisitosAdicionales', $this->param['idRequisitosAdicionales'], STRING);
        $fecha = $this->validateParameter("fecha", $this->param["fecha"], STRING);

        $arguments = array($idAlumno, $idEscuela, $idPadre, $idIngresosFamiliares, $idServicios, $idRequisitosAdicionales,$fecha);
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }

    public function updateSolicitudByIdAlumno()
    {
        $idAlumno = $this->validateParameter('idAlumno', $this->param["idAlumno"], INTEGER);
        $nivelEstudios = $this->validateParameter('nivelEstudios', $this->param["nivelEstudios"], STRING);
        $promedioReciente = $this->validateParameter('promedioReciente', $this->param["promedioReciente"], STRING);

        $query = "UPDATE `solicitudes`  SET `nivelEstudios`='$nivelEstudios',`promedioReciente`='$promedioReciente' WHERE idAlumno = $idAlumno and (fecha < DATE_ADD(now(),INTERVAL 90 DAY))";

        $result = $this->service->updateByTableQuery($query);

        if ($result) {
            $this->returnResponse(SUCESS_RESPONSE,$result);
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    }

    public function getSolicitudes()
    {
        $solicitudes = $this->service->getAll();
        if ($solicitudes) {
            $this->returnResponse(SUCESS_RESPONSE, $solicitudes);
        } else if (empty($solicitudes)) {
            $this->returnResponse(SUCESS_EMPTY, "no hay solicitudes registradas");
        } else {
            $this->throwError('GET_ERROR', "An error has been ocurren to paginate de users");
        }
    }

    public function getSolicitudesFilter(){
        $fecha=$this->validateParameter("fecha",$this->param["fecha"],STRING);
        $nivelEstudios =$this->validateParameter("nivelEstudios",$this->param["nivelEstudios"],STRING);
        $status=$this->validateParameter("status",$this->param["status"],STRING);

        $query = "SELECT * FROM `solicitudes` WHERE nivelEstudios = '$nivelEstudios' and `status` = '$status' AND fecha >= '$fecha'";

        $solicitudes = $this->service->getByQueryTable($query);

        if($solicitudes){
            $numSolicitudes = count($solicitudes);
            
            $response = new stdClass();
            $response->total = $numSolicitudes;
            $response->solicitudes = $solicitudes;

            $max = sizeof($solicitudes);
            for ($i = 0; $i < $max; $i++) {

                if($solicitudes[$i]->idAlumno !=  null){
                    $query = "SELECT `nombre`, `curp` , `email` FROM `alumnos` WHERE idAlumno = " . $solicitudes[$i]->idAlumno;
                    $alumno = $this->service->getByQueryTableModel($query, "Alumnos");
                    
                    $solicitudes[$i]->idAlumno = $alumno;
                }

                if($solicitudes[$i]->idEscuela !=  null){
                    $query = "SELECT `nombre`, `municipio` FROM `escuela` WHERE idEscuela = " . $solicitudes[$i]->idEscuela;
                    $escuela = $this->service->getByQueryTableModel($query, "Escuela");
                    $solicitudes[$i]->idEscuela = $escuela;
                }

                if($solicitudes[$i]->idPadre !=  null){
                    $query = "SELECT `nombre`, `curp`, `telefono` FROM `padre` WHERE idPadre = " . $solicitudes[$i]->idPadre;
                    $datosPadre = $this->service->getByQueryTableModel($query, "Padre");
                    $solicitudes[$i]->idPadre = $datosPadre;
                }
            }

            $this->returnResponse(SUCESS_RESPONSE, $solicitudes);

        }else if(empty($solicitudes)){
            return $this->returnResponse(SUCESS_EMPTY,"No se encontraron resultados con esos parametros.");
        }else{
            $this->throwError('GET_ERROR', "An error has been ocurren to paginate de users");
        }

    }
    
    public function getSolicitudesPaginate(){
        $page = $this->validateParameter('page', $this->param["page"], INTEGER);
        $perPage = $this->validateParameter('perPage', $this->param['perPage'], INTEGER);

        $solicitudes = $this->service->getAll();
        //echo json_encode($solicitudes);
        if ($solicitudes) {
            $numSolicitudes = count($solicitudes);
            $inicio = ($page - 1) * $perPage;
            $fin = $perPage;
            $paginatesSolicitudes = array_slice($solicitudes, $inicio, $fin);

            $response = new stdClass();
            $response->total = $numSolicitudes;
            $response->solicitudes = $paginatesSolicitudes;

            $max = sizeof($paginatesSolicitudes);
            for ($i = 0; $i < $max; $i++) {
                if($paginatesSolicitudes[$i]->idAlumno !=  null){
                    $query = "SELECT * FROM `alumnos` WHERE idAlumno = " . $paginatesSolicitudes[$i]->idAlumno;
                    $alumno = $this->service->getByQueryTableModel($query, "Alumnos");
                    $paginatesSolicitudes[$i]->idAlumno = $alumno;
                }

                if($paginatesSolicitudes[$i]->idEscuela !=  null){
                    $query = "SELECT * FROM `escuela` WHERE idEscuela = " . $paginatesSolicitudes[$i]->idEscuela;
                    $escuela = $this->service->getByQueryTableModel($query, "Escuela");
                    $paginatesSolicitudes[$i]->idEscuela = $escuela;
                }

                if($paginatesSolicitudes[$i]->idPadre !=  null){
                    $query = "SELECT * FROM `padre` WHERE idPadre = " . $paginatesSolicitudes[$i]->idPadre;
                    $datosPadre = $this->service->getByQueryTableModel($query, "Padre");
                    $paginatesSolicitudes[$i]->idPadre = $datosPadre;
                }

                if($paginatesSolicitudes[$i]->idIngresosFamiliares !=  null){
                    $query = "SELECT * FROM `ingresosfamiliares` WHERE idIngresosFamiliares = " . $paginatesSolicitudes[$i]->idIngresosFamiliares;
                    $ingresosFamiliares = $this->service->getByQueryTableModel($query, "IngresosFamiliares");
                    $paginatesSolicitudes[$i]->idIngresosFamiliares = $ingresosFamiliares;
                }

                if($paginatesSolicitudes[$i]->idServicios !=  null){
                    $query = "SELECT * FROM `servicios` WHERE idservicios = " . $paginatesSolicitudes[$i]->idServicios;
                    $servicios = $this->service->getByQueryTableModel($query, "Servicios");
                    $paginatesSolicitudes[$i]->idServicios = $servicios;
                }

                if($paginatesSolicitudes[$i]->idRequisitosAdicionales !=  null){
                    $query = "SELECT * FROM `requisitosadicionales` WHERE idRequisitosAdicionales = " . $paginatesSolicitudes[$i]->idRequisitosAdicionales;
                    $requisitosAdicionales = $this->service->getByQueryTableModel($query, "RequisitosAdicionales");
                    $paginatesSolicitudes[$i]->idRequisitosAdicionales = $requisitosAdicionales;
                }
            }
            $this->returnResponse(SUCESS_RESPONSE, $response);
        } else if (empty($solicitudes)) {
            $this->returnResponse(SUCESS_EMPTY, "no hay solicitudes registradas");
        } else {
            $this->throwError('GET_ERROR', "An error has been ocurren to paginate de users");
        }
    }

    public function getSolicitudByIdAlumno()
    {
        $idAlumno = $this->validateParameter("idAlumno", $this->param["idAlumno"], INTEGER);
        $query = "SELECT * FROM `solicitudes` WHERE idAlumno = $idAlumno ORDER BY idSolicitud DESC";
        $result = $this->service->getByQueryTable($query);
        if ($result) {
            $this->returnResponse(SUCESS_RESPONSE, $result[0]);
        } else {
            $this->throwError(CREATED_ERROR, $result);
        }
    }

    public function updateSolicitudByKeyandValue()
    {  
        $idSolicitud = $this->validateParameter('idSolicitud', $this->param["idSolicitud"], INTEGER);
        $key = $this->validateParameter('key', $this->param["key"], STRING);
        $value = $this->validateParameter('value', $this->param["value"], STRING);

        if ($updated = $this->service->updateByValue($key, $value, "idSolicitud", $idSolicitud)) {
            $this->returnResponse(SUCESS_UPDATED, "Se ha actualizado correctamente");
        } else {
            $this->throwError(CREATED_ERROR, $updated);
        }
    }

    public function getSolicitudesByNameAlumnoLike()
    {
        $buscar = $this->validateParameter('buscar', $this->param["buscar"], STRING);
        $page = $this->validateParameter('page', $this->param["page"], INTEGER);
        $perPage = $this->validateParameter('perPage', $this->param['perPage'], INTEGER);

        $query = "SELECT * FROM solicitudes where idAlumno = (select idAlumno from alumnos where nombre like '$buscar%')";

        $solicitudes = $this->service->getByQueryTable($query);

        if ($solicitudes) {
            $numSolicitudes = count($solicitudes);
            $inicio = ($page - 1) * $perPage;
            $fin = $perPage;
            $paginatesSolicitudes = array_slice($solicitudes, $inicio, $fin);

            $response = new stdClass();
            $response->total = $numSolicitudes;
            $response->solicitudes = $paginatesSolicitudes;

            $max = sizeof($paginatesSolicitudes);
            for ($i = 0; $i < $max; $i++) {
                $query = "SELECT * FROM `alumnos` WHERE idAlumno = " . $paginatesSolicitudes[$i]->idAlumno;
                $alumno = $this->service->getByQueryTableModel($query, "Alumnos");
                $paginatesSolicitudes[$i]->idAlumno = $alumno;

                $query = "SELECT * FROM `escuela` WHERE idEscuela = " . $paginatesSolicitudes[$i]->idEscuela;
                $escuela = $this->service->getByQueryTableModel($query, "Escuela");
                $paginatesSolicitudes[$i]->idEscuela = $escuela;

                $query = "SELECT * FROM `padre` WHERE idPadre = " . $paginatesSolicitudes[$i]->idPadre;
                $datosPadre = $this->service->getByQueryTableModel($query, "Padre");
                $paginatesSolicitudes[$i]->idPadre = $datosPadre;

                $query = "SELECT * FROM `ingresosfamiliares` WHERE idIngresosFamiliares = " . $paginatesSolicitudes[$i]->idIngresosFamiliares;
                $ingresosFamiliares = $this->service->getByQueryTableModel($query, "IngresosFamiliares");
                $paginatesSolicitudes[$i]->idIngresosFamiliares = $ingresosFamiliares;

                $query = "SELECT * FROM `servicios` WHERE idservicios = " . $paginatesSolicitudes[$i]->idServicios;
                $servicios = $this->service->getByQueryTableModel($query, "Servicios");
                $paginatesSolicitudes[$i]->idServicios = $servicios;

                $query = "SELECT * FROM `requisitosadicionales` WHERE idRequisitosAdicionales = " . $paginatesSolicitudes[$i]->idRequisitosAdicionales;
                $requisitosAdicionales = $this->service->getByQueryTableModel($query, "RequisitosAdicionales");
                $paginatesSolicitudes[$i]->idRequisitosAdicionales = $requisitosAdicionales;
            }
            $this->returnResponse(SUCESS_RESPONSE, $response);
        } else if (empty($solicitudes)) {
            $this->returnResponse(SUCESS_EMPTY, "no hay solicitudes registradas");
        } else {
            $this->throwError('GET_ERROR', "An error has been ocurren to paginate de users");
        }
    }

    public function getSolicitudById()
    {
        $idSolicitud = $this->validateParameter("idSolicitud", $this->param["idSolicitud"], STRING);

        $query = "SELECT * FROM solicitudes where idSolicitud = $idSolicitud";

        $solicitud = $this->service->getByQueryTable($query);

        if ($solicitud) {
            if($solicitud[0]->idAlumno !=  null){
                $query = "SELECT * FROM `alumnos` WHERE idAlumno = " . $solicitud[0]->idAlumno;
                $alumno = $this->service->getByQueryTableModel($query, "Alumnos");
                $solicitud[0]->idAlumno = $alumno;
            }

            if($solicitud[0]->idEscuela !=  null){
                $query = "SELECT * FROM `escuela` WHERE idEscuela = " . $solicitud[0]->idEscuela;
                $escuela = $this->service->getByQueryTableModel($query, "Escuela");
                $solicitud[0]->idEscuela = $escuela;
            }

            if($solicitud[0]->idPadre !=  null){
                $query = "SELECT * FROM `padre` WHERE idPadre = " . $solicitud[0]->idPadre;
                $datosPadre = $this->service->getByQueryTableModel($query, "Padre");
                $solicitud[0]->idPadre = $datosPadre;
            }

            if($solicitud[0]->idIngresosFamiliares !=  null){
                $query = "SELECT * FROM `ingresosfamiliares` WHERE idIngresosFamiliares = " . $solicitud[0]->idIngresosFamiliares;
                $ingresosFamiliares = $this->service->getByQueryTableModel($query, "IngresosFamiliares");
                $solicitud[0]->idIngresosFamiliares = $ingresosFamiliares;
            }

            if($solicitud[0]->idServicios !=  null){
                $query = "SELECT * FROM `servicios` WHERE idservicios = " . $solicitud[0]->idServicios;
                $servicios = $this->service->getByQueryTableModel($query, "Servicios");
                $solicitud[0]->idServicios = $servicios;
            }

            if($solicitud[0]->idRequisitosAdicionales !=  null){
                $query = "SELECT * FROM `requisitosadicionales` WHERE idRequisitosAdicionales = " . $solicitud[0]->idRequisitosAdicionales;
                $requisitosAdicionales = $this->service->getByQueryTableModel($query, "RequisitosAdicionales");
                $solicitud[0]->idRequisitosAdicionales = $requisitosAdicionales;
            }
            $this->returnResponse(SUCESS_RESPONSE,$solicitud);
        } else if (empty($solicitudes)) {
            $this->returnResponse(SUCESS_EMPTY, "no hay solicitudes registradas");
        } else {
            $this->throwError('GET_ERROR', "An error has been ocurren to paginate de users");
        }
    }

    /** Los update se pueden eliminar utlizando el modelo sin declarar attributos para 
     ** crearlos dinamicanmente se podria trabajar con update Solicitud*/

    public function updateSolicitudIdEscuela()
    {
        $idSolicitud = $this->validateParameter('idSolicitud', $this->param["idSolicitud"], INTEGER);
        $idEscuela = $this->validateParameter('idEscuela', $this->param['idEscuela'], INTEGER);

        if ($this->service->updateByValue('idEscuela', $idEscuela, 'idSolicitud', $idSolicitud)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha actualizado exitosamente la solicitud.");
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    }

    public function updateSolicitudIdPadre()
    {
        $idSolicitud = $this->validateParameter('idSolicitud', $this->param["idSolicitud"], INTEGER);
        $idPadre = $this->validateParameter('idPadre', $this->param['idPadre'], INTEGER);

        if ($this->service->updateByValue('idPadre', $idPadre, 'idSolicitud', $idSolicitud)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha actualizado exitosamente la solicitud.");
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    }

    public function updateSolicitudIdIngresosFamiliares()
    {
        $idSolicitud = $this->validateParameter('idSolicitud', $this->param["idSolicitud"], INTEGER);
        $idIngresosFamiliares = $this->validateParameter('idIngresosFamiliares', $this->param['idIngresosFamiliares'], INTEGER);

        if ($this->service->updateByValue('idIngresosFamiliares', $idIngresosFamiliares, 'idSolicitud', $idSolicitud)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha actualizado exitosamente la solicitud.");
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    }

    public function updateSolicitudIdServicios()
    {
        $idSolicitud = $this->validateParameter('idSolicitud', $this->param["idSolicitud"], INTEGER);
        $idServicios = $this->validateParameter('idServicios', $this->param['idServicios'], INTEGER);

        if ($this->service->updateByValue('idServicios', $idServicios, 'idSolicitud', $idSolicitud)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha actualizado exitosamente la solicitud.");
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    }

    public function updateSolicitudIdRequisitosAdicionales()
    {
        $idSolicitud = $this->validateParameter('idSolicitud', $this->param["idSolicitud"], INTEGER);
        $idRequisitosAdicionales = $this->validateParameter('idRequisitosAdicionales', $this->param['idRequisitosAdicionales'], INTEGER);

        if ($this->service->updateByValue('idRequisitosAdicionales', $idRequisitosAdicionales, 'idSolicitud', $idSolicitud)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha actualizado exitosamente la solicitud.");
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    }

    public function correoVerificacion(){
        $idAlumno = $this->validateParameter('idAlumno', $this->param["idAlumno"], INTEGER);

        $palabras = array('Beca', 'Alumno', 'email', 'Verificacion', 'Uriangato'); // Un array de palabras para elegir
        $palabra_aleatoria = str_shuffle($palabras[array_rand($palabras)]); // Selecciona una palabra aleatoria del array y la reordena
        $longitud_aleatoria = rand(5, 10); // Genera una longitud aleatoria entre 5 y 10 caracteres
        $palabra_aleatoria = substr($palabra_aleatoria, 0, $longitud_aleatoria); // Obtiene una subcadena aleatoria de la longitud deseada

        $query = "SELECT * FROM `alumnos` WHERE idAlumno = " . $idAlumno;
        $alumno = $this->service->getByQueryTableModel($query, "Alumnos");
        $to      = $alumno[0]->email;
        $nombre  = $alumno[0]->nombre; 
        $subject = 'Correo de verificación para registro de Beca Uriangato';

        $message = '
        <html>
            <head>
                <title>Verificacion de correo</title>
            </head>
            <body>
                <h2 style="font-weight: bold;">Solicitud de Becas Municipales</h2></br>
                <h4>Hola <span style="font-weight: bold; color: red;" >'.$nombre.'</span> tu palabra de verificación es: </h4> </br>
                <p>'.$palabra_aleatoria.'</p>
            </body>
        </html>
        ';

        $headers = 'From: emlara35@gmail.com' . "\r\n" .
            'Content-Type: text/html; charset=UTF-8'. "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        $mailResult = mail($to, $subject, $message, $headers);
        
        if($mailResult)
            $this->returnResponse(SUCESS_RESPONSE,[
                "mail" => $mailResult,
                "validationKey" => $palabra_aleatoria
            ]);
        else
            $this->throwError(UPDATED_ERROR, "A ocurrido en error con el correo");
    }

    public function correoRespuestaAceptacionBeca(){
        $id_solicitud = $this->validateParameter('idSolicitud',$this->param["idSolicitud"],INTEGER);
        $statusBeca = $this->validateParameter('statusBeca', $this->param["statusBeca"], INTEGER) ;
        $respuesta = $this->validateParameter('respuesta',$this->param["respuesta"],STRING);

        
        $solicitud = $this->service->getByField("idSolicitud",$id_solicitud);
        $query = "SELECT * FROM `alumnos` WHERE idAlumno = " . $solicitud->idAlumno;
        $alumno = $this->service->getByQueryTableModel($query, "Alumnos");

        $to = $alumno[0]->email;
        $subject = 'Resultado Solicitudes Becas Municipio de Uriangato';
        $nombre = $alumno[0]->nombre;
        $statusMessageRespuesta = "";
        $link = "";
        $servidor = "https://educacion.uriangato.gob.mx/educacion/views/solicitudes/imprimirFormato.php";
        $fecha = "2024";
        
        if($statusBeca){
            $statusMessageRespuesta = "Nos complace informale que su solicitud de beca ha si aceptada";
            $link = '<a href="'.$servidor.'?folio=EDUU-'.$id_solicitud.'-'.$fecha.'">Descargar Formato</a>';
        }else{
            $statusMessageRespuesta = "Lamentamos informarle que su solicitud ha sido rechazada, debido ha QUE:";
        }

        $message = '
        <html>
            <head>
                <title>Resultado Beca Uriangato</title>
            </head>
            <body>
                <h2 style="font-weight: bold;">Solicitud de Becas Municipales</h2></br>
                <h5> Apreciable <span style="font-weight: bold; color: red;" >'.$nombre.'</span> '.$statusMessageRespuesta.'</h5> </br>
                <h5>'.$respuesta.'<h5> <br/>
                '.$link.'
            </body>
        </html>
        ';

        $headers = 'From: emlara35@gmail.com' . "\r\n" .
            'Content-Type: text/html; charset=UTF-8'. "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        $mailResult = mail($to, $subject, $message, $headers);
    
        if($mailResult){
            if($this->service->updateByValue("notificado",1,"idSolicitud",$id_solicitud))
                $this->returnResponse(SUCESS_RESPONSE,[ "mail" => $mailResult]);
            $this->throwError(UPDATED_ERROR,"Error al actualizar el status notificado");
        }
        else
            $this->throwError(UPDATED_ERROR, "A ocurrido en error con el correo");
    }

    public function deleteSolicitud(){
        $id_solicitud = $this->validateParameter('idSolicitud',$this->param["idSolicitud"],INTEGER);
        $result = $this->service->delete("idSolicitud", $id_solicitud);
        if ($result) {
            $this->returnResponse(SUCESS_RESPONSE, "The application has been deleted sucessfully.");
        } else {
            $this->throwError('DELETE_ERROR', "An has been ocurred to deleted the application.");
        }
    }
}
 