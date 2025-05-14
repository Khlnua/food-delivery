declare namespace NodeJS {
  interface ProcesseEnv {
    MONGODB_CONNECTION_STRING: string;
    EMAIL_PASS: string;
    EMAIL_USER: string;
    FRONTEND_ENDPOINT: string;
  }
}
