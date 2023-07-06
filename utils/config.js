const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1/bitfilmsdb' } = process.env;
const { JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports = {
  PORT,
  DB_ADDRESS,
  JWT_SECRET,
};