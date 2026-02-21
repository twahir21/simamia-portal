curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "shopName": "Your Shop Name",
    "phoneNumber": "+255675986789",
    "email": "shop@example.com",
    "password": "yourPassword123"
  }'