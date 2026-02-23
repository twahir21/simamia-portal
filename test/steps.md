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

# generate private and public keys
```bash
openssl genpkey -algorithm Ed25519 -out private.pem
openssl pkey -in private.pem -pubout -out public.pem
```