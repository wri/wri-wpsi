openssl req \
  -new \
  -newkey rsa:2048 \
  -sha256 \
  -days 3650 \
  -nodes \
  -x509 \
  -keyout dev.test.key \
  -out dev.test.crt \
  -config openssl.cnf
