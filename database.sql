CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'seller')),
    id_vendedor INTEGER REFERENCES vendedor(id_vendedor)
);

CREATE TABLE proveedor (
    id_proveedor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    persona_contacto VARCHAR(100) NOT NULL
);

CREATE TABLE mueble (
    id_mueble SERIAL PRIMARY KEY,
    tipo_mueble VARCHAR(50) NOT NULL,
    material VARCHAR(50) NOT NULL,
    dimensiones JSONB NOT NULL,
    color VARCHAR(30) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    id_proveedor INTEGER REFERENCES proveedor(id_proveedor)
);

CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    direccion TEXT NOT NULL
);

CREATE TABLE vendedor (
    id_vendedor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

CREATE TABLE venta (
    id_venta SERIAL PRIMARY KEY,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    total DECIMAL(10,2) NOT NULL,
    id_cliente INTEGER REFERENCES cliente(id_cliente),
    id_vendedor INTEGER REFERENCES vendedor(id_vendedor)
);

CREATE TABLE detalle_venta (
    id_detalle SERIAL PRIMARY KEY,
    id_venta INTEGER REFERENCES venta(id_venta),
    id_mueble INTEGER REFERENCES mueble(id_mueble),
    cantidad INTEGER NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL
);

-- Indexes for better performance
CREATE <boltAction type="file" filePath="database.sql"> INDEX idx_mueble_proveedor ON mueble(id_proveedor);
CREATE INDEX idx_venta_cliente ON venta(id_cliente);
CREATE INDEX idx_venta_vendedor ON venta(id_vendedor);
CREATE INDEX idx_detalle_venta_venta ON detalle_venta(id_venta);
CREATE INDEX idx_detalle_venta_mueble ON detalle_venta(id_mueble);
CREATE INDEX idx_usuario_vendedor ON usuario(id_vendedor);

-- Sample data
INSERT INTO vendedor (nombre, telefono) VALUES
('Juan Pérez', '555-0001'),
('María García', '555-0002');

INSERT INTO usuario (username, password, role, id_vendedor) VALUES
('admin', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E7kkrzKfsEoei', 'admin', NULL),
('juan.perez', '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9E7kkrzKfsEoei', 'seller', 1);

INSERT INTO proveedor (nombre, direccion, telefono, persona_contacto) VALUES
('Muebles Modernos S.A.', 'Calle Principal 123', '555-0101', 'Roberto Gómez'),
('Diseños Exclusivos', 'Av. Central 456', '555-0102', 'Ana Martínez');

INSERT INTO mueble (tipo_mueble, material, dimensiones, color, precio, id_proveedor) VALUES
('Sofa', 'Leather', '{"alto": 90, "ancho": 200, "profundidad": 100}', 'Brown', 999.99, 1),
('Dining Table', 'Oak Wood', '{"alto": 75, "ancho": 160, "profundidad": 90}', 'Natural', 599.99, 2);

INSERT INTO cliente (nombre, telefono, correo, direccion) VALUES
('Carlos López', '555-0201', 'carlos.lopez@email.com', 'Av. Principal 789'),
('Ana Rodríguez', '555-0202', 'ana.rodriguez@email.com', 'Calle Central 012');