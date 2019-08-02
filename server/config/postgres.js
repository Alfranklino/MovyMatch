const { Pool } = require("pg");
// let bcrypt = require("bcryptjs");
// var salt = bcrypt.genSaltSync(10);

const postgres = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "",
  port: 5432
});

module.exports = postgres;
