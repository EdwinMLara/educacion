<?php
    define('SECRET_KEY','insoeley');
    define('BOOLEAN','1');
    define('INTEGER','2');
    define('STRING', '3');
    
    define('REQUEST_METHOD_NOT_VALID',                   100);
    define('REQUEST_CONTENTTYPE_NOT_VALID',              101);
    define('REQUEST_NOT_VALID',                          102);
    define('VALIDATE_PARAMETER_REQUIRED',                103);
    define('VALIDATE_PARAMETER_DATATYPE',                104);
    define('API_NAME_REQUIRED',                          105);
    define('API_PARAM_REQUIRED',                         106);
    define('API_DOST_NOT_EXIST',                         107);
    define('INVALID_USER_PASS',                          108);
    define('USER_NOT_ACTIVE',                            109);

    define('SUCESS_RESPONSE',                            200);
    define('SUCESS_UPDATED',                             201);
    define('SUCESS_EMPTY',                               204);

    define('ATHORIZATION_HEADER_NOT_FOUND',              300);
    define('ACCESS_TOKEN_ERROS',                         301);
    define('JWT_PROCESSING_ERROR',                       302);

    define('UNAUTHORIZED',                               401);

    define('CREATED_ERROR',                             1000);
    define('UPDATED_ERROR',                             1001);
?>