export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.USER_API_PORT, 10) || 9092,
  dbUrl: process.env.DB_URL,
  host: process.env.USER_SERVICE_HOST,
  baseUrl: process.env.BASE_URL,
});
