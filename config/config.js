const joi = require('joi');

require('dotenv').config({ path: '.env' });

const envVarSchema = joi.object({
    PORT: joi.number().default(3000),
    DB_USER: joi.string().required().description('Database user'),
    DB_HOST: joi.string().required().description('Database host'),
    DB_NAME: joi.string().required().description('Database name'),
    DB_PASSWORD: joi.string().required().description('Database password'),
    DB_PORT: joi.number().default(5432).description('Database port'),
    NODE_ENV: joi.string().valid('development', 'production', 'test').default('development').description('Node environment'),
}).unknown();

const { value: envVars, error } = envVarSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
module.exports = {
    port: envVars.PORT,
    db_user: envVars.DB_USER,
    db_host: envVars.DB_HOST,
    db_name: envVars.DB_NAME,
    db_password: envVars.DB_PASSWORD,
    db_port: envVars.DB_PORT,
    node_env: envVars.NODE_ENV,
}