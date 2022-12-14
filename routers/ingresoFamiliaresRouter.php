<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/IngresosFamiliares.php");

class IngresosFamiliaresRouter extends RestApi{
    public function __construct(){
        parent::__construct("ingresosfamiliares");
    }

    public function addIngresosFamiliares(){
        $ingresoPapa = $this->validateParameter('ingresoPapa', $this->param["ingresoPapa"],STRING);
        $ingresoMama = $this->validateParameter('ingresoMama', $this->param["ingresoMama"], STRING);
        $ingresoHermanos = $this->validateParameter('ingresoHermanos', $this->param["ingresoHermanos"], STRING);
        $ingresosAbuelos = $this->validateParameter('ingresoAbuelos', $this->param["ingresoAbuelos"], STRING);
        $personaDependientes = $this->validateParameter('personasDependientes', $this->param["personasDependientes"], STRING);
        $file = $this->validateParameter('file',$this->param["file"],STRING); 

        $arguments = array($ingresoPapa,$ingresoMama,$ingresoHermanos,$ingresosAbuelos,$personaDependientes,$file);
        
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }

    public function updateIngresosFamiliaresByKeyandValue(){
        $idIngresosFamiliares = $this->validateParameter('idIngresosFamiliares',$this->param["idIngresosFamiliares"],INTEGER);
        $key = $this->validateParameter('key',$this->param["key"],STRING);
        $value = $this->validateParameter('value',$this->param["value"],STRING);

        if ($updated = $this->service->updateByValue($key,$value,"idIngresosFamiliares",$idIngresosFamiliares)) {
            $this->returnResponse(SUCESS_UPDATED, "Se ha actualizado correctamente");
        } else {
            $this->throwError(CREATED_ERROR,$updated);
        }
    }
}

?>