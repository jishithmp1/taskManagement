const pool = require("../config/db");

async function createUser(username, email, password) {
    const sql = "INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)";
    const [result] = await pool.execute(sql, [username, email, password]);
    if (result.affectedRows > 0) {
        const row = getUserData(email);
        if (row.length > 0) {
            return { success: true, data: row[0] };
        } else {
            return { success: false, data: null };
        }
    } else {
        return { success: false , error: "Internal server error"};
    }
}

async function getUserData(email) {
    const sql = "SELECT * FROM users WHERE user_email = ?";
    const [row] = await pool.execute(sql, [email]);

    if (row.length > 0) {
        return row[0];
    } else {
        return { success: false, error: "Internal server error" };
    }
}