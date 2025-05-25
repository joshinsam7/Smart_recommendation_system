const db = require('../db.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createUserAccount(username, passwordInput) {
    try {
        const hash = await bcrypt.hash(passwordInput, saltRounds);
        const query = "INSERT INTO users (username, password_hash) VALUES ($1, $2)";
        await db.query(query, [username, hash]);
        return { message: "Account created" };
    } catch (err) {
        console.error("Error creating user account:", err);
        return { message: "Error creating user account", error: err };
    }
}

async function authentication(username, passwordInput) {
    try {
        const res = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        if (res.rows.length === 0) {
            return { message: "User not found" };
        }

        const user = res.rows[0];
        const match = await bcrypt.compare(passwordInput, user.password_hash);
        console.log("Match", match);
        if (match) {
            return { message: "Account Authenticated" };
        } else {
            return { message: "Incorrect password" };
        }

    } catch (err) {
        console.error("Authentication error:", err);
        return { message: "Authentication failed", error: err };
    }
}


module.exports = {createUserAccount, authentication};