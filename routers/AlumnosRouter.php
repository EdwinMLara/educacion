<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/Alumnos.php");

class AlumnosRouter extends RestApi{
    public function __construct(){
        parent::__construct("alumnos");
    }

    public function addAlumno(){
        $nombre = $this->validateParameter('nombre', $this->param["nombre"], STRING);
        $fechaNacimiento = $this->validateParameter('fechaNacimiento', $this->param["fechaNacimiento"], STRING);
        $curp = $this->validateParameter('curp', $this->param["curp"], STRING);
        $nivelEstudios = $this->validateParameter('nivelEstudios', $this->param["nivelEstudios"], STRING);
        $promedioReciente = $this->validateParameter('promedioReciente', $this->param["promedioReciente"], STRING);

        $arguments = array($nombre, $fechaNacimiento,$curp,$nivelEstudios,$promedioReciente);
        if ($this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha registrado exitosamente.");
        } else {
            $this->throwError('CREATED_ERROR', "An error has been ocurred to register.");
        }
    }

}

?>