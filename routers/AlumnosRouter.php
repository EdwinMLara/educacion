<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/Alumnos.php");

class AlumnosRouter extends RestApi{
    public function __construct(){
        parent::__construct("alumnos");
    }

    public function addAlumno(){
        $curp = $this->validateParameter('curp', $this->param["curp"], STRING);
        $nombre = $this->validateParameter('nombre', $this->param["nombre"], STRING);
        $fechaNacimiento = $this->validateParameter('fechaNacimiento', $this->param["fechaNacimiento"], STRING); 

        $arguments = array($nombre, $fechaNacimiento, $curp);
        
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }

    public function getByCurp(){
        $curp = $this->validateParameter('curp', $this->param["curp"], STRING);
    }
}

?>  