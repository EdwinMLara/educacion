<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/IngresosFamiliares.php");

class IngresosFamiliaresRouter extends RestApi{
    public function __construct(){
        parent::__construct("ingresosfamiliares");
    }

    public function addIngresosFamiliares(){
        $ingresoPapa = $this->validateParameter('ingresoPapa', $this->param["ingresoPapa"], INTEGER);
        $ingresoMama = $this->validateParameter('ingresoMama', $this->param["ingresoMama"], INTEGER);
        $ingresoHermanos = $this->validateParameter('ingresoHermanos', $this->param["ingresoHermanos"], INTEGER);
        $ingresosAbuelos = $this->validateParameter('ingresoAbuelos', $this->param["ingresoAbuelos"], INTEGER);
        $personaDependientes = $this->validateParameter('personasDependientes', $this->param["personasDependientes"], INTEGER);
        
        $arguments = array($ingresoPapa,$ingresoMama,$ingresoHermanos,$ingresosAbuelos,$personaDependientes);
        
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