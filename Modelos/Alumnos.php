<?php
    class Alumnos{
        public String $idAlumno = "autoincrement";
        public String $nombre = "";
        public String $fechaNacimiento = "";
        public String $curp = "";

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

        public function __construct5($nombre,$fechaNacimiento,$curp){
            $this->nombre = $nombre;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->curp = $curp;
        }

        public function __construct6($idAlumno,$nombre,$fechaNacimiento,$curp){
            $this->idAlumno = $idAlumno;
            $this->nombre = $nombre;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->curp = $curp;
        }
    }
?>