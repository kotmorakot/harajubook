# Vercel Deployment Guide for Harajubook

This project uses Next.js and Convex. Follow these steps to deploy to Vercel.

## Environment Variables

You must configure the following Environment Variables in your Vercel Project Settings:

### Required
- **`CONVEX_DEPLOY_KEY`**: (Required for building) This is the deploy key for your Convex production deployment.
  - Get this from your Convex Dashboard: Settings > API Keys > Deploy Keys.
  - *Note: This is critical because the build command `npx convex deploy` needs it to push your schema/functions.*

- **`NEXT_PUBLIC_CONVEX_URL`**: The URL of your public Convex deployment.
  - Example: `https://your-project.convex.cloud`
  - Get this from your Convex Dashboard.

- **`ADMIN_PASSWORD`**: (Required for Admin UI) The password used to access the `/admin` page.
  - Set this to a strong, secure password.

### Optional / Automatic
- **`CONVEX_DEPLOYMENT`**: (Optional) In some setups, this might be used, but `CONVEX_DEPLOY_KEY` is the primary one for the build script.

## Build Settings

The `package.json` has been configured to deploy Convex automatically:

- **Build Command**: `npm run build` (which runs `npx convex deploy --cmd 'npm run build'`)
- **Output Directory**: `.next` (Standard Next.js)
- **Install Command**: `npm install` (Standard)

## Security Notes
- Ensure your `CONVEX_DEPLOY_KEY` is kept secret (Env Var type: Encrypted).
- The `ADMIN_PASSWORD` protects your content management interface.
