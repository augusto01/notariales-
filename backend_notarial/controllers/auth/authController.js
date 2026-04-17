// Subimos dos niveles para llegar a la carpeta config desde controllers/auth/
const db = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 



//registrarUsuario: recibe los datos del usuario, los hashea y los guarda en la base de datos
exports.registrarUsuario = async (req, res) => {
    const { nombre_completo, dni, email, password, nombre_empresa } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Lógica de inserción...
        const [empresaRes] = await db.query(
            'INSERT INTO empresas (nombre_registro) VALUES (?)',
            [nombre_empresa]
        );
        const empresaId = empresaRes.insertId;

        const [usuarioRes] = await db.query(
            'INSERT INTO usuarios (nombre_completo, dni, email, password) VALUES (?, ?, ?, ?)',
            [nombre_completo, dni, email, passwordHash]
        );
        const usuarioId = usuarioRes.insertId;

        await db.query(
            'INSERT INTO usuario_empresa (usuario_id, empresa_id, rol, puede_ver, puede_registrar, puede_editar, puede_eliminar) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [usuarioId, empresaId, 'admin', true, true, true, true]
        );

        res.status(201).json({ msg: 'Registro exitoso' });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};

//loginUsuario: recibe email y password, verifica las credenciales y devuelve un token JWT si son correctas
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Verificar si el usuario existe
        const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (usuarios.length === 0) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        const usuario = usuarios[0];

        // 2. Verificar la contraseña
        const passCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // 3. Traer las empresas y permisos de este usuario
        const [permisos] = await db.query(
            `SELECT empresa_id, rol, puede_ver, puede_registrar, puede_editar, puede_eliminar 
             FROM usuario_empresa WHERE usuario_id = ?`, 
            [usuario.id]
        );

        // 4. Crear el Token JWT
        const payload = {
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre_completo,
                empresas: permisos 
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '8h' // El token dura una jornada laboral
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor', error: error.message });
    }
};