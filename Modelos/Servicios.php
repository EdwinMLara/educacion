<?php
    class Servicios{
        public String $idServicios = "autoincrement";
        public String $callesPavimentadas = "";
        public String $drenaje = "";
        public String $biblioteca = "";
        public String $recolecionBasura = "";
        public String $alumbradoPublico = "";
        public String $telefonoPublico = "";
        public String $transportePublico = "";
        public String $aguaPotable = "";
        public String $juegoOCanchas = "";

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
                    echo $numArgs." No hay constructor de este tipo";
            }
        }

        public function __construct9($callesPavimentadas,$drenaje,$biblioteca,$recolecionBasura,$alumbradoPublico,$telefonoPublico,$transportePublico,$aguaPotable,$juegoOCanchas){
            $this->callesPavimentadas = $callesPavimentadas;
            $this->drenaje = $drenaje;
            $this->biblioteca = $biblioteca;
            $this->recolecionBasura = $recolecionBasura;
            $this->alumbradoPublico = $alumbradoPublico;
            $this->telefonoPublico = $telefonoPublico;
            $this->transportePublico = $transportePublico;
            $this->aguaPotable = $aguaPotable;
            $this->juegoOCanchas = $juegoOCanchas;
        }

        public function __construct10($idServicios,$callesPavimentadas,$drenaje,$biblioteca,$recolecionBasura,$alumbradoPublico,$telefonoPublico,$transportePublico,$aguaPotable,$juegoOCanchas){
            $this->idServicios = $idServicios;
            $this->callesPavimentadas = $callesPavimentadas;
            $this->drenaje = $drenaje;
            $this->biblioteca = $biblioteca;
            $this->recolecionBasura = $recolecionBasura;
            $this->alumbradoPublico = $alumbradoPublico;
            $this->telefonoPublico = $telefonoPublico;
            $this->transportePublico = $transportePublico;
            $this->aguaPotable = $aguaPotable;
            $this->juegoOCanchas = $juegoOCanchas;  
        }
    }
?>