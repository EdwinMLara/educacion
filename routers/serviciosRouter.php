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
        $recolecionBasura = $this->validateParameter('recolecionBasura',$this->param["recolecionBasura"],STRING);
        $alumbradoPublico = $this->validateParameter('alumbradoPublico',$this->param["alumbradoPublico"],STRING);
        $telefonoPublico = $this->validateParameter('telefonoPublico',$this->param["telefonoPublico"],STRING);
        $transportePublico = $this->validateParameter('transportePublico',$this->param["transportePublico"],STRING);
        $aguaPotable = $this->validateParameter('aguaPotable',$this->param['aguaPotable'],STRING);
        $juegosOCanchas = $this->validateParameter('juegosOCanchas',$this->param['juegosOCanchas'],STRING);

        $arguments = array($callesPavimentadas,$drenaje,$biblioteca,$recolecionBasura,$alumbradoPublico,$telefonoPublico,$transportePublico,$aguaPotable,$juegosOCanchas);
        if ($this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, "Se ha registrado exitosamente.");
        } else {
            $this->throwError('CREATED_ERROR', "An error has been ocurred to register.");
        }
    }
}
?>