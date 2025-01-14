import 'dotenv/config';

export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  app: {
    port: process.env.PORT || 3000,
    logLevel: process.env.LOG_LEVEL || 'info',
    apiPrefix: process.env.API_PREFIX || '/api',
    swaggerPath: process.env.SWAGGER_PATH || '/api/docs',
  },
  dev: {
    authCode: process.env.DEV_AUTH_CODE || '123456',
  },
  jwt: {
    access: {
      secret: process.env.JWT_SECRET || 'default_jwt_access_token_secret',
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '1h',
    },
    refresh: {
      secret: process.env.JWT_SECRET || 'default_jwt_refresh_token_secret',
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '1h',
    },
  },
  mail: {
    client: process.env.SMTP_CLIENT || 'gmail',
    server: process.env.SMTP_SERVER || 'smtp.gmail.com',
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
  },
  database: {
    url: process.env.DATABASE_URL || '',
  },
};
