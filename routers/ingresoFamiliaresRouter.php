<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/IngresosFamiliares.php");

class IngresosFamiliaresRouter extends RestApi{
    public function __construct(){
        parent::__construct("ingresosfamiliares");   
    }

    public function addIngresosFamiliares(){
        $idAlumno = $this->validateParameter('idAlumno', $this->param["idAlumno"], STRING);
        $ingresoPapa = $this->validateParameter('ingresoPapa', $this->param["ingresoPapa"], STRING);
        $ingresoMama = $this->validateParameter('ingresoMama', $this->param["ingresoMama"], STRING);
        $ingresoHermanos = $this->validateParameter('ingresoHermanos', $this->param["ingresoHermanos"], STRING);
        $ingresosAbuelos = $this->validateParameter('ingresoAbuelos', $this->param["ingresoAbuelos"], STRING);
        $personaDependientes = $this->validateParameter('personasDependientes', $this->param["personasDependientes"], STRING);
        
        $arguments = array($idAlumno, $ingresoPapa,$ingresoMama,$ingresoHermanos,$ingresosAbuelos,$personaDependientes);
        if ($this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha registrado exitosamente.");
        } else {
            $this->throwError('CREATED_ERROR', "An error has been ocurred to register.");
        }
    }
}

?>