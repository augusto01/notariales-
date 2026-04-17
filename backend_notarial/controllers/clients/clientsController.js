const db = require('../../config/db');

// Obtener todos los clientes de LA EMPRESA del usuario logueado
exports.obtenerClientes = async (req, res) => {
    try {
        // El id de la empresa viene del middleware de auth (req.usuario)
        // Tomamos la primera empresa por defecto o podrías pasarla por query
        const empresaId = req.usuario.empresas[0].empresa_id;

        const [clientes] = await db.query(
            'SELECT * FROM clientes WHERE empresa_id = ? ORDER BY created_at DESC',
            [empresaId]
        );

        res.json(clientes);
    } catch (error) {
        res.status(500).json({ msg: 'Error al obtener clientes', error: error.message });
    }
};

// Crear un nuevo cliente asociado a la empresa del usuario
exports.crearCliente = async (req, res) => {
    const { nombre_completo, dni_cuit, domicilio, estado_civil, profesion } = req.body;
    const empresaId = req.usuario.empresas[0].empresa_id;

    try {
        const [nuevoCliente] = await db.query(
            `INSERT INTO clientes (empresa_id, nombre_completo, dni_cuit, domicilio, estado_civil, profesion) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [empresaId, nombre_completo, dni_cuit, domicilio, estado_civil, profesion]
        );

        res.status(201).json({
            msg: 'Cliente registrado correctamente',
            clienteId: nuevoCliente.insertId
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error al guardar el cliente', error: error.message });
    }
};