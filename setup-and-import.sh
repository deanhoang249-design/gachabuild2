#!/bin/bash

echo "🚀 GachaBuild Setup and Import Script"
echo "====================================="
echo ""

# Check if SANITY_API_TOKEN is set
if grep -q "SANITY_API_TOKEN=" .env.local && ! grep -q "SANITY_API_TOKEN=$" .env.local; then
    echo "✅ SANITY_API_TOKEN is already set"
    TOKEN_SET=true
else
    echo "❌ SANITY_API_TOKEN is not set"
    TOKEN_SET=false
fi

if [ "$TOKEN_SET" = false ]; then
    echo ""
    echo "📋 Please get your Sanity API token:"
    echo "1. Go to https://www.sanity.io/manage"
    echo "2. Select your project (ID: 2eop0ymd)"
    echo "3. Go to 'API' section"
    echo "4. Click 'Add API token'"
    echo "5. Name: 'GachaBuild Import'"
    echo "6. Role: 'Editor'"
    echo "7. Copy the token"
    echo ""
    read -p "Enter your Sanity API token: " token
    
    if [ -n "$token" ]; then
        echo "SANITY_API_TOKEN=$token" >> .env.local
        echo "✅ Token saved to .env.local"
    else
        echo "❌ No token provided. Exiting."
        exit 1
    fi
fi

echo ""
echo "🔍 Testing Sanity connection..."
npx ts-node scripts/quick-import.ts

echo ""
echo "📦 Importing data..."
echo "Importing characters..."
npm run import:characters

echo ""
echo "Importing weapons..."
npm run import:weapons

echo ""
echo "🎉 Setup complete!"
echo "Visit http://localhost:3001/characters to see your data"
