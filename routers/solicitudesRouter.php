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

class SolicitudesRouter extends RestApi {
    public function __construct(){
        parent::__construct("solicitudes");
    }

    public function addSolicitude(){
        $idAlumno = $this->validateParameter('idAlumno',$this->param['idAlumno'],INTEGER);
        $idEscuela = $this->validateParameter('idEscuela',$this->param['idEscuela'],INTEGER);
        $idPadre = $this->validateParameter('idPadre',$this->param['idPadre'],INTEGER);
        $idIngresosFamiliares = $this->validateParameter('idIngresosFamiliares',$this->param['idIngresosFamiliares'],INTEGER);
        $idServicios = $this->validateParameter('idServicios',$this->param['idServicios'],INTEGER);
        $idRequisitosAdicionales = $this->validateParameter('idRequisitosAdicionales',$this->param['idRequisitosAdicionales'],INTEGER);
        $nivelEstudios = $this->validateParameter('nivelEstudios',$this->param["nivelEstudios"],STRING);
        $promedioReciente = $this->validateParameter('promedioReciente',$this->param["promedioReciente"],STRING);
        $status = $this->validateParameter('status',$this->param["status"],STRING);
        $fecha = $this->validateParameter("fecha",$this->param["fecha"],STRING);

        $arguments = array($idAlumno,$idEscuela,$idPadre,$idIngresosFamiliares,$idServicios,$idRequisitosAdicionales,$nivelEstudios,$promedioReciente,$status,$fecha);
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }

    /** Los update se pueden eliminar utlizando el modelo sin declarar attributos para 
    ** crearlos dinamicanmente se podria trabajar con update Solicitud*/

    public function updateSolicitudIdEscuela(){
        $idSolicitud = $this->validateParameter('idSolicitud',$this->param["idSolicitud"],INTEGER);
        $idEscuela = $this->validateParameter('idEscuela',$this->param['idEscuela'],INTEGER);

        if ($this->service->updateByValue('idEscuela',$idEscuela,'idSolicitud',$idSolicitud)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha actualizado exitosamente la solicitud.");
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    }

    public function updateSolicitudIdPadre(){
        $idSolicitud = $this->validateParameter('idSolicitud',$this->param["idSolicitud"],INTEGER);
        $idPadre = $this->validateParameter('idPadre',$this->param['idPadre'],INTEGER);

        if ($this->service->updateByValue('idPadre',$idPadre,'idSolicitud',$idSolicitud)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha actualizado exitosamente la solicitud.");
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    } 

    public function updateSolicitudIdIngresosFamiliares(){
        $idSolicitud = $this->validateParameter('idSolicitud',$this->param["idSolicitud"],INTEGER);
        $idIngresosFamiliares = $this->validateParameter('idIngresosFamiliares',$this->param['idIngresosFamiliares'],INTEGER);

        if ($this->service->updateByValue('idIngresosFamiliares',$idIngresosFamiliares,'idSolicitud',$idSolicitud)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha actualizado exitosamente la solicitud.");
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    } 
    
    public function updateSolicitudIdServicios(){
        $idSolicitud = $this->validateParameter('idSolicitud',$this->param["idSolicitud"],INTEGER);
        $idServicios = $this->validateParameter('idServicios',$this->param['idServicios'],INTEGER);

        if ($this->service->updateByValue('idServicios',$idServicios,'idSolicitud',$idSolicitud)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha actualizado exitosamente la solicitud.");
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    } 

    public function updateSolicitudIdRequisitosAdicionales(){
        $idSolicitud = $this->validateParameter('idSolicitud',$this->param["idSolicitud"],INTEGER);
        $idRequisitosAdicionales = $this->validateParameter('idRequisitosAdicionales',$this->param['idRequisitosAdicionales'],INTEGER);

        if ($this->service->updateByValue('idRequisitosAdicionales',$idRequisitosAdicionales,'idSolicitud',$idSolicitud)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha actualizado exitosamente la solicitud.");
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    }

    /**Hasta qui codigo basura  */


    public function updateSolicitud(){
        $idSolicitud = $this->validateParameter('idSolicitud',$this->param["idSolicitud"],INTEGER);
        $nivelEstudios = $this->validateParameter('nivelEstudios',$this->param["nivelEstudios"],STRING);
        $promedioReciente = $this->validateParameter('promedioReciente',$this->param["promedioReciente"],STRING);
        
        $arguments = array($idSolicitud,$nivelEstudios,$promedioReciente);
        if ($this->service->update($arguments,$idSolicitud)){
            $this->returnResponse(SUCESS_RESPONSE, "Se ha actualizado exitosamente la solicitud.");
        } else {
            $this->throwError(UPDATED_ERROR, "An error has been ocurred");
        }
    }

    public function getSolicitudesPaginate(){
        $page = $this->validateParameter('page', $this->param["page"], INTEGER);
        $perPage = $this->validateParameter('perPage', $this->param['perPage'], INTEGER);

        $solicitudes = $this->service->getAll();
        //echo json_encode($solicitudes);
        if ($solicitudes) {
            $numSolicitudes = count($solicitudes);
            $inicio = ($page - 1)*$perPage;
            $fin = $perPage;
            $paginatesSolicitudes = array_slice($solicitudes, $inicio, $fin);

            $response = new stdClass();
            $response->total = $numSolicitudes;
            $response->solicitudes = $paginatesSolicitudes;

            $max = sizeof($paginatesSolicitudes);
            for($i=0;$i<$max;$i++){
                $query = "SELECT * FROM `alumnos` WHERE idAlumno = ".$paginatesSolicitudes[$i]->idAlumno;
                $alumno = $this->service->getByQueryTableModel($query,"Alumnos");
                $paginatesSolicitudes[$i]->idAlumno = $alumno;

                $query = "SELECT * FROM `escuela` WHERE idEscuela = ".$paginatesSolicitudes[$i]->idEscuela;
                $escuela = $this->service->getByQueryTableModel($query,"Escuela");
                $paginatesSolicitudes[$i]->idEscuela = $escuela;

                $query = "SELECT * FROM `padre` WHERE idPadre = ".$paginatesSolicitudes[$i]->idPadre;
                $datosPadre = $this->service->getByQueryTableModel($query,"Padre");
                $paginatesSolicitudes[$i]->idPadre = $datosPadre;

                $query = "SELECT * FROM `ingresosfamiliares` WHERE idIngresosFamiliares = ".$paginatesSolicitudes[$i]->idIngresosFamiliares;
                $ingresosFamiliares = $this->service->getByQueryTableModel($query,"IngresosFamiliares");
                $paginatesSolicitudes[$i]->idIngresosFamiliares = $ingresosFamiliares;

                $query = "SELECT * FROM `servicios` WHERE idservicios = ".$paginatesSolicitudes[$i]->idServicios;
                $servicios = $this->service->getByQueryTableModel($query,"Servicios");
                $paginatesSolicitudes[$i]->idServicios = $servicios;

                $query = "SELECT * FROM `requisitosadicionales` WHERE idRequisitosAdicionales = ".$paginatesSolicitudes[$i]->idRequisitosAdicionales;
                $requisitosAdicionales = $this->service->getByQueryTableModel($query,"RequisitosAdicionales");
                $paginatesSolicitudes[$i]->idRequisitosAdicionales = $requisitosAdicionales;
            }
            $this->returnResponse(SUCESS_RESPONSE, $response);
        } else if(empty($solicitudes)){
            $this->returnResponse(SUCESS_EMPTY, "no hay solicitudes registradas");
        }
        else{
            $this->throwError('GET_ERROR', "An error has been ocurren to paginate de users");
        }
    }

    public function getSolicitudByIdAlumno(){
        $idAlumno = $this->validateParameter("idAlumno",$this->param["idAlumno"],INTEGER);
        if($result = $this->service->getByField("idAlumno",$idAlumno)){
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, $result);
        }
    }

    public function updateSolicitudByKeyandValue(){
        $idSolicitud = $this->validateParameter('idSolicitud',$this->param["idSolicitud"],INTEGER);
        $key = $this->validateParameter('key',$this->param["key"],STRING);
        $value = $this->validateParameter('value',$this->param["value"],STRING);

        if ($updated = $this->service->updateByValue($key,$value,"idSolicitud",$idSolicitud)) {
            $this->returnResponse(SUCESS_UPDATED, "Se ha actualizado correctamente");
        } else {
            $this->throwError(CREATED_ERROR,$updated);
        }
    }
}
?>