#!/bin/bash

echo "🔧 Setting up environment variables for Sanity Studio..."

# Create .env.local file
cat > .env.local << EOF
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=2eop0ymd
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity API Token (for write operations)
# Get this from your Sanity project settings at https://sanity.io/manage
SANITY_API_TOKEN=your_sanity_api_token_here

# Studio Configuration
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3000/studio
EOF

echo "✅ Created .env.local file"
echo "📝 Please update SANITY_API_TOKEN with your actual token from https://sanity.io/manage"
echo "🚀 You can now run: npm run dev:studio"
