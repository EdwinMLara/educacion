<?php
class Solicitudes {
    public String $idSolicitud = "autoincrement";
    public String $idAlumno = "";
    public String $idEscuela = "";
    public String $idPadre = "";
    public String $idServicios = "";
    public String $idRequisitosAdicionales = "";

    public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 4:
                    $this->__construct4($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4]);
                    break;
                case 5:
                    $this->__construct5($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5]);
                    break;
                default:
                    echo $numArgs." No hay constructor de este tipo";
            }
    }

    public function __construct4($idAlumno,$idEscuela,$idPadre,$idServicios,$idRequisitosAdicionales){
        $this->idAlumno = $idAlumno;
        $this->idEscuela = $idEscuela;
        $this->idPadre = $idPadre;
        $this->idServicios = $idServicios;
        $this->idRequisitosAdicionales = $idRequisitosAdicionales;
    }

    public function __construct5($idSolicitud,$idAlumno,$idEscuela,$idPadre,$idServicios,$idRequisitosAdicionales){
        $this->idSolicitud = $idSolicitud;
        $this->idAlumno = $idAlumno;
        $this->idEscuela = $idEscuela;
        $this->idPadre = $idPadre;
        $this->idServicios = $idServicios;
        $this->idRequisitosAdicionales = $idRequisitosAdicionales;
    }
}
