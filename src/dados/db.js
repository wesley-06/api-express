import mysql from 'mysql2/promise'

const banco = await mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'escola',
})

export default banco