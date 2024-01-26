<?php
    class RequisitosAdicionales {
        public String $idRequisitosAdicionales = "autoincrement";
        public String $idAlumno = "";
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
                case 11:
                    $this->__construct11($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9],$listArgs[10]);
                    break;
                case 12:
                    $this->__construct12($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9],$listArgs[10],$listArgs[11]);
                    break;
                default:
                    throw new Exception('Error al crear el constructor Requisitos Adicionales');
            }
        }

        public function __construct11($idAlumno,$escuelaDentroMunicipio,$tiempoTranslado,$tipoTransporte,$tipoTechoCasa,$aguaEnCasa,$tipoMaterialPisoCasa,$energiaElectrica,$tipoMaterialMurosCasa,$recibeOtroApoyo,$tipoApoyo){
            $this->idAlumno = $idAlumno;
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

        public function __construct12($idRequisitosAdicionales,$idAlumno,$escuelaDentroMunicipio,$tiempoTranslado,$tipoTransporte,$tipoTechoCasa,$aguaEnCasa,$tipoMaterialPisoCasa,$energiaElectrica,$tipoMaterialMurosCasa,$recibeOtroApoyo,$tipoApoyo){
            $this->idRequisitosAdicionales = $idRequisitosAdicionales;
            $this->idAlumno = $idAlumno;
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