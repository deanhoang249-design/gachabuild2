# 🚀 Quick Start Guide

## Current Error
You're seeing "No characters found in Sanity" because the data hasn't been imported yet.

## Quick Fix (3 steps)

### 1. Get Your Sanity API Token
```bash
# Open this URL in your browser:
open https://www.sanity.io/manage
```

### 2. Set Your Token
```bash
# Replace 'your_token_here' with your actual token:
echo 'SANITY_API_TOKEN=your_token_here' >> .env.local
```

### 3. Import Data
```bash
npm run import:characters
npm run import:weapons
```

## Alternative: Use the Interactive Script
```bash
node get-token-and-import.js
```

## Verify It's Working
Visit http://localhost:3001/characters

## What You'll See
- ✅ Characters page with all data
- ✅ Weapons page with all data  
- ✅ Tier list working
- ✅ Search functionality working
- ✅ All filters working

## Need Help?
- Check `IMPORT_GUIDE.md` for detailed instructions
- Visit http://localhost:3001/setup for guided setup
- Run `npx ts-node scripts/quick-import.ts` to test your setup
