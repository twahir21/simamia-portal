# intial load
1. create account
2. verify email + return token.

# on payment.
3. compare the transaction id, update status.

4. return token (maybe update token) update lastONline 

# on verify
5. compare uid with one stored / firebase account to avoid replay attacks (borrow token from friend)
6. check phone time tempering with last online and expiry date
7. check if status is valid

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

# Real comparison
1. compared token uid with one from secure storage
2. check if timeclock tempering e.g. lastonline should be small but not large than expiryDate
3. check if token status is labelled Active