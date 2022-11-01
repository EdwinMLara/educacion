<?php
class Solicitudes {
    public String $idSolicitud = "autoincrement";

    public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 2:
                    $this->__constructUpdateSolicitudEscuela($listArgs[0],$listArgs[1]);
                    break;
                case 3:
                    $this->__construct3($listArgs[0],$listArgs[1],$listArgs[2]);
                    break;
                case 7:
                    $this->__construct7($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6]);
                    break;
                default:
                    echo $numArgs." No hay constructor de este tipo";
            }
    }

    public function __constructUpdateSolicitudEscuela($idSolicitud,$idEscuela){
        $this->idSolicitud = $idSolicitud;
        $this->idEscuela = $idEscuela;
    }

    public function __construct3($idSolicitud,$nivelEstudios,$promedioReciente){
        $this->idSolicitud = $idSolicitud;
        $this->nivelEstudios = $nivelEstudios;
        $this->promedioReciente = $promedioReciente;
    }

    public function __construct7($idAlumno,$idEscuela,$idPadre,$idServicios,$idRequisitosAdicionales,$nivelEstudios,$promedioReciente){
        $this->idAlumno = $idAlumno;
        $this->idEscuela = $idEscuela;
        $this->idPadre = $idPadre;
        $this->idServicios = $idServicios;
        $this->idRequisitosAdicionales = $idRequisitosAdicionales;
        $this->nivelEstudios = $nivelEstudios;
        $this->promedioReciente = $promedioReciente;
    }
}
