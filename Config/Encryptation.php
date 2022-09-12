<?php
    class Encrytation{
        public static $method = 'AES-256-CBC';
        public function __construct(){
        }

        public static function encrypt(string $data, string $key): string{
            $ivSize = openssl_cipher_iv_length(static::$method);
            $iv = openssl_random_pseudo_bytes($ivSize);
            $encrypted = openssl_encrypt($data, static::$method, $key, OPENSSL_RAW_DATA, $iv);
            $encrypted = strtoupper(implode(null, unpack('H*', $encrypted)));
            return $encrypted;
        }
        
        public static function decrypt(string $data, string $key): string{
            $data = pack('H*', $data);
            $ivSize = openssl_cipher_iv_length(static::$method);  
                $iv = $iv = openssl_random_pseudo_bytes($ivSize);
            $decrypted = openssl_decrypt($data, static::$method, $key, OPENSSL_RAW_DATA, $iv); 
            return trim($decrypted);
        }
    }
?>