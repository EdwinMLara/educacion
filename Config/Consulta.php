<?php
require_once("ConexionBaseDatos.php");
class Consulta extends ConexionBaseDatos{
    function __construct(){
        parent::__construct();
    }

    public function tableExists($table){
        $table_exists = $this->con->query('SHOW TABLES FROM '.DB_NAME.' LIKE "'.$this->deleteEspecialCharacters($table).'"');
        if($table_exists){
            if($table_exists->num_rows > 0){
                return true;
            }else{
                throw new Exception("the data table not exists");
            }
        }
    }

    public function propertyTableExists($table,$column){
        if($this->tableExists($table)){
            $query = "SHOW COLUMNS FROM ".$this->deleteEspecialCharacters($table)." like '".$this->deleteEspecialCharacters($column)."'";
            $property_table_exists = $this->con->query($query);            
            if($property_table_exists->num_rows > 0)
                return true;
            else
                throw new Exception("The property or column in the ".$table." not exists");
        }else{
            return false;
        }
    }

    public function findByQuery($query){
        $results = $this->con->query($query);
        return $this->loopQuery($results);
    }

    public function insertByTable($table,$obj){
        if($this->tableExists($table)){
            $query = "INSERT INTO ".$this->deleteEspecialCharacters($table);
            $query_properties = " (";
            $query_values = "(";
            foreach($obj as $property => $value){
                if(strcmp($value,'autoincrement') == 0) continue;
                $query_properties .=$property.",";
                $query_values .= "'".$value."',";
            }
            $query_properties = substr($query_properties, 0, -1);
            $query_values = substr($query_values, 0, -1);
            $query = $query.$query_properties.") VALUES ".$query_values.")";
            $this->con->query($query);
            $inserted = $this->con->insert_id;
            return ($this->con->affected_rows === 1) ? $inserted : false;
        }
    }

    public function findAllByTable($table){
        if($this->tableExists($table)){
            $query =  "SELECT * FROM ".$this->deleteEspecialCharacters($table);
            return $this->findByquery($query);
        }
    }

    public function updateByTable($table,$obj,$id){
        if($this->tableExists($table)){
            $query = "UPDATE ".$this->deleteEspecialCharacters($table)." SET ";
            $where = "WHERE ";
            $conn = 0;
            foreach($obj as $property => $value){
                if($conn == 0){
                    $where .= $property." = ".$id;
                    $conn++;
                }
                $query .= $property." = '".$value."' ,";
            }
            $query = substr($query, 0, -1);
            $query = $query.$where;
            $this->con->query($query);
            return ($this->con->affected_rows === 1) ? true : false;
        }
    }

    public function updatePropertyFromTableByValue($table,$property,$value,$propertyIdName,$id){
        if($this->tableExists($table)){
            $query = "UPDATE ".$this->deleteEspecialCharacters($table)." SET ";
            $where = " WHERE ";
            $query .= $property. " = '" . $value."' ". $where . $propertyIdName." = ".$id;
            $this->con->query($query);
            return ($this->con->affected_rows === 1) ? true : false;
        }
    }


    public function deleteByTable($table,$field,$id){
        if($this->tableExists($table)){
            if($this->propertyTableExists($table,$field)){
                $query = "DELETE FROM ".$this->deleteEspecialCharacters($table);
                $query .= " WHERE ".$this->deleteEspecialCharacters($field)."= ".$this->deleteEspecialCharacters($id);
                $query .= " LIMIT 1";
                $this->con->query($query);
                
                return ($this->con->affected_rows === 1) ? true : false;
            }else{
                return null;
            }
        }
    }

    public function findByFieldTable($table,$field,$value){
        if($this->tableExists($table)){
            if($this->propertyTableExists($table,$field)){
                $query = "SELECT * FROM ".$this->deleteEspecialCharacters($table);
                $query .= " WHERE ".$this->deleteEspecialCharacters($field)." = '".$this->deleteEspecialCharacters($value)."'";
            
                $results = $this->con->query($query);
                if($results->num_rows == null)
                    return null;
                return $this->loopQuery($results);
            }else{
                return null;
            }
        }
    }
}
?>