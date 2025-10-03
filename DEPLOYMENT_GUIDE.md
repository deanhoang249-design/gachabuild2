# 🚀 GachaBuild Deployment Guide

This guide will help you deploy your GachaBuild website with Sanity CMS integration.

## 📋 Prerequisites

- Node.js 18+ installed
- A Sanity account (free at [sanity.io](https://sanity.io))
- A deployment platform account (Vercel, Netlify, etc.)

## 🎯 Overview

The deployment process involves:
1. Setting up Sanity CMS
2. Importing your data
3. Configuring environment variables
4. Deploying the static site

## 🚀 Step-by-Step Deployment

### 1. Set Up Sanity CMS

#### Create Sanity Project
1. Go to [sanity.io](https://sanity.io) and sign in
2. Click "Create new project"
3. Choose a project name (e.g., "GachaBuild CMS")
4. Select a dataset name (e.g., "production")
5. Note down your **Project ID** and **Dataset name**

#### Generate API Token
1. In your Sanity project dashboard, go to "API" tab
2. Click "Add API token"
3. Name it "Import Script Token"
4. Select "Editor" permissions (or "Admin" for full access)
5. Copy the generated token

### 2. Configure Environment Variables

Update your `.env.local` file with your actual Sanity credentials:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_PROJECT_ID=your_actual_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_actual_sanity_token

# Optional: Custom API version
SANITY_API_VERSION=2024-01-01
```

### 3. Import Data to Sanity

Run the import scripts to upload your data:

```bash
# Import characters
npm run import:characters

# Import weapons
npm run import:weapons
```

### 4. Verify Data Import

1. Run the Sanity Studio locally:
   ```bash
   npm run studio
   ```
2. Open http://localhost:3333 in your browser
3. Verify that your characters and weapons appear in the content

### 5. Deploy to Vercel (Recommended)

#### Option A: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy your project:
   ```bash
   vercel
   ```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variables:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - `NEXT_PUBLIC_SANITY_DATASET`
     - `SANITY_PROJECT_ID`
     - `SANITY_DATASET`
     - `SANITY_API_TOKEN`

#### Option B: Deploy via GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on every push

### 6. Deploy to Netlify (Alternative)

#### Option A: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm i -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Build your project:
   ```bash
   npm run build
   ```

4. Deploy:
   ```bash
   netlify deploy --prod --dir=out
   ```

5. Set environment variables in Netlify dashboard

#### Option B: Deploy via GitHub Integration

1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `out`
5. Set environment variables in Netlify dashboard

### 7. Deploy to Other Platforms

#### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

#### AWS S3 + CloudFront
1. Build your project: `npm run build`
2. Upload `out` directory to S3 bucket
3. Configure CloudFront distribution
4. Set up environment variables in your build process

## 🔧 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | `abc123def` |
| `NEXT_PUBLIC_SANITY_DATASET` | Your Sanity dataset name | `production` |
| `SANITY_PROJECT_ID` | Same as above (for scripts) | `abc123def` |
| `SANITY_DATASET` | Same as above (for scripts) | `production` |
| `SANITY_API_TOKEN` | Your Sanity API token | `sk...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SANITY_API_VERSION` | Sanity API version | `2024-01-01` |

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails with Sanity Errors**
   - Ensure all environment variables are set correctly
   - Check that your Sanity project is active
   - Verify API token has read permissions

2. **Data Not Loading**
   - Check browser console for errors
   - Verify Sanity project ID and dataset
   - Ensure data was imported successfully

3. **Studio Not Loading**
   - Check that all Sanity packages are installed
   - Verify environment variables are set
   - Try running `npm run studio` locally first

4. **Import Scripts Fail**
   - Check that API token has write permissions
   - Verify project ID and dataset are correct
   - Ensure import files exist in `import/` directory

### Getting Help

- Check the console output for specific error messages
- Review Sanity documentation at [sanity.io/docs](https://sanity.io/docs)
- Check the detailed script documentation in `scripts/README.md`

## 🎉 Post-Deployment

After successful deployment:

1. **Test Your Site**
   - Visit your deployed URL
   - Check that characters and weapons load correctly
   - Test filtering and search functionality

2. **Set Up Webhooks** (Optional)
   - Configure Sanity webhooks to trigger rebuilds
   - Set up automatic deployments on content changes

3. **Monitor Performance**
   - Use Vercel/Netlify analytics
   - Monitor Sanity API usage
   - Optimize images and content as needed

4. **Content Management**
   - Train your team on using Sanity Studio
   - Set up content workflows
   - Plan regular content updates

## 📚 Additional Resources

- [Sanity Documentation](https://sanity.io/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

## 🔄 Maintenance

### Regular Tasks

1. **Update Dependencies**
   ```bash
   npm update
   ```

2. **Backup Sanity Data**
   - Export data from Sanity Studio
   - Keep local backups of important content

3. **Monitor Performance**
   - Check site speed and performance
   - Optimize images and content
   - Update Sanity queries as needed

### Content Updates

1. **Add New Characters/Weapons**
   - Use Sanity Studio to add new content
   - Test locally before deploying
   - Update any hardcoded references

2. **Update Existing Content**
   - Edit content in Sanity Studio
   - Changes will be reflected immediately
   - No code changes needed for content updates

---

🎉 **Congratulations!** Your GachaBuild website is now deployed with Sanity CMS integration!
