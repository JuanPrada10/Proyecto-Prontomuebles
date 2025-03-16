# 🏠 Prontomuebles - Sistema de Gestión para Tiendas de Muebles

Prontomuebles es un sistema integral de gestión para tiendas de muebles que abarca funcionalidades de inventario, ventas y generación de informes.

## 🚀 Características

- **Gestión de inventario**: Permite agregar, actualizar y eliminar productos del inventario.
- **Procesamiento de ventas**: Facilita la realización de ventas y el seguimiento de las mismas.
- **Generación de informes**: Ofrece reportes detallados sobre el estado del inventario y las ventas realizadas.

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js con Express.
- **Base de datos**: PostgreSQL.
- **Frontend**: React.js con Tailwind CSS para el diseño.

## 📦 Estructura del Proyecto

- **server/**: Contiene el código del servidor y las rutas de la API.
- **src/**: Incluye el código fuente del frontend en React.
- **database.sql**: Archivo SQL para la creación de la base de datos y las tablas necesarias.
- **index.html**: Archivo principal del frontend.

## 📋 Requisitos Previos

- Tener **Node.js** instalado.
- Tener **PostgreSQL** instalado y configurado.

## ⚙️ Configuración e Instalación

1. **Crear la base de datos en PostgreSQL**:

   ```bash
   createdb furniture_store
   psql furniture_store < database.sql
