<?php
    class Alumnos{
        public String $idAlumno = "autoincrement";
        public String $nombre = "";
        public String $fechaNacimiento = "";
        public String $curp = "";
        public String $nivelEstudios = "";
        public String $promedioReciente = "";

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 4:
                    $this->__construct4($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4]);
                    break;
                case 5:
                    $this->__construct5($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5]);
                    break;
                default:
                    echo $numArgs." No hay constructor de este tipo";
            }
        }

        public function __construct4($nombre,$fechaNacimiento,$curp,$nivelEstudios,$promedioReciente){
            $this->nombre = $nombre;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->curp = $curp;
            $this->nivelEstudios = $nivelEstudios;
            $this->promedioReciente = $promedioReciente;
        }

        public function __construct5($idAlumno,$nombre,$fechaNacimiento,$curp,$nivelEstudios,$promedioReciente){
            $this->idAlumno = $idAlumno;
            $this->nombre = $nombre;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->curp = $curp;
            $this->nivelEstudios = $nivelEstudios;
            $this->promedioReciente = $promedioReciente;
        }
    }
?>