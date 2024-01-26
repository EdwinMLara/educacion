<?php
    class Padre{
        public String $idPadre = "autoincrement";


        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 15:
                    $this->__construct15($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9],$listArgs[10],$listArgs[11],$listArgs[12],$listArgs[13],$listArgs[14]);
                    break;
                case 16:
                    $this->__construct16($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3],$listArgs[4],$listArgs[5],$listArgs[6],$listArgs[7],$listArgs[8],$listArgs[9],$listArgs[10],$listArgs[11],$listArgs[12],$listArgs[13],$listArgs[14],$listArgs[15]);
                    break;
                default:
                    throw new Exception('Error al crear el constructor Padre');
            }
        }

        public function __construct15($idAlumno,$curp,$nombre,$telefono,$fechaNacimiento,$calle,$no,$colonia,$cp,$municipio,$gradoEstudios,$trabajo6Meses,$motivoNoTrabajo,$seguroMedico,$file){
            $this->idAlumno = $idAlumno;
            $this->curp = $curp;
            $this->nombre = $nombre;
            $this->telefono = $telefono;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->calle = $calle;
            $this->no = $no;
            $this->colonia = $colonia;
            $this->cp = $cp;
            $this->municipio = $municipio;
            $this->gradoEstudios = $gradoEstudios;
            $this->trabajo6Meses = $trabajo6Meses;
            $this->motivoNoTrabajo = $motivoNoTrabajo;
            $this->seguroMedico = $seguroMedico;
            $this->file = $file;
        }

        public function __construct16($idPadre,$idAlumno,$curp,$nombre,$telefono,$fechaNacimiento,$calle,$no,$colonia,$cp,$municipio,$gradoEstudios,$trabajo6Meses,$motivoNoTrabajo,$seguroMedico,$file){
            $this->idPadre = $idPadre;
            $this->idAlumno = $idAlumno;
            $this->curp = $curp;
            $this->nombre = $nombre;
            $this->telefono = $telefono;
            $this->fechaNacimiento = $fechaNacimiento;
            $this->calle = $calle;
            $this->no = $no;
            $this->colonia = $colonia;
            $this->cp = $cp;
            $this->municipio = $municipio;
            $this->gradoEstudios = $gradoEstudios;
            $this->trabajo6Meses = $trabajo6Meses;
            $this->motivoNoTrabajo = $motivoNoTrabajo;
            $this->seguroMedico = $seguroMedico;
            $this->file = $file;
        }
    }
?>