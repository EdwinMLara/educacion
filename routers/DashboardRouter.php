<?php
require_once("../Config/RestApi.php");
require_once("../Config/Service.php");
require_once("../Modelos/Dashboard.php");

class DashboardRouter extends RestApi{
    public function __construct(){
        parent::__construct("dashboard");
    }

    public function getDataDashboard(){
        $query = "SELECT ( SELECT COUNT(usuarios.idUsuarios) FROM usuarios) as usuarios, 
                  (SELECT COUNT(solicitudes.idSolicitud) FROM solicitudes) as solicitudes,
                  (SELECT count(solicitudes.idSolicitud) FROM solicitudes WHERE solicitudes.status = 'pendiente') as pendientes";

        $response = $this->service->getByQueryTable($query);
        if($response){
            $this->returnResponse(SUCESS_RESPONSE, $response);
        }else if(empty($response)){
            $this->returnResponse(SUCESS_EMPTY, "no hay registros aun");
        }else{
            $this->throwError('GET_ERROR', "An error has been ocurren to paginate de users"); 
        }
    }
}

?>