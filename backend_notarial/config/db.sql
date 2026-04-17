CREATE DATABASE IF NOT EXISTS sistema_notarial;
USE sistema_notarial;

-- 1. Tabla de Empresas (Registros Notariales)
CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_registro VARCHAR(255) NOT NULL,
    cuit VARCHAR(20) UNIQUE,
    direccion VARCHAR(255),
    telefono VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Aquí guardaremos el hash
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla Intermedia: Relación Usuario-Empresa y Roles
-- Permite que un usuario esté en varias empresas con un perfil específico
CREATE TABLE usuario_empresa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    empresa_id INT NOT NULL,
    rol ENUM('admin', 'escribano', 'adscripto', 'administrativo') DEFAULT 'escribano',
    -- Permisos específicos según tu requerimiento 4°
    puede_ver BOOLEAN DEFAULT TRUE,
    puede_registrar BOOLEAN DEFAULT FALSE,
    puede_editar BOOLEAN DEFAULT FALSE,
    puede_eliminar BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);

-- 4. Tabla de Clientes (Los datos que se imprimirán en las plantillas)
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empresa_id INT NOT NULL, -- Cada cliente pertenece a un Registro Notarial
    nombre_completo VARCHAR(255) NOT NULL,
    dni_cuit VARCHAR(20) NOT NULL,
    domicilio VARCHAR(255),
    estado_civil VARCHAR(50),
    profesion VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);