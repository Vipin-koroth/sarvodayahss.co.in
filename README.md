sarvodayahss.co.in

## Google Drive Integration Setup

This application integrates with Google Drive for data storage. To set up:

### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select project: sarvodaya-web-468416
3. Enable the Google Drive API
4. Create credentials:
   - API Key (for Drive API access)
   - OAuth 2.0 Client ID (for user authentication)

### 2. Environment Variables
Create a `.env` file in the root directory:
```
VITE_GOOGLE_DRIVE_API_KEY=your_api_key_here
VITE_GOOGLE_DRIVE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
```

### 3. OAuth Configuration
In Google Cloud Console, configure OAuth 2.0:
- Add your domain to "Authorized JavaScript origins"
- Add redirect URIs if needed

### 4. Folder Permissions
The shared Google Drive folder must be accessible to users who will authenticate.

### 5. Usage
1. Go to `/admin` in your application
2. Click "Connect Google Drive"
3. Authenticate with Google
4. Data will automatically sync with the shared folder

## Features
- Real-time sync with Google Drive
- Automatic backup to localStorage
- Manual sync controls
- Multi-user collaboration support
