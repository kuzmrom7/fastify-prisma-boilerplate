import app from './server';
import { config } from './config';

async function start() {
  await app.ready();

  app.listen({ port: +config.app.port, host: '0.0.0.0' }, (error) => {
    if (error) {
      app.log.error(error);
      process.exit(1);
    }
  });
}

// shutdown
const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close();

    await app.prisma.$disconnect();
    process.exit(0);
  });
});

start();
