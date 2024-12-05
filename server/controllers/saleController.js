import pool from '../config/db.js';

export const getSales = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.*, 
             c.nombre as cliente_nombre,
             vd.nombre as vendedor_nombre
      FROM venta v
      JOIN cliente c ON v.id_cliente = c.id_cliente
      JOIN vendedor vd ON v.id_vendedor = vd.id_vendedor
      ORDER BY v.fecha DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    // Get sale details
    const saleResult = await pool.query(
      `SELECT v.*, 
              c.nombre as cliente_nombre,
              vd.nombre as vendedor_nombre
       FROM venta v
       JOIN cliente c ON v.id_cliente = c.id_cliente
       JOIN vendedor vd ON v.id_vendedor = vd.id_vendedor
       WHERE v.id_venta = $1`,
      [id]
    );
    
    if (saleResult.rows.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    // Get sale items
    const itemsResult = await pool.query(
      `SELECT d.*, m.tipo_mueble, m.precio
       FROM detalle_venta d
       JOIN mueble m ON d.id_mueble = m.id_mueble
       WHERE d.id_venta = $1`,
      [id]
    );
    
    const sale = saleResult.rows[0];
    sale.detalles = itemsResult.rows;
    
    res.json(sale);
  } catch (error) {
    console.error('Error fetching sale:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createSale = async (req, res) => {
  const { id_cliente, id_vendedor, detalles } = req.body;
  
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Create sale
    const saleResult = await client.query(
      'INSERT INTO venta (fecha, id_cliente, id_vendedor, total) VALUES (CURRENT_DATE, $1, $2, 0) RETURNING *',
      [id_cliente, id_vendedor]
    );
    
    const sale = saleResult.rows[0];
    let total = 0;
    
    // Add sale details
    for (const detalle of detalles) {
      const { id_mueble, cantidad } = detalle;
      
      // Get furniture price
      const furnitureResult = await client.query(
        'SELECT precio FROM mueble WHERE id_mueble = $1',
        [id_mueble]
      );
      
      const precio = furnitureResult.rows[0].precio;
      const subtotal = precio * cantidad;
      total += subtotal;
      
      await client.query(
        'INSERT INTO detalle_venta (id_venta, id_mueble, cantidad, subtotal) VALUES ($1, $2, $3, $4)',
        [sale.id_venta, id_mueble, cantidad, subtotal]
      );
    }
    
    // Update sale total
    const updatedSale = await client.query(
      'UPDATE venta SET total = $1 WHERE id_venta = $2 RETURNING *',
      [total, sale.id_venta]
    );
    
    await client.query('COMMIT');
    res.status(201).json(updatedSale.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating sale:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    client.release();
  }
};