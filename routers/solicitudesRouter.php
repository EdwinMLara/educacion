<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/Solicitudes.php");

class SolicitudesRouters extends RestApi {
    public function __construct(){
        parent::__construct("solicitudes");
    }

    public function addSolicitudes(){
        $idAlumno = $this->validateParameter('idAlumno',$this->param['idAlumno'],STRING);
        $idEscuela = $this->validateParameter('idEscuela',$this->param['idEscuela'],STRING);
        $idPadre = $this->validateParameter('idPadre',$this->param['idPadre'],STRING);
        $idServicios = $this->validateParameter('idServicios',$this->param['idServicios'],STRING);
        $idRequisitosAdicionales = $this->validateParameter('idRequisitosAdicionales',$this->param['idRequisitosAdicionales'],STRING);

        $arguments = array($idAlumno,$idEscuela,$idPadre,$idServicios,$idRequisitosAdicionales);
        if ($this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha registrado exitosamente.");
        } else {
            $this->throwError('CREATED_ERROR', "An error has been ocurred to register.");
        }
    }
}
?>