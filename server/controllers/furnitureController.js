import pool from '../config/db.js';

export const getFurniture = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mueble ORDER BY id_mueble');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching furniture:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFurnitureById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM mueble WHERE id_mueble = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Furniture not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching furniture:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createFurniture = async (req, res) => {
  const { tipo_mueble, material, color, precio, id_proveedor, alto, ancho, profundidad } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO mueble (tipo_mueble, material, color, precio, id_proveedor, alto, ancho, profundidad) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [tipo_mueble, material, color, precio, id_proveedor, alto, ancho, profundidad]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating furniture:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateFurniture = async (req, res) => {
  const { id } = req.params;
  const { tipo_mueble, material, color, precio, id_proveedor, alto, ancho, profundidad } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE mueble SET tipo_mueble = $1, material = $2, color = $3, precio = $4, id_proveedor = $5, alto = $6, ancho = $7, profundidad = $8 WHERE id_mueble = $9 RETURNING *',
      [tipo_mueble, material, color, precio, id_proveedor, alto, ancho, profundidad, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Furniture not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating furniture:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteFurniture = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'DELETE FROM mueble WHERE id_mueble = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Furniture not found' });
    }
    
    res.json({ message: 'Furniture deleted successfully' });
  } catch (error) {
    console.error('Error deleting furniture:', error);
    res.status(500).json({ message: 'Server error' });
  }
};