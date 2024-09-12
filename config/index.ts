export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  app: {
    port: process.env.PORT || 3000,
    apiPrefix: process.env.API_PREFIX || '/api',
    swaggerPath: process.env.SWAGGER_PATH || '/api/docs',
  },
  dev: {
    authCode: process.env.DEV_AUTH_CODE || '123456',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_jwt_secret',
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
