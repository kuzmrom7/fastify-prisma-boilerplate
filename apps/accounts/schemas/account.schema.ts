import { FastifySchema } from 'fastify';

const tags = ['Account'];

export const GetAccountSchema: FastifySchema = {
  tags,
  response: {
    200: {
      type: 'object',
      properties: {
        account: {
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
