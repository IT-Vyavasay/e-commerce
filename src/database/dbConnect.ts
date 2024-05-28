// Require and initialize outside of your main handler

const host = process.env.ENDPOINT;
const database = process.env.DATABASE;
const user = process.env.USER_NAME;
const password = process.env.PASSWORD;
const DATABASE = require("serverless-mysql")({
  config: {
    host: host,
    database: database,
    user: user,
    password: password,
  },
});

const DB_Conection = async () => {
  await DATABASE.connect();
  console.log("My SQL Database connected");
};
DB_Conection();
module.exports = { DATABASE };
