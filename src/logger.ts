import { pino } from 'pino';
import { config } from './config';

export const logger = pino({
  level: config.app.logLevel,
  messageKey: 'message',
  transport: config.nodeEnv !== 'production' ? { target: 'pino-pretty' } : undefined,
});
