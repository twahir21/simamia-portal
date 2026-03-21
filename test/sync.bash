curl -X POST http://localhost:3000/api/sync \
  -H "Content-Type: application/json" \
    -H "X-Shop-ID: 12345" \
  -d '{"suppliers":[{"id":1,"name":"no-supplier","phone":"no-number","sync_status":0,"updatedAt":"2026-03-21 21:09:33"}]}'