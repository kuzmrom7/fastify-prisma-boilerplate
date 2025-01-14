import app from './server';
import { config } from './config';

async function start() {
  await app.ready();

  try {
    await app.listen({ port: +config.app.port, host: '0.0.0.0' });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}

start();
