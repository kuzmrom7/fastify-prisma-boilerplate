import { pino } from 'pino';
import config from './config';

export default pino({
  level: config.app.logLevel,
  messageKey: 'message',
  transport: config.nodeEnv !== 'production' ? { target: 'pino-pretty' } : undefined,
});
