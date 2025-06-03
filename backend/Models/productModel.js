const db = require('../db.js');

async function getAllProduct(limit, offset){
    try {
        const result = await db.query(
        "SELECT * FROM products ORDER BY id LIMIT $1 OFFSET $2",
        [limit, offset]
        );

        return result.rows;
    }
    catch {
        console.log("Error getting products from the database");
    }
}

// async function 

async function likeProduct(asin, liked, userId) {
    try {
        const result = await db.query(
            "INSERT INTO interaction (id, user_id, product_id, rating, liked) VALUES (DEFAULT, $1, $2, 0, $3)",
            [1, asin, liked] // Assuming user_id is 1 for demonstration; replace with actual user ID
        );
        return true;
    } catch (error) {
        console.error("Error liking product:", error);
        throw error;
    }
}

module.exports = { getAllProduct, likeProduct };
