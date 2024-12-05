import pool from '../config/db.js';

export const getCustomers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cliente ORDER BY id_cliente');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM cliente WHERE id_cliente = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createCustomer = async (req, res) => {
  const { nombre, telefono, correo, direccion } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO cliente (nombre, telefono, correo, direccion) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, telefono, correo, direccion]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, correo, direccion } = req.body;
  
  try {
    const result = await pool.query(
      'UPDATE cliente SET nombre = $1, telefono = $2, correo = $3, direccion = $4 WHERE id_cliente = $5 RETURNING *',
      [nombre, telefono, correo, direccion, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'DELETE FROM cliente WHERE id_cliente = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};