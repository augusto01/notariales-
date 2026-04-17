const mysql = require('mysql2');
require('dotenv').config();

// Crear el pool de conexiones usando las variables del archivo .env
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sistema_notarial',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportar la versión de promesas para usar async/await
module.exports = pool.promise();