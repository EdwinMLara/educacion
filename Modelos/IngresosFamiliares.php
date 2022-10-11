<?php
     class IngresosFamiliares{
        public String $idIngresosFamiliares = "autoincrement";
        public String $idAlumno = "";
        public String $parestenco = "";
        public String $cantidad = "";
        public String $personasDependientes = "";

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 4:
                    $this->__construct4($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3]);
                    break;
                case 5:
                    $this->__construct5($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4]);
                    break;
                default:
                    echo $numArgs." No hay constructor de este tipo";
            }
        }

        public function __construct4($idAlumno,$parestenco,$cantidad,$personasDependientes){
            $this->idAlumno = $idAlumno;
            $this->parestenco = $parestenco;
            $this->cantidad = $cantidad;
            $this->personasDependientes = $personasDependientes;
        }

        public function __construct5($idIngresosFamiliares,$idAlumno,$parestenco,$cantidad,$personasDependientes){
            $this->idIngresosFamiliares = $idIngresosFamiliares;
            $this->idAlumno = $idAlumno;
            $this->parestenco = $parestenco;
            $this->cantidad = $cantidad;
            $this->personasDependientes = $personasDependientes;
        }
     }
?>