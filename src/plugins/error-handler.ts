import fp from 'fastify-plugin';

export default fp(async function errorHandlerPlugin(app) {
  app.setErrorHandler(async (error, req, reply) => {
    const statusCode = error.statusCode || 500;
    app.log.error(error);

    reply
      .status(statusCode)
      .send({ error: { message: error.message || 'Internal Server Error', code: error.code || '' } });
  });
});
