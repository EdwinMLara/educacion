<?php
    class EscuelaInstitucion{
        public static String $tablename = "escuelainstitucion";
        public String $idEscuela = "autoincrement";
        public String $nombre = "";
        public String $calle = "";
        public String $no = "";
        public String $colonia = "";
        public String $municipio = "";
        public String $telefono = "";
        public String $tipoInstitucion = "";

        public function __construct($nombre,$calle,$no,$colonia,$municipio,$telefono,$tipoInstitucion){
            $this->nombre = $nombre;
            $this->calle = $calle;
            $this->no = $no;
            $this->colonia = $colonia;
            $this->municipio = $municipio;
            $this->telefono = $telefono;
            $this->tipoInstitucion = $tipoInstitucion;
        }
    }
?>