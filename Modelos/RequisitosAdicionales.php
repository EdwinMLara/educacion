<?php
    class RequisitosAdicionales {
        public String $idRequisitosAdicionales = "autoincrement";
        public String $escuelaDentroMunicipio = "";
        public String $tiempoTranslado = "";
        public String $tipoTransporte = "";
        public String $tipoTechoCasa = "";
        public String $aguaEnCasa = "";
        public String $tipoMaterialPisoCasa = "";
        public String $energiaElectrica = "";
        public String $tipoMaterialMurosCasa = "";
        public String $recibeOtroApoyo = "";
        public String $tipoApoyo = "";

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 10:
                    $this->__construct10($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9]);
                    break;
                case 11:
                    $this->__construct11($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9],$listArgs[10]);
                    break;
                default:
                    echo $numArgs." No hay constructor de este tipo requisitos adicionales";
            }
        }

        public function __construct10($escuelaDentroMunicipio,$tiempoTranslado,$tipoTransporte,$tipoTechoCasa,$aguaEnCasa,$tipoMaterialPisoCasa,$energiaElectrica,$tipoMaterialMurosCasa,$recibeOtroApoyo,$tipoApoyo){
            $this->escuelaDentroMunicipio = $escuelaDentroMunicipio;
            $this->tiempoTranslado = $tiempoTranslado;
            $this->tipoTransporte = $tipoTransporte;
            $this->tipoTechoCasa = $tipoTechoCasa;
            $this->aguaEnCasa = $aguaEnCasa;
            $this->tipoMaterialPisoCasa = $tipoMaterialPisoCasa;
            $this->energiaElectrica = $energiaElectrica;
            $this->tipoMaterialMurosCasa = $tipoMaterialMurosCasa;
            $this->recibeOtroApoyo = $recibeOtroApoyo;
            $this->tipoApoyo = $tipoApoyo;
        }

        public function __construct11($idRequisitosAdicionales,$escuelaDentroMunicipio,$tiempoTranslado,$tipoTransporte,$tipoTechoCasa,$aguaEnCasa,$tipoMaterialPisoCasa,$energiaElectrica,$tipoMaterialMurosCasa,$recibeOtroApoyo,$tipoApoyo){
            $this->idRequisitosAdicionales = $idRequisitosAdicionales;
            $this->escuelaDentroMunicipio = $escuelaDentroMunicipio;
            $this->tiempoTranslado = $tiempoTranslado;
            $this->tipoTransporte = $tipoTransporte;
            $this->tipoTechoCasa = $tipoTechoCasa;
            $this->aguaEnCasa = $aguaEnCasa;
            $this->tipoMaterialPisoCasa = $tipoMaterialPisoCasa;
            $this->energiaElectrica = $energiaElectrica;
            $this->tipoMaterialMurosCasa = $tipoMaterialMurosCasa;
            $this->recibeOtroApoyo = $recibeOtroApoyo;
            $this->tipoApoyo = $tipoApoyo;
        }
    }
?>