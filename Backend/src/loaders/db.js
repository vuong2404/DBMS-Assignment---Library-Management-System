const mysql = require('mysql2/promise');
 
let {env} = require("../config")

const dbConfig= { 
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_DATABASE,
  password: env.DB_PASSWORD
}

const pool = mysql.createPool(dbConfig);
 
module.exports = pool;