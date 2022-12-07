<?php
    class Escuela{
        public String $idEscuela = "autoincrement";
        public String $nombre = "";
        public String $calle = "";
        public String $no = "";
        public String $colonia = "";
        public String $municipio = "";
        public String $cp = "";
        public String $telefono = "";
        public String $tipoInstitucion = "";

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 8:
                    $this->__construct8($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7]);
                    break;
                case 9:
                    $this->__construct9($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8]);
                    break;
                default:
                    echo $numArgs." No hay constructor de este tipo en la clase Escuela";
            }
        }

        public function __construct8($nombre,$calle,$no,$colonia,$municipio,$cp,$telefono,$tipoInstitucion){
            $this->nombre = $nombre;
            $this->calle = $calle;
            $this->no = $no;
            $this->colonia = $colonia;
            $this->municipio = $municipio;
            $this->cp = $cp;
            $this->telefono = $telefono;
            $this->tipoInstitucion = $tipoInstitucion;
        }

        public function __construct9($idEscuela,$nombre,$calle,$no,$colonia,$municipio,$cp,$telefono,$tipoInstitucion){
            $this->idEscuela = $idEscuela;
            $this->nombre = $nombre;
            $this->calle = $calle;
            $this->no = $no;
            $this->colonia = $colonia;
            $this->municipio = $municipio;
            $this->cp = $cp;
            $this->telefono = $telefono;
            $this->tipoInstitucion = $tipoInstitucion;
        }
    }
?>