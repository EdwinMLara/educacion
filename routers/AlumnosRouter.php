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
        $correo = $this->validateParameter('correo', $this->param["correo"], STRING);
        $nombre = $this->validateParameter('nombre', $this->param["nombre"], STRING);
        $fechaNacimiento = $this->validateParameter('fechaNacimiento', $this->param["fechaNacimiento"], STRING);
        $file = $this->validateParameter('file',$this->param["file"],STRING); 
        
        $arguments = array($curp,$correo, $nombre, $fechaNacimiento,$file);
        
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }

    public function getByCurp(){
        $curp = $this->validateParameter('curp', $this->param["curp"], STRING);
        $query = "SELECT * FROM `alumnos` where curp = '".$curp."' LIMIT 1 ";
        $result = $this->service->getByQueryTable($query,"alumnos");
        if ($result) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else if(empty($solicitudes)){
            $this->returnResponse(SUCESS_EMPTY, "no hay solicitudes registradas");
        }else {
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
