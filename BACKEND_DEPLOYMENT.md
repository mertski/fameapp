# Backend Deployment Instructions

## Deploy to Render.com (Free)

1. Go to [Render.com](https://render.com) and sign up/login
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `fameapp-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Click "Create Web Service"

The backend will be deployed to: `https://fameapp-backend.onrender.com`

## Files needed for deployment:
- `server.js` - Main server file
- `backend-package.json` - Dependencies (rename to package.json for deployment)
- `render.yaml` - Render configuration

## After deployment:
The frontend is already configured to use the deployed backend URL.
Your app will work for all users worldwide! 