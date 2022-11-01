<?php
require_once("JWT.php");
require_once("Rest.php");
require_once("../Config/Encryptation.php");

class RestApi extends Rest
{
    public $service;
    protected $key;

    /**El constructor recibe como parámetro el nombre la tabla de la cual se va a crear 
     * el servicio, el cual proveerá los métodos crear, leer, actualizar, eliminar y buscar
     * por tipo de columna
     */
    public function __construct($typeService, $key)
    {
        parent::__construct();
        $this->service = new Service($typeService);
        $this->key = $key;
    }

    /**El metodo generar token se utliza para generar un token valido
     * el cual permitira realizar transacciones con la base de datos durante cierto periodo
     * en este caso se utilizan 20 min
     */

    public function generateToken()
    {
        $username = $this->validateParameter('username', $this->param["username"], STRING);
        $password = $this->validateParameter('password', $this->param["password"], STRING);

        /**Se obtiene el usuario que coincida con el nombre de usuario, 
         * el primer parametro es el nombre del campo en la tabla el cual debe ser exactamente igual al de la tabla
         * el segundo argumento es el nombre a buscar dentro de la tabla 
         */
        $usuario = $this->service->getByField("username", $username);
        if ($usuario == null) {
            $this->throwError(UNAUTHORIZED, "El usuario es incorrecto");
            return;
        }


        $decrypted = Encrytation::decrypt($usuario->password, $this->key);

        if (strcmp($password, $decrypted) !== 0) {
            $this->throwError(UNAUTHORIZED, "La contraseña es incorrecta");
            return;
        }

        try {
            $payload = [
                'iat' => time(),
                'iss' => 'localhost',
                'exp' => time() + (100 * 60), //son segundo para que no se olvide
                'userId' => $usuario->idUsuarios
            ];

            $token = JWT::encode($payload, SECRET_KEY);
            $data = ['token' => $token];
            $this->returnResponse(SUCESS_RESPONSE, $data);
        } catch (Exception $e) {
            $this->throwError(JWT_PROCESSING_ERROR, $e->getMessage());
        }
    }
}
