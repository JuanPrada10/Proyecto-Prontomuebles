import pool from "../config/db.js";

export const getEmployee = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM vendedor ORDER BY id_vendedor"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM vendedor WHERE id_vendedor = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching employee", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createEmployee = async (req, res) => {
  const { nombre, telefono } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO vendedor (nombre, telefono) VALUES ($1, $2) RETURNING *",
      [nombre, telefono]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { nombre, telefono } = req.body;

  try {
    const result = await pool.query(
      "UPDATE vendedor SET nombre=$1, telefono=$2 WHERE id_vendedor=$3 RETURNING *",
      [nombre, telefono, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM vendedor WHERE id_vendedor=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Furniture deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};
