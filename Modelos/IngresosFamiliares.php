<?php
     class IngresosFamiliares{
        public String $idIngresosFamiliares = "autoincrement";
        public String $ingresoPapa = "";
        public String $ingresoMama = "";
        public String $ingresoHermanos = "";
        public String $ingresoAbuelos = "";
        public String $personasDependientes = "";
        public String $file = "";

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 6:
                    $this->__construct6($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5]);
                    break;
                case 7:
                    $this->__construct7($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6]);
                    break;
                default:
                    throw new Exception('Error al crear el constructor Ingresos Familiares');
            }
        }

        public function __construct6($ingresoPapa,$ingresoMama,$ingresoHermanos,$ingresoAbuelos,$personasDependientes,$file){
            $this->ingresoPapa = $ingresoPapa;
            $this->ingresoMama = $ingresoMama;
            $this->ingresoHermanos = $ingresoHermanos;
            $this->ingresoAbuelos = $ingresoAbuelos;
            $this->personasDependientes = $personasDependientes;
            $this->file = $file;
        }

        public function __construct7($idIngresosFamiliares,$ingresoPapa,$ingresoMama,$ingresoHermanos,$ingresoAbuelos,$personasDependientes,$file){
            $this->idIngresosFamiliares = $idIngresosFamiliares;
            $this->ingresoPapa = $ingresoPapa;
            $this->ingresoMama = $ingresoMama;
            $this->ingresoHermanos = $ingresoHermanos;
            $this->ingresoAbuelos = $ingresoAbuelos;
            $this->personasDependientes = $personasDependientes;
            $this->file = $file;
        }
     }
?>