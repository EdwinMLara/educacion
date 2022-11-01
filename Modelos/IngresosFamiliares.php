<?php
     class IngresosFamiliares{
        public String $idIngresosFamiliares = "autoincrement";
        public String $ingresoPapa = "";
        public String $ingresoMama = "";
        public String $ingresoHermanos = "";
        public String $ingresoAbuelos = "";
        public String $personasDependientes = "";

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 5:
                    $this->__construct5($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4]);
                    break;
                case 6:
                    $this->__construct6($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5]);
                    break;
                default:
                    echo $numArgs." No hay constructor de este tipo";
            }
        }

        public function __construct5($ingresoPapa,$ingresoMama,$ingresoHermanos,$ingresoAbuelos,$personasDependientes){
            $this->ingresoPapa = $ingresoPapa;
            $this->ingresoMama = $ingresoMama;
            $this->ingresoHermanos = $ingresoHermanos;
            $this->ingresoAbuelos = $ingresoAbuelos;
            $this->personasDependientes = $personasDependientes;
        }

        public function __construct6($idIngresosFamiliares,$ingresoPapa,$ingresoMama,$ingresoHermanos,$ingresoAbuelos,$personasDependientes){
            $this->idIngresosFamiliares = $idIngresosFamiliares;
            $this->ingresoPapa = $ingresoPapa;
            $this->ingresoMama = $ingresoMama;
            $this->ingresoHermanos = $ingresoHermanos;
            $this->ingresoAbuelos = $ingresoAbuelos;
            $this->personasDependientes = $personasDependientes;
        }
     }
?>