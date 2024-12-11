import pool from '../config/db.js';

export const getUser = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM usuario ORDER BY id_usuario"    
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM usuario WHERE id_usuario = $1",
            [id]
        );

        if (result.rows.length ===0){
            return res.status(404).json({ message: "User not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createUser = async (req, res) => {
    const { username, rol } = req.body;
    
    try {
        const result = await pool.query(
            "INSERT INTO usuario (username, rol) VALUES ($1, $2) RETURNING *",
            [username, rol]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, rol } = req.body;
    
    try {
        const result = await pool.query(
            "UPDATE usuario SET username=$1, rol=$2 WHERE id_usuario=$3 RETURNING *",
            [username, rol, id]
        );
    
    if (result.rows.length === 0){
        return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await pool.query(
            "DELETE FROM usuario WHERE id_usuario = $1 RETURNING *",
            [id]
        );
    
    if (result.rows.length === 0){
        return res.status(404).json({ message: "User not found" });
    }
    
    res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};