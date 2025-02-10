import mysql from "mysql2/promise";

//* Configuracion de conexión a database
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Miguel2015",
  database: "db_sistema_votaciones",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//* Exportar conexion
export default connection;
