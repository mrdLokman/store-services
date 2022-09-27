import * as Joi from 'joi';
export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  HOST: Joi.string().required(),
  PORT: Joi.number().default(80).required(),
  DB_URL: Joi.string().required()
});