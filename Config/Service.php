<?php
    require_once("RepositoryCrud.php");
    require_once("Consulta.php");
   /**Esta clase genera un crud general, donde se crea un conexion a la clase consulta */
    class Service implements RepositoryCrud{
        public $typeService;
        public $consulta;
        

        function __construct($className){
            $this->typeService = $className;
            $this->consulta = new Consulta();
        }

        public function create($arguments){
            $typeClass = ucfirst($this->typeService);
            $object = new $typeClass($arguments);
            return $this->consulta->insertByTable($this->typeService,$object);
        }

        public function getAll(){
            $all = array();
            $typeClass = ucfirst($this->typeService);
            $arrayArgumentsArray = $this->consulta->findAllByTable($this->typeService);
            foreach($arrayArgumentsArray as $argumets){
                $object = new $typeClass($argumets);
                array_push($all,$object);
            }
            return $all;
        }

        public function update($arguments,$id){
            $typeClass = ucfirst($this->typeService);
            $object = new $typeClass($arguments);
            return $this->consulta->updateByTable($this->typeService,$object,$id);  
        }

        public function delete($field,$id){
            try{
                return $this->consulta->deleteByTable($this->typeService,$field,$id);
            }catch(Exception $e){
                echo $e;
            }
        }

        public function getByField($field,$value){
            /**Regresa una array de un elemento con un arreglo de los datos */
            $typeClass = ucfirst($this->typeService);
            try{
                $arguments = $this->consulta->findByFieldTable($this->typeService,$field,$value);
                return new $typeClass($arguments[0]);
            }catch(Exception $e){
                echo $e;
            }          
        }


    }
?>