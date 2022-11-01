<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/Solicitudes.php");

class SolicitudesRouter extends RestApi {
    public function __construct(){
        parent::__construct("solicitudes");
    }

    public function addSolicitude(){
        $idAlumno = $this->validateParameter('idAlumno',$this->param['idAlumno'],INTEGER);
        $idEscuela = $this->validateParameter('idEscuela',$this->param['idEscuela'],STRING);
        $idPadre = $this->validateParameter('idPadre',$this->param['idPadre'],STRING);
        $idServicios = $this->validateParameter('idServicios',$this->param['idServicios'],STRING);
        $idRequisitosAdicionales = $this->validateParameter('idRequisitosAdicionales',$this->param['idRequisitosAdicionales'],STRING);
        $nivelEstudios = $this->validateParameter('nivelEstudios',$this->param["nivelEstudios"],STRING);
        $promedioReciente = $this->validateParameter('promedioReciente',$this->param["promedioReciente"],STRING);

        $arguments = array($idAlumno,$idEscuela,$idPadre,$idServicios,$idRequisitosAdicionales,$nivelEstudios,$promedioReciente);
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }

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
}
?>