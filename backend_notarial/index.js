require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Importamos las rutas desde la nueva carpeta auth
app.use('/api/auth', require('./routes/auth/authRoutes'));
app.use('/api/clientes', require('./routes/clients/clientsRoutes'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});