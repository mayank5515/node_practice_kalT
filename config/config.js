const joi = require("joi");

require("dotenv").config({ path: ".env" });

const envVarSchema = joi
  .object({
    PORT: joi.number().default(3000),
    DB_URI: joi.string().required().description("Database URI"),
    DB_NAME: joi.string().required().description("Database name"),
    DB_PASSWORD: joi.string().required().description("Database password"),
    NODE_ENV: joi
      .string()
      .valid("development", "production", "test")
      .default("development")
      .description("Node environment"),
  })
  .unknown();
const { value: envVars, error } = envVarSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
module.exports = {
  port: envVars.PORT,
  db_name: envVars.DB_NAME,
  db_password: envVars.DB_PASSWORD,
  db_uri: envVars.DB_URI,
  node_env: envVars.NODE_ENV,
};
