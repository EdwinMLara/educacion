<?php
    class Alumnos{
        public String $idAlumno = "autoincrement";
        public String $curp = "";
        public String $nombre = "";
        public String $fechaNacimiento = "";

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 3:
                    $this->__construct5($listArgs[0],$listArgs[1],$listArgs[2]);
                    break;
                case 4:
                    $this->__construct6($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3]);
                    break;
                default:
                    echo $numArgs." No hay constructor de este tipo";
            }
        }

        public function __construct5($curp,$nombre,$fechaNacimiento){
            $this->curp = $curp;
            $this->nombre = $nombre;
            $this->fechaNacimiento = $fechaNacimiento;
        }

        public function __construct6($idAlumno,$curp,$nombre,$fechaNacimiento){
            $this->idAlumno = $idAlumno;
            $this->curp = $curp;
            $this->nombre = $nombre;
            $this->fechaNacimiento = $fechaNacimiento;
        }
    }
?>