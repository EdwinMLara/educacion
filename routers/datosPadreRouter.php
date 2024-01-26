<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/DatosPadre.php");

class DatosPadreRouter extends RestApi{
    public function __construct(){
        parent::__construct("padre");
    }

    public function addDatosPadre(){
        $idAlumno = $this->validateParameter('idAlumno',$this->param["idAlumno"],INTEGER);
        $nombre = $this->validateParameter('nombre', $this->param["nombre"], STRING);
        $telefeno = $this->validateParameter("telefono",$this->param["telefono"],STRING);
        $fechaNacimiento = $this->validateParameter("fechaNacimiento",$this->param["fechaNacimiento"],STRING);
        $curp = $this->validateParameter("curp",$this->param["curp"],STRING);
        $calle = $this->validateParameter("calle",$this->param["calle"],STRING);
        $no = $this->validateParameter("no",$this->param["no"],STRING);
        $colonia = $this->validateParameter("colonia",$this->param["colonia"],STRING);
        $cp = $this->validateParameter("cp",$this->param["cp"],STRING);
        $municipio = $this->validateParameter("municipio",$this->param["municipio"],STRING);
        $gradoEstudios = $this->validateParameter("gradoEstudios",$this->param["gradoEstudios"],STRING);
        $trabajo6Meses = $this->validateParameter("trabajo6Meses",$this->param["trabajo6Meses"],STRING);
        $motivoNoTrabajo = $this->validateParameter("motivoNoTrabajo",$this->param["motivoNoTrabajo"],STRING);
        $seguroMedico = $this->validateParameter("seguroMedico",$this->param["seguroMedico"],STRING);
        $file = $this->validateParameter('file',$this->param["file"],STRING); 

        $arguments = array($idAlumno,$curp,$nombre,$telefeno,$fechaNacimiento,$calle,$no,$colonia,$cp,$municipio,$gradoEstudios,$trabajo6Meses,$motivoNoTrabajo,$seguroMedico,$file);
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }

    public function updatePadreByKeyandValue(){
        $idPadre = $this->validateParameter('idPadre',$this->param["idPadre"],INTEGER);
        $key = $this->validateParameter('key',$this->param["key"],STRING);
        $value = $this->validateParameter('value',$this->param["value"],STRING);

        if ($updated = $this->service->updateByValue($key,$value,"idPadre",$idPadre)) {
            $this->returnResponse(SUCESS_UPDATED, "Se ha actualizado correctamente");
        } else {
            $this->throwError(CREATED_ERROR,$updated);
        }
    }
}

?>