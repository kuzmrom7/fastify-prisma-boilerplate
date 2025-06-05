import { FastifySchema } from 'fastify';

const tags = ['Auth'];

export const RefreshTokenSchema: FastifySchema = {
  tags,
  response: {
    200: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
        },
      },
      required: ['token'],
    },
  },
};

export const LoginEmailValidateCodeSchema: FastifySchema = {
  tags,
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      code: { type: 'string' },
    },
    required: ['email', 'code'],
  },
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
          required: ['id'],
        },
        token: {
          type: 'string',
        },
      },
      required: ['token', 'account'],
    },
  },
};

export const LoginEmailValidateSchema: FastifySchema = {
  tags,
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
    },
    required: ['email'],
  },
  response: {
    200: {
      type: 'string',
    },
  },
};
