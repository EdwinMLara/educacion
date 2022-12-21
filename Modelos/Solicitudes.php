<?php
class Solicitudes
{
    public String $idSolicitud = "autoincrement";

    public function __construct()
    {
        $listArgs = func_get_args()[0];
        $numArgs = count($listArgs);

        switch ($numArgs) {
            case 2:
                $this->__constructUpdateSolicitudEscuela($listArgs[0], $listArgs[1]);
                break;
            case 3:
                $this->__construct3($listArgs[0], $listArgs[1], $listArgs[2]);
                break;
            case 10:
                $this->__construct10($listArgs[0], $listArgs[1], $listArgs[2], $listArgs[3], $listArgs[4], $listArgs[5], $listArgs[6], $listArgs[7], $listArgs[8], $listArgs[9]);
                break;
            case 11:
                $this->__construct11($listArgs[0], $listArgs[1], $listArgs[2], $listArgs[3], $listArgs[4], $listArgs[5], $listArgs[6], $listArgs[7],$listArgs[8], $listArgs[9], $listArgs[10]);
                break;
            default:
                throw new Exception('Error al crear el constructor');
        }
    }

    public function __constructUpdateSolicitudEscuela($idSolicitud, $value){
        $this->idSolicitud = $idSolicitud;
        $this->dinamicParam = $value;
    }

    public function __construct3($idSolicitud, $nivelEstudios, $promedioReciente){
        $this->idSolicitud = $idSolicitud;
        $this->nivelEstudios = $nivelEstudios;
        $this->promedioReciente = $promedioReciente;
    }

    public function __construct10($idAlumno, $idEscuela, $idPadre, $idIngresosFamilialares, $idServicios, $idRequisitosAdicionales, $nivelEstudios, $promedioReciente,$status,$fecha){
        $this->idAlumno = $idAlumno;
        $this->idEscuela = $idEscuela;
        $this->idPadre = $idPadre;
        $this->idIngresosFamiliares = $idIngresosFamilialares;
        $this->idServicios = $idServicios;
        $this->idRequisitosAdicionales = $idRequisitosAdicionales;
        $this->nivelEstudios = $nivelEstudios;
        $this->promedioReciente = $promedioReciente;
        $this->status = $status;
        $this->fecha = $fecha;
    }

    public function __construct11($idSolicitud,$idAlumno, $idEscuela, $idPadre, $idIngresosFamilialares, $idServicios, $idRequisitosAdicionales, $nivelEstudios, $promedioReciente,$status,$fecha){
        $this->idSolicitud = $idSolicitud;
        $this->idAlumno = $idAlumno;
        $this->idEscuela = $idEscuela;
        $this->idPadre = $idPadre;
        $this->idIngresosFamiliares = $idIngresosFamilialares;
        $this->idServicios = $idServicios;
        $this->idRequisitosAdicionales = $idRequisitosAdicionales;
        $this->nivelEstudios = $nivelEstudios;
        $this->promedioReciente = $promedioReciente;
        $this->status = $status;
        $this->fecha = $fecha;
    }
}
