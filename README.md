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
   ```

2. **Configurar las variables de entorno**:

   - Copiar `.env.example` a `.env`.
   - Actualizar las credenciales de la base de datos y el secreto JWT en el archivo `.env`.

3. **Instalar las dependencias**:

   ```bash
   npm install
   ```

4. **Iniciar el servidor**:

   ```bash
   npm run server
   ```

5. **Iniciar el frontend**:

   ```bash
   npm run dev
   ```

## 🧑‍💻 Uso

Una vez que el servidor y el frontend estén en funcionamiento, puedes acceder a la aplicación a través de tu navegador web en `http://localhost:3000`. Desde allí, podrás gestionar el inventario, procesar ventas y generar informes según tus necesidades.

## 🤝 Contribuciones

Las contribuciones al proyecto son bienvenidas. Puedes hacerlo a través de *pull requests* o reportando *issues* en el repositorio.

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

*Nota: Asegúrate de mantener actualizadas las dependencias y seguir las mejores prácticas de seguridad al desplegar este sistema en un entorno de producción.*

