import pool from "../config/db.js";

export const getProviders = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM proveedor ORDER BY id_proveedor"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching providers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProviderById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM proveedor WHERE id_proveedor = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching provider:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProvider = async (req, res) => {
  const { nombre, direccion, telefono, persona_contacto } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO proveedor (nombre, direccion, telefono, persona_contacto) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, direccion, telefono, persona_contacto]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating provider:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProvider = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono, persona_contacto } = req.body;

  try {
    const result = await pool.query(
      "UPDATE proveedor SET nombre = $1, direccion = $2, telefono = $3, persona_contacto = $4 WHERE id_proveedor = $5 RETURNING *",
      [nombre, direccion, telefono, persona_contacto, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating provider:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProvider = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM proveedor WHERE id_proveedor = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Provider not found" });
    }

    res.json({ message: "Provider deleted successfully" });
  } catch (error) {
    console.error("Error deleting provider:", error);
    res.status(500).json({ message: "Server error" });
  }
};
