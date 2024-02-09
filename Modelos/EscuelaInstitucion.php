<?php
    class Escuela{
        public String $idEscuela = "autoincrement";

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
                    $this->__construct1($listArgs[0],$listArgs[1]);
            }
        }

        public function __construct1($nombre,$municipio){
            $this->nombre = $nombre;
            $this->municipio = $municipio;
        }

        public function __construct10($idAlumno,$nombre,$calle,$no,$colonia,$municipio,$cp,$telefono,$tipoInstitucion,$file){
            $this->idAlumno = $idAlumno;
            $this->nombre = $nombre;
            $this->calle = $calle;
            $this->no = $no;
            $this->colonia = $colonia;
            $this->municipio = $municipio;
            $this->cp = $cp;
            $this->telefono = $telefono;
            $this->tipoInstitucion = $tipoInstitucion;
            $this->file = $file;
        }

        public function __construct11($idEscuela,$idAlumno,$nombre,$calle,$no,$colonia,$municipio,$cp,$telefono,$tipoInstitucion,$file){
            $this->idEscuela = $idEscuela;
            $this->idAlumno = $idAlumno;
            $this->nombre = $nombre;
            $this->calle = $calle;
            $this->no = $no;
            $this->colonia = $colonia;
            $this->municipio = $municipio;
            $this->cp = $cp;
            $this->telefono = $telefono;
            $this->tipoInstitucion = $tipoInstitucion;
            $this->file = $file;
        }
    }
?>