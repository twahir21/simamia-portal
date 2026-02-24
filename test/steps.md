# intial load
1. create account
2. verify email + return token.

# on payment.
3. compare the transaction id, update status.

4. return token (maybe update token) update lastONline 

```json
{
    "lastOnline": "",
    "expiryDate": "",
    "uid": "",
    "status": ""
}
```
# we must use RSA keys for jwt to work
```bash
# 1. Generate a 2048-bit Private Key
openssl genrsa -out private.pem 2048

# 2. Extract the Public Key from the Private Key
openssl rsa -in private.pem -pubout -out public.pem
```

# generate private and public keys (short and algorith is Ed25519 - modern)
```bash
openssl genpkey -algorithm Ed25519 -out private.pem
openssl pkey -in private.pem -pubout -out public.pem
```