const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/authController');

//rutas de usuario para registrar y login
router.post('/register', authController.registrarUsuario);
router.post('/login', authController.login);

module.exports = router;