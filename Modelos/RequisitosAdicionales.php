<?php
    class RequisitiosAdicionales {
        public String $idRequisitosAdicionales = "autoincrement";
        public String $escuelaDestroMunicipio = "";
        public String $tiempoTranslado = "";
        public String $tipoTransporte = "";
        public String $tipoTechoCasa = "";
        public String $aguaEnCasa = "";
        public String $tipoMaterialPisoCasa = "";
        public String $tipoMaterialMurosCasa = "";
        public String $recibeOtroApoyo = "";
        public String $tipoApoyo = "";

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 9:
                    $this->__construct9($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8]);
                    break;
                case 10:
                    $this->__construct10($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9]);
                    break;
                default:
                    echo $numArgs." No hay constructor de este tipo";
            }
        }

        public function __construct9($escuelaDestroMunicipio,$tiempoTranslado,$tipoTransporte,$tipoTechoCasa,$aguaEnCasa,$tipoMaterialPisoCasa,$tipoMaterialMurosCasa,$recibeOtroApoyo,$tipoApoyo){
            $this->escuelaDestroMunicipio = $escuelaDestroMunicipio;
            $this->tiempoTranslado = $tiempoTranslado;
            $this->tipoTransporte = $tipoTransporte;
            $this->tipoTechoCasa = $tipoTechoCasa;
            $this->aguaEnCasa = $aguaEnCasa;
            $this->tipoMaterialPisoCasa = $tipoMaterialPisoCasa;
            $this->tipoMaterialMurosCasa = $tipoMaterialMurosCasa;
            $this->recibeOtroApoyo = $recibeOtroApoyo;
            $this->tipoApoyo = $tipoApoyo;
        }

        public function __construct10($idRequisitosAdicionales,$escuelaDestroMunicipio,$tiempoTranslado,$tipoTransporte,$tipoTechoCasa,$aguaEnCasa,$tipoMaterialPisoCasa,$tipoMaterialMurosCasa,$recibeOtroApoyo,$tipoApoyo){
            $this->idRequisitosAdicionales = $idRequisitosAdicionales;
            $this->escuelaDestroMunicipio = $escuelaDestroMunicipio;
            $this->tiempoTranslado = $tiempoTranslado;
            $this->tipoTransporte = $tipoTransporte;
            $this->tipoTechoCasa = $tipoTechoCasa;
            $this->aguaEnCasa = $aguaEnCasa;
            $this->tipoMaterialPisoCasa = $tipoMaterialPisoCasa;
            $this->tipoMaterialMurosCasa = $tipoMaterialMurosCasa;
            $this->recibeOtroApoyo = $recibeOtroApoyo;
            $this->tipoApoyo = $tipoApoyo;
        }
    }
?>