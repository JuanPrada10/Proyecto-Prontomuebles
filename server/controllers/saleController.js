import pool from "../config/db.js";

export const getSales = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM venta ORDER BY fecha DESC `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ message: "Server error" });
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
      return res.status(404).json({ message: "Sale not found" });
    }

    const sale = saleResult.rows[0];
    sale.detalles = itemsResult.rows;

    res.json(sale);
  } catch (error) {
    console.error("Error fetching sale:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createSale = async (req, res) => {
  const { id_cliente, id_vendedor, total } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Crear venta
    const saleResult = await client.query(
      "INSERT INTO venta (fecha, id_cliente, id_vendedor, total) VALUES (CURRENT_DATE, $1, $2, $3) RETURNING *",
      [id_cliente, id_vendedor, total]
    );

    await client.query("COMMIT");
    res.status(201).json(saleResult.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating sale:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.release();
  }
};
