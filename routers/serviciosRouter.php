<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/Servicios.php");

class ServiciosRouter extends RestApi{
    public function __construct(){
        parent::__construct("servicios");
    }

    public function addServicios(){
        $callesPavimentadas = $this->validateParameter('callesPavimentadas', $this->param["callesPavimentadas"], STRING);
        $drenaje = $this->validateParameter('drenaje',$this->param["drenaje"],STRING);
        $biblioteca = $this->validateParameter('biblioteca',$this->param["biblioteca"],STRING);
        $recoleccionBasura = $this->validateParameter('recoleccionBasura',$this->param["recoleccionBasura"],STRING);
        $alumbradoPublico = $this->validateParameter('alumbradoPublico',$this->param["alumbradoPublico"],STRING);
        $telefonoPublico = $this->validateParameter('telefonoPublico',$this->param["telefonoPublico"],STRING);
        $transportePublico = $this->validateParameter('transportePublico',$this->param["transportePublico"],STRING);
        $aguaPotable = $this->validateParameter('aguaPotable',$this->param['aguaPotable'],STRING);
        $juegosOCanchas = $this->validateParameter('juegosOCanchas',$this->param['juegosOCanchas'],STRING);
        $file = $this->validateParameter('file',$this->param["file"],STRING);

        $arguments = array($callesPavimentadas,$drenaje,$biblioteca,$recoleccionBasura,$alumbradoPublico,$telefonoPublico,$transportePublico,$aguaPotable,$juegosOCanchas,$file);
        
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR, "An error has been ocurred to register.");
        }
    }

    public function updateServiciosByKeyandValue(){ 
        $idServicios = $this->validateParameter('idServicios',$this->param["idServicios"],INTEGER);
        $key = $this->validateParameter('key',$this->param["key"],STRING);
        $value = $this->validateParameter('value',$this->param["value"],STRING);

        if ($updated = $this->service->updateByValue($key,$value,"idServicios",$idServicios)) {
            $this->returnResponse(SUCESS_UPDATED, "Se ha actualizado correctamente");
        } else {
            $this->throwError(CREATED_ERROR,$updated);
        }
    }
}
?>