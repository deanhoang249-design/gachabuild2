#!/bin/bash

echo "🔑 Sanity API Token Setup Guide"
echo "================================"
echo ""
echo "To get your Sanity API token:"
echo "1. Go to https://www.sanity.io/manage"
echo "2. Select your project (ID: 2eop0ymd)"
echo "3. Go to 'API' section"
echo "4. Click 'Add API token'"
echo "5. Name it 'GachaBuild Import'"
echo "6. Set role to 'Editor'"
echo "7. Copy the token"
echo ""
echo "Once you have the token, run:"
echo "echo 'SANITY_API_TOKEN=your_token_here' >> .env.local"
echo ""
echo "Then run the import commands:"
echo "npm run import:characters"
echo "npm run import:weapons"
echo ""
echo "Current .env.local status:"
if grep -q "SANITY_API_TOKEN" .env.local; then
    echo "✅ SANITY_API_TOKEN is set"
else
    echo "❌ SANITY_API_TOKEN is missing"
fi
