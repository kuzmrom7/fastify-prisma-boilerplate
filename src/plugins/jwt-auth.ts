import fp from 'fastify-plugin';

export default fp(async function jwtAuthPlugin(app) {
  app.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify(); // Authorization: Bearer <token>
    } catch (err) {
      console.error(err);
      return reply.code(401).send({ message: 'Unauthorized' });
    }
  });
  app.addHook('preHandler', (request, _, next) => {
    request.jwt = app.jwt;
    return next();
  });
});
