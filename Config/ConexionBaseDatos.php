<?php
    require_once('constantesDB.php');
    class ConexionBaseDatos{
        protected $con;
        public $query;

        function __construct(){
            $this->connect();
        }

        public function connect(){
            $this->con = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD);
            if(!$this->con){
                die("La conexion a la base de datos ha fallado ".mysqli_connect_error());    
            }else{
                mysqli_set_charset($this->con,'utf8');
                $baseDatos = $this->con->select_db(DB_NAME);
                if(!$baseDatos){
                    die("Hay un problema con la base de datos especificada ".mysqli_connect_error());
                }
            }
        }

        public function disconnect(){
            if(isset($this->con)){
                mysqli_close($this->con);
                unset($this->con);
            }
        }

        public function validateQuery($query){
            if(trim($query) != ""){
                $this->query = $this->con->query($query);
            }
            if(!$this->query){
                die("Error en la consulta : <pre> ".$query." </pre>");
            }
            return $this->query;
        }

        public function loopQuery($results){
            $arrays_atributtes = array();

            while ($result = $results->fetch_assoc()) {
                $attributes = array();
                foreach ($result as $argument) {
                  array_push($attributes,$argument);
                }
                array_push($arrays_atributtes,$attributes);
              }    
        
            return $arrays_atributtes;
        }

        public function deleteEspecialCharacters($string){
            return $this->con->real_escape_string($string);
        }
    }
?>