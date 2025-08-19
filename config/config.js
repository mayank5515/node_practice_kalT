const joi = require('joi');

require('dotenv').config({ path: '.env' });
const envVarSchema = require('../validations/env.validations');
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
    mongodb_password: envVars.MONGODB_PASSWORD,
    mongodb_uri: envVars.MONGODB_URI,
    node_env: envVars.NODE_ENV,
}