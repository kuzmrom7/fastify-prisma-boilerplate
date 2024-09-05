import { FastifySchema } from 'fastify';

export const AccountLoginEmailValidateCodeSchema: FastifySchema = {
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      code: { type: 'string' },
    },
    required: ['email'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        profile: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            email: { type: 'string' },
            phone: { type: 'string' },
          },
        },
      },
    },
  },
};
