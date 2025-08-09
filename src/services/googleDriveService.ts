interface GoogleDriveConfig {
  apiKey: string;
  clientId: string;
  folderId: string;
}

interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
}

class GoogleDriveService {
  private config: GoogleDriveConfig;
  private isInitialized = false;
  private isSignedIn = false;
  private _hasValidConfigInitialized = false;

  constructor() {
    this.config = {
      apiKey: import.meta.env.VITE_GOOGLE_DRIVE_API_KEY || '',
      clientId: import.meta.env.VITE_GOOGLE_DRIVE_CLIENT_ID || '',
      folderId: '18SXF-mHW0xR8is6M1CDen3NtAMmumSwZ' // Your shared folder ID
    };
    
    // Check if we have valid configuration
    this._hasValidConfigInitialized = !!(this.config.apiKey && this.config.clientId);
    
    if (!this._hasValidConfigInitialized) {
      console.warn('Google Drive API credentials not found in environment variables');
    }
  }

  hasValidConfig(): boolean {
    return this._hasValidConfigInitialized;
  }

  async initialize(): Promise<boolean> {
    // Skip initialization if we don't have valid config
    if (!this._hasValidConfigInitialized) {
      console.warn('Google Drive API credentials not configured. Skipping initialization.');
      return false;
    }
    
    try {
      // Load Google API
      await this.loadGoogleAPI();
      
      // Initialize Google API client
      await new Promise<void>((resolve, reject) => {
        window.gapi.load('client:auth2', async () => {
          try {
            await window.gapi.client.init({
              apiKey: this.config.apiKey,
              clientId: this.config.clientId,
              discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
              scope: 'https://www.googleapis.com/auth/drive.file'
            });
            
            // Initialize Auth2 library
            await window.gapi.auth2.init({
              client_id: this.config.clientId,
              scope: 'https://www.googleapis.com/auth/drive.file'
            });
            
            this.isInitialized = true;
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      });

      return true;
    } catch (error) {
      console.error('Failed to initialize Google Drive API:', error);
      return false;
    }
  }

  private loadGoogleAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google API'));
      document.head.appendChild(script);
    });
  }

  async signIn(): Promise<boolean> {
    if (!this._hasValidConfigInitialized) {
      console.error('Google Drive API credentials not configured. Please add VITE_GOOGLE_DRIVE_API_KEY and VITE_GOOGLE_DRIVE_CLIENT_ID to your .env file');
      return false;
    }
    
    if (!this.isInitialized) {
      const initialized = await this.initialize();
      if (!initialized) {
        console.error('Failed to initialize Google Drive API before sign-in');
        return false;
      }
    }

    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (!authInstance) {
        console.error('Google Auth2 instance not available');
        return false;
      }
      await authInstance.signIn();
      this.isSignedIn = true;
      console.log('Google Drive sign-in successful');
      return true;
    } catch (error) {
      console.error('Sign-in failed:', error);
      return false;
    }
  }

  async signOut(): Promise<void> {
    if (this.isInitialized) {
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
      this.isSignedIn = false;
    }
  }

  isAuthenticated(): boolean {
    return this._hasValidConfigInitialized && this.isSignedIn;
  }

  async listFiles(): Promise<GoogleDriveFile[]> {
    if (!this.isSignedIn) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await window.gapi.client.drive.files.list({
        q: `'${this.config.folderId}' in parents and trashed=false`,
        fields: 'files(id,name,mimeType,modifiedTime)',
        orderBy: 'modifiedTime desc'
      });

      return response.result.files || [];
    } catch (error) {
      console.error('Failed to list files:', error);
      throw error;
    }
  }

  async readFile(fileId: string): Promise<any> {
    if (!this.isSignedIn) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await window.gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media'
      });

      return JSON.parse(response.body);
    } catch (error) {
      console.error('Failed to read file:', error);
      throw error;
    }
  }

  async writeFile(fileName: string, data: any): Promise<string> {
    if (!this.isSignedIn) {
      throw new Error('Not authenticated');
    }

    try {
      // Check if file already exists
      const files = await this.listFiles();
      const existingFile = files.find(file => file.name === fileName);

      const fileContent = JSON.stringify(data, null, 2);
      const boundary = '-------314159265358979323846';
      const delimiter = "\r\n--" + boundary + "\r\n";
      const close_delim = "\r\n--" + boundary + "--";

      let metadata: any = {
        'name': fileName,
        'mimeType': 'application/json'
      };

      if (!existingFile) {
        metadata.parents = [this.config.folderId];
      }

      const multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        fileContent +
        close_delim;

      const request = window.gapi.client.request({
        'path': existingFile 
          ? `https://www.googleapis.com/upload/drive/v3/files/${existingFile.id}`
          : 'https://www.googleapis.com/upload/drive/v3/files',
        'method': existingFile ? 'PATCH' : 'POST',
        'params': {'uploadType': 'multipart'},
        'headers': {
          'Content-Type': 'multipart/related; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody
      });

      const response = await request;
      return response.result.id;
    } catch (error) {
      console.error('Failed to write file:', error);
      throw error;
    }
  }

  async loadSchoolData(): Promise<any> {
    try {
      const files = await this.listFiles();
      const dataFile = files.find(file => file.name === 'school-data.json');
      
      if (dataFile) {
        return await this.readFile(dataFile.id);
      }
      
      return null;
    } catch (error) {
      console.error('Failed to load school data:', error);
      return null;
    }
  }

  async saveSchoolData(data: any): Promise<boolean> {
    try {
      await this.writeFile('school-data.json', data);
      return true;
    } catch (error) {
      console.error('Failed to save school data:', error);
      return false;
    }
  }
}

// Global type declarations
declare global {
  interface Window {
    gapi: any;
  }
}

export default new GoogleDriveService();