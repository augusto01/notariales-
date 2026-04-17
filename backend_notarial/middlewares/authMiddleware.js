const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header (x-auth-token)
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso no válido' });
    }

    // Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);
        
        // Añadimos los datos del usuario (id y sus empresas) al objeto request
        req.usuario = cifrado.usuario;
        
        next(); // Continuar al siguiente paso (el controlador)
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
};