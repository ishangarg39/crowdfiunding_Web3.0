// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly CLIENT_ID: string;
    // Add other environment variables here as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  