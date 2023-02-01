<?php

class Dashboard{
    public String $usuarios = "";
    public String $solicitudes = "";
    public String $pendientes = "";

    public function __construct (){
        $listArgs = func_get_args()[0];
        $numArgs = count($listArgs);
        switch ($numArgs) {
            case 3:
                $this->__construct3($listArgs[0], $listArgs[1],$listArgs[2]);
                break;
            default:
                throw new Exception('Error al crear el constructor');
        }
    }

    public function __construct3($usuarios,$solicitudes,$pendientes){
        $this->usuarios = $usuarios;
        $this->solicitudes = $solicitudes;
        $this->pendientes = $pendientes;       
    }
}

?>