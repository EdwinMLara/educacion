<?php
    class Usuarios{
        public String $idUsuarios = "autoincrement";
        public String $username;
        public String $password;
        public String $tipoCuenta;

        public function __construct(){
            $listArgs = func_get_args()[0];
            $numArgs = count($listArgs);

            switch($numArgs){
                case 0:
                    $this->__construct1();
                    break;
                case 3:
                    $this->__construct3($listArgs[0],$listArgs[1],$listArgs[2]);
                    break;
                case 4:
                    $this->__construct4($listArgs[0],$listArgs[1],$listArgs[2],$listArgs[3]);
                    break;
                default:
                    echo $numArgs." No hay constructor de este tipo";
            } 
        }

        public function __construct1(){}
        
        public function __construct3($username,$password,$tipoCuenta){
            $this->username = $username;
            $this->password = $password;
            $this->tipoCuenta = $tipoCuenta;
        }

        public function __construct4($idUsuarios,$username,$password,$tipoCuenta){
            $this->idUsuarios = $idUsuarios;
            $this->username = $username;
            $this->password = $password;
            $this->tipoCuenta = $tipoCuenta;
        }

    }
?>