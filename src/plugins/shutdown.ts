import fp from 'fastify-plugin';

export default fp(async function shutdownPlugin(app) {
  app.after((error) => {
    if (error) {
      app.log.error(error);
    }
    app.gracefulShutdown((signal) => {
      app.prisma.$disconnect(); // disconnect from prisma
      app.log.info('Received signal to shutdown: %s', signal);
    });
  });
});
