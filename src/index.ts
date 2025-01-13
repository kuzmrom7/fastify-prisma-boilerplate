import app from './server';
import { config } from './config';
import { disconnectDatabase } from './utils/db/connect';

async function start() {
  await app.ready();

  app.listen({ port: +config.app.port }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

// shutdown
const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();
    await disconnectDatabase();
    process.exit(0);
  });
});

start()
  .then(async () => {
    await disconnectDatabase();
  })
  .catch(async (e) => {
    console.error(e);
    await disconnectDatabase();
    process.exit(1);
  });
