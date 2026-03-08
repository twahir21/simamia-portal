curl -X POST http://localhost:3000/api/email/prove \
-H "Content-Type: application/json" \
-d '{
"email": "twahirsoud3@gmail.com",
"otp": "6278661"
}'