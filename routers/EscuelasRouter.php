<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/EscuelaInstitucion.php");

class EscuelaInstitucionRouter extends RestApi
{

    public function __construct(){
        parent::__construct("escuela");
    }

    public function addEscuela(){
        $nombre = $this->validateParameter('nombre', $this->param["nombre"], STRING);
        $calle = $this->validateParameter('calle', $this->param["calle"], STRING);
        $no = $this->validateParameter('no', $this->param["no"], STRING);
        $cp = $this->validateParameter('cp', $this->param["cp"], STRING);
        $colonia = $this->validateParameter('colonia', $this->param["colonia"], STRING);
        $municipio = $this->validateParameter('municipio', $this->param["municipio"], STRING);
        $telefono = $this->validateParameter('telefono', $this->param["telefono"], STRING);
        $tipoInstitucion = $this->validateParameter('tipoInstitucion', $this->param["tipoInstitucion"], STRING);

        $arguments = array($nombre, $calle, $no, $colonia, $municipio, $cp, $telefono, $tipoInstitucion);
        if ($result = $this->service->create($arguments)) {
            $this->returnResponse(SUCESS_RESPONSE, $result);
        } else {
            $this->throwError(CREATED_ERROR,"An error has been ocurred to create the object.");
        }
    }

    public function getEscuelas(){
        $usuarios = $this->service->getAll();
        $this->returnResponse(SUCESS_RESPONSE, $usuarios);
    }

    public function getEscuelasPaginate(){
        $page = $this->validateParameter('page', $this->param["page"], INTEGER);
        $perPage = $this->validateParameter('perPage', $this->param['perPage'], INTEGER);

        if (!$escuelas = $this->service->getAll()) {
            $this->throwError('GET_ERROR', "An error has been ocurren to paginate de users");
            return;
        }

        $numEscuelas = count($escuelas);
        $inicio = ($page - 1) * $perPage;
        $fin = $perPage;
        $paginatesEscuelas = array_slice($escuelas, $inicio, $fin);

        $response = new stdClass();
        $response->total = $numEscuelas;
        $response->escuelas = $paginatesEscuelas;
        $this->returnResponse(SUCESS_RESPONSE, $response);
    }

    public function updateEscuelaByKeyandValue(){
        $idEscuela = $this->validateParameter('idEscuela',$this->param["idEscuela"],INTEGER);
        $key = $this->validateParameter('key',$this->param["key"],STRING);
        $value = $this->validateParameter('value',$this->param["value"],STRING);

        if ($updated = $this->service->updateByValue($key,$value,"idEscuela",$idEscuela)) {
            $this->returnResponse(SUCESS_UPDATED, "Se ha actualizado correctamente");
        } else {
            $this->throwError(CREATED_ERROR,$updated);
        }
    }
}
