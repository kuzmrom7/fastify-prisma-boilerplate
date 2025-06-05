import fp from 'fastify-plugin';

export default fp(async function serializeResponsePlugin(app) {
  app.setSerializerCompiler(({ httpStatus }) => {
    return (data) => {
      return JSON.stringify({
        status: Number(httpStatus) < 400 ? 'success' : 'error',
        payload: data?.data !== undefined ? data.data : data,
      });
    };
  });
});
