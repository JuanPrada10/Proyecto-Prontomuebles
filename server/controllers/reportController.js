import pool from "../config/db.js";

export const getMonthlySales = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        DATE_TRUNC('month', fecha) as month,
        SUM(total) as total_sales,
        COUNT(*) as number_of_sales
      FROM venta
      GROUP BY DATE_TRUNC('month', fecha)
      ORDER BY month DESC
      LIMIT 12
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching monthly sales:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTotalSalesCount = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) AS total_sales FROM venta`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching total sales count:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTotalFurnitureCount = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) AS total_furniture FROM mueble`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching total furniture count:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTotalRevenue = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT SUM(total) AS total_revenue FROM venta`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    res.status(500).json({ message: "Server error" });
  }
};
//No importan
// export const getTopSellingProducts = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT
//         m.tipo_mueble,
//         m.material,
//         SUM(d.cantidad) as total_vendido,
//         SUM(d.subtotal) as total_revenue
//       FROM detalle_venta d
//       JOIN mueble m ON d.id_mueble = m.id_mueble
//       GROUP BY m.tipo_mueble, m.material
//       ORDER BY total_vendido DESC
//       LIMIT 10
//     `);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching top selling products:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getTopCustomers = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT
//         c.nombre,
//         COUNT(v.id_venta) as total_purchases,
//         SUM(v.total) as total_spent
//       FROM cliente c
//       JOIN venta v ON c.id_cliente = v.id_cliente
//       GROUP BY c.id_cliente, c.nombre
//       ORDER BY total_spent DESC
//       LIMIT 10
//     `);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching top customers:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const getSellerPerformance = async (req, res) => {
//   try {
//     const result = await pool.query(`
//       SELECT
//         v.nombre as vendedor,
//         COUNT(s.id_venta) as total_sales,
//         SUM(s.total) as total_revenue,
//         AVG(s.total) as average_sale
//       FROM vendedor v
//       LEFT JOIN venta s ON v.id_vendedor = s.id_vendedor
//       GROUP BY v.id_vendedor, v.nombre
//       ORDER BY total_revenue DESC
//     `);
//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching seller performance:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
