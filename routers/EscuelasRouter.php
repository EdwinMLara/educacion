<?php
    require_once("../Config/RestApi.php");
    require_once("../Config/Service.php");
    require_once("../Modelos/EscuelaInstitucion.php");

    class EscuelaInstitucionRouter extends RestApi{

        public function __construct(){
            parent::__construct("escuelainstitucion");
        }

        public function addEscuela(){
            $nombre = $this->validateParameter('nombre',$this->param["nombre"],STRING);
            $calle = $this->validateParameter('calle',$this->param["calle"],STRING);
            $no = $this->validateParameter('no',$this->param["no"],INTEGER);
            $colonia = $this->validateParameter('colonia',$this->param["colonia"],STRING);
            $municipio = $this->validateParameter('municipio',$this->param["municipio"],STRING);
            $telefono = $this->validateParameter('telefono',$this->param["telefono"],INTEGER);
            $tipoInstitucion = $this->validateParameter('tipoInstitucion',$this->param["tipoInstitucion"],STRING);
            
            $arguments = array($nombre,$calle,$no,$colonia,$municipio,$telefono,$tipoInstitucion);
            if($this->service->create($arguments)){
                $this->returnResponse(SUCESS_RESPONSE,"An school has been created.");
            }else{
                $this->throwError('CREATED_ERROR',"An error has been ocurred to create the object.");
            }
        }

        public function getEscuelas(){
            $usuarios = $this->service->getAll();
            $this->returnResponse(SUCESS_RESPONSE,$usuarios);
        }
    }
?>