const express = require('express');
const router = express.Router();
const clienteController = require('../../controllers/clients/clientsController');
const auth = require('../../middlewares/authMiddleware');

// Ruta: GET /api/clientes -> Obtiene clientes de la empresa del usuario
router.get('/', auth, clienteController.obtenerClientes);

// Ruta: POST /api/clientes -> Registra un cliente para la empresa del usuario
router.post('/', auth, clienteController.crearCliente);

module.exports = router;