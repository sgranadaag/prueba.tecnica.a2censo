const { resolve } = require("path");

module.exports =
{
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, //create tables automatically
  logging: 'error',
  entities: [resolve(__dirname, "src/models/**/*{.ts,.js}")],
  migrations: [resolve(__dirname, "src/migrations/**/*{.ts,.js}")],
};