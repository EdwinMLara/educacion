<?php
    class DatosPadre{
        public String $idPadre = "autoincrement";
        public String $nombre = "";
        public String $telefono = "";
        public String $fechaNacimiento = "";
        public String $curp = "";
        public String $calle = "";
        public String $no = "";
        public String $colonia = "";
        public String $cp = "";
        public String $municipio = "";
        public String $gradoEstudios = "";
        public String $trabajo6Meses = "";
        public String $motivoNoTrabajo = "";
        public String $seguroMedico = "";

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 12:
                    $this->__construct12($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9],$listArgs[10],$listArgs[11],$listArgs[12]);
                    break;
                case 13:
                    $this->__construct13($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9],$listArgs[10],$listArgs[11],$listArgs[12],$listArgs[13]);
                    break;
                default:
                    echo $numArgs." No hay constructor de este tipo";
            }
        }

        public function __construct12($nombre,$telefono,$fechaNacimiento,$curp,$calle,$no,$colonia,$cp,$municipio,$gradoEstudios,$trabajo6Meses,$motivoNoTrabajo,$seguroMedico){
            $this->nombre = $nombre;
            $this->telefono = $telefono;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->curp = $curp;
            $this->calle = $calle;
            $this->no = $no;
            $this->colonia = $colonia;
            $this->calle = $cp;
            $this->municipio = $municipio;
            $this->gradoEstudios = $gradoEstudios;
            $this->trabajo6Meses = $trabajo6Meses;
            $this->motivoNoTrabajo = $motivoNoTrabajo;
            $this->seguroMedico = $seguroMedico;
        }

        public function __construct13($idPadre,$nombre,$telefono,$fechaNacimiento,$curp,$calle,$no,$colonia,$cp,$municipio,$gradoEstudios,$trabajo6Meses,$motivoNoTrabajo,$seguroMedico){
            $this->idPadre = $idPadre;
            $this->nombre = $nombre;
            $this->telefono = $telefono;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->curp = $curp;
            $this->calle = $calle;
            $this->no = $no;
            $this->colonia = $colonia;
            $this->calle = $cp;
            $this->municipio = $municipio;
            $this->gradoEstudios = $gradoEstudios;
            $this->trabajo6Meses = $trabajo6Meses;
            $this->motivoNoTrabajo = $motivoNoTrabajo;
            $this->seguroMedico = $seguroMedico;
        }
    }
?>