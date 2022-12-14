<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/RequisitosAdicionales.php");

class RequisitosAdicionalesRouter extends RestApi{

    public function __construct(){
        parent::__construct("requisitosadicionales");
    }

    public function addRequisitosAdicionales(){
        $escuelaDentroMunicipio = $this->validateParameter('escuelaDentroMunicipio', $this->param["escuelaDentroMunicipio"], STRING);
        $tiempoTranslado = $this->validateParameter('tiempoTranslado', $this->param["tiempoTranslado"], STRING);
        $tipoTransporte = $this->validateParameter('tipoTransporte', $this->param["tipoTransporte"], STRING);
        $tipoTechoCasa = $this->validateParameter('tipoTechoCasa', $this->param["tipoTechoCasa"], STRING);
        $aguaEnCasa = $this->validateParameter('aguaEncasa', $this->param["aguaEnCasa"], STRING);
        $tipoMaterialPisoCasa = $this->validateParameter("tipoMaterialPisoCasa",$this->param["tipoMaterialPisoCasa"],STRING);
        $energiaElectrica = $this->validateParameter('energiaElectrica',$this->param['energiaElectrica'],STRING);
        $tipoMaterialMurosCasa = $this->validateParameter('tipoMaterialMurosCasa', $this->param["tipoMaterialMurosCasa"], STRING);
        $recibeOtroApoyo = $this->validateParameter('recibeOtroApoyo', $this->param["recibeOtroApoyo"], STRING);
        $tipoApoyo = $this->validateParameter('tipoApoyo', $this->param["tipoApoyo"], STRING);

        $arguments = array($escuelaDentroMunicipio,$tiempoTranslado,$tipoTransporte,$tipoTechoCasa,$aguaEnCasa,$tipoMaterialPisoCasa,$energiaElectrica,$tipoMaterialMurosCasa,$recibeOtroApoyo,$tipoApoyo);
        
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }

    public function updateRequisitosAdicionalesByKeyandValue(){
        $idRequisitosAdicionales = $this->validateParameter('idRequisitosAdicionales',$this->param["idRequisitosAdicionales"],INTEGER);
        $key = $this->validateParameter('key',$this->param["key"],STRING);
        $value = $this->validateParameter('value',$this->param["value"],STRING);

        if ($updated = $this->service->updateByValue($key,$value,"idRequisitosAdicionales",$idRequisitosAdicionales)) {
            $this->returnResponse(SUCESS_UPDATED, "Se ha actualizado correctamente");
        } else {
            $this->throwError(CREATED_ERROR,$updated);
        }
    }
}

?>