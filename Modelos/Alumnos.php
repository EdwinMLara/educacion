<?php
    class Alumnos{
        public String $idAlumno = "autoincrement";  

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 2:
                    $this->__constructUpdate($listArgs[0],$listArgs[1]);
                    break;
                case 4:
                    $this->__construct5($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3]);
                    break;
                case 5:
                    $this->__construct6($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4]);
                    break;
                default:
                    throw new Exception('Error al crear el constructor Alumnos');
            }
        }

        public function __constructUpdate(){

        }

        public function __construct5($curp,$nombre,$fechaNacimiento,$file){
            $this->curp = $curp;
            $this->nombre = $nombre;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->file = $file;
        }

        public function __construct6($idAlumno,$curp,$nombre,$fechaNacimiento,$file){
            $this->idAlumno = $idAlumno;
            $this->curp = $curp;
            $this->nombre = $nombre;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->file = $file;
        }
    }
?>