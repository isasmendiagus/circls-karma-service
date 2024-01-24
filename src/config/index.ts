import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const envFound = dotenv.config();
if (envFound.error) throw new Error('Cannot find .env file️');

//TODO: Use Joi to validate the configuration
export default {
  appPort: parseInt(process.env.APP_PORT || '', 10),
  apiPrefix: process.env.API_PREFIX,
  databaseURL: process.env.MONGODB_URI,
  defaultKarmaScore: parseInt(process.env.DEFAULT_KARMA_SCORE || '', 10),
  amqpUrl: process.env.AMQP_URL || '',
  amqpQueue: process.env.AMQP_QUEUE_NAME || '',
};
