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

        $arguments = array($curp, $nombre, $fechaNacimiento);
        
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }

    public function getByCurp(){
        $curp = $this->validateParameter('curp', $this->param["curp"], STRING);
        $query = "SELECT * FROM `alumnos` where curp = '".$curp."' LIMIT 1 ";
        if ($result = $this->service->getByQueryTable($query,"alumnos")) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }

    public function updateAlumnoByKeyandValue(){
        $idAlumno = $this->validateParameter('idAlumno',$this->param["idAlumno"],INTEGER);
        $key = $this->validateParameter('key',$this->param["key"],STRING);
        $value = $this->validateParameter('value',$this->param["value"],STRING);

        if ($updated = $this->service->updateByValue($key,$value,"idAlumno",$idAlumno)) {
            $this->returnResponse(SUCESS_UPDATED, "Se ha actualizado correctamente");
        } else {
            $this->throwError(CREATED_ERROR,$updated);
        }
    }
}

?>   