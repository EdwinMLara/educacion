<?php
class Encrytation
{
    public static $method = 'AES-128-CTR';

    public function __construct()
    {
    }

    public static function encrypt(string $data, string $key): string
    {
        $ivSize = openssl_cipher_iv_length(static::$method);
        $iv = openssl_random_pseudo_bytes($ivSize);
        $encrypted = openssl_encrypt($data, static::$method, $key, 0, '1234567891011121');
        return $encrypted;
    }

    public static function decrypt(string $data, string $key): string
    {
        $ivSize = openssl_cipher_iv_length(static::$method);
        $iv = $iv = openssl_random_pseudo_bytes($ivSize);
        $decrypted = openssl_decrypt($data, static::$method, $key, 0, '1234567891011121');    
        return $decrypted;
    }
}
