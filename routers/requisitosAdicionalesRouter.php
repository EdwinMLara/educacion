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
        $tipoTechoCasa = $this->validateParameter('tipoTechoTechoCasa', $this->param["tipoTechoCasa"], STRING);
        $aguaEnCasa = $this->validateParameter('aguaEncasa', $this->param["aguaEnCasa"], STRING);
        $tipoMaterialPisoCasa = $this->validateParameter("tipoMaterialPisoCasa",$this->param["tipoMaterialPisoCasa"],STRING);
        $tipoMaterialMurosCasa = $this->validateParameter('tipoMaterialMurosCasa', $this->param["tipoMaterialMurosCasa"], STRING);
        $recibeOtroApoyo = $this->validateParameter('recibeOtroApoyo', $this->param["recibeOtroApoyo"], STRING);
        $tipoApoyo = $this->validateParameter('tipoApoyo', $this->param["tipoApoyo"], STRING);

        $arguments = array($escuelaDentroMunicipio,$tiempoTranslado,$tipoTransporte,$tipoTechoCasa,$aguaEnCasa,$tipoMaterialPisoCasa,$tipoMaterialMurosCasa,$recibeOtroApoyo,$tipoApoyo);
        
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }
}

?>