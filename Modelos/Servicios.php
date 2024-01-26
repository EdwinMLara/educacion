<?php
    class Servicios{
        public String $idServicios = "autoincrement";
        public String $idAlumno = "";
        public String $callesPavimentadas = "";
        public String $drenaje = "";
        public String $biblioteca = "";
        public String $recoleccionBasura = "";
        public String $alumbradoPublico = "";
        public String $telefonoPublico = "";
        public String $transportePublico = "";
        public String $aguaPotable = "";
        public String $juegosOCanchas = "";
        public String $file = "";

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 11:
                    $this->__construct11($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9],$listArgs[10]);
                    break;
                case 12:
                    $this->__construct12($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9],$listArgs[10],$listArgs[11]);
                    break;
                default:
                    throw new Exception('Error al crear el constructor servicios');
            }
        }

        public function __construct11($idAlumno,$callesPavimentadas,$drenaje,$biblioteca,$recoleccionBasura,$alumbradoPublico,$telefonoPublico,$transportePublico,$aguaPotable,$juegosOCanchas,$file){
            $this->idAlumno = $idAlumno;
            $this->callesPavimentadas = $callesPavimentadas;
            $this->drenaje = $drenaje;
            $this->biblioteca = $biblioteca;
            $this->recoleccionBasura = $recoleccionBasura;
            $this->alumbradoPublico = $alumbradoPublico;
            $this->telefonoPublico = $telefonoPublico;
            $this->transportePublico = $transportePublico;
            $this->aguaPotable = $aguaPotable;
            $this->juegosOCanchas = $juegosOCanchas;
            $this->file = $file;
        }

        public function __construct12($idServicios,$idAlumno,$callesPavimentadas,$drenaje,$biblioteca,$recoleccionBasura,$alumbradoPublico,$telefonoPublico,$transportePublico,$aguaPotable,$juegosOCanchas,$file){
            $this->idServicios = $idServicios;
            $this->idAlumno = $idAlumno;
            $this->callesPavimentadas = $callesPavimentadas;
            $this->drenaje = $drenaje;
            $this->biblioteca = $biblioteca;
            $this->recoleccionBasura = $recoleccionBasura;
            $this->alumbradoPublico = $alumbradoPublico;
            $this->telefonoPublico = $telefonoPublico;
            $this->transportePublico = $transportePublico;
            $this->aguaPotable = $aguaPotable;
            $this->juegosOCanchas = $juegosOCanchas;
            $this->file = $file;  
        }
    }
?>