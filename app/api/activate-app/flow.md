1. App starts

2. Load cached activation

3. Verify signature locally

4. Check:
   - expiresAt
   - gracePeriodEnd

5. If package expired:
   ❌ Block app

6. Else if now < gracePeriodEnd:
   ✅ Allow offline operations

7. If internet available:
   → call verify endpoint
   → refresh gracePeriodEnd

8. If offline AND grace expired:
   ⚠️ Block only Add new sales