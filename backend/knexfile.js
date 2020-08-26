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

  //Production on Umbler.
  production: {
    client: "mysql",
    connection: {
      host: "mysql669.umbler.com",
      port: "41890",
      database: "Your_Databese",
      user: "Your_User",
      password: "Your_Pass",
    },
    migrations: {
      directory: "./src/database/migrations",
      tableName: "tyhdb",
    },
    useNullAsDefault: true,
  },
};
