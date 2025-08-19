const Joi = require('joi');
const envVarSchema = Joi.object({
    PORT: Joi.number().default(3000),
    DB_USER: Joi.string().required().description('Database user'),
    DB_HOST: Joi.string().required().description('Database host'),
    DB_NAME: Joi.string().required().description('Database name'),
    DB_PASSWORD: Joi.string().required().description('Database password'),
    DB_PORT: Joi.number().default(5432).description('Database port'),
    MONGODB_URI: Joi.string().required().description('MongoDB URI'),
    MONGODB_PASSWORD: Joi.string().required().description('MongoDB password'),
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development').description('Node environment'),
}).unknown();

module.exports = envVarSchema;