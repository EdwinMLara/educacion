<?php
    class Escuela{
        public String $idEscuela = "autoincrement";

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 9:
                    $this->__construct9($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8]);
                    break;
                case 10:
                    $this->__construct10($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9]);
                    break;
                default:
                    throw new Exception('Error al crear el constructor Escuela');
            }
        }

        public function __construct9($nombre,$calle,$no,$colonia,$municipio,$cp,$telefono,$tipoInstitucion,$file){
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

        public function __construct10($idEscuela,$nombre,$calle,$no,$colonia,$municipio,$cp,$telefono,$tipoInstitucion,$file){
            $this->idEscuela = $idEscuela;
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