const knex = require("knex");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/database/db.sqlite",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "mysql",
    connection: {
      host: "mysql669.umbler.com",
      port: "41890",
      database: "tyhdb",
      user: "tyhwesley",
      password: "herlim437546",
    },
    migrations: {
      directory: "./src/database/migrations",
      tableName: "tyhdb",
    },
    useNullAsDefault: true,
  },
};
