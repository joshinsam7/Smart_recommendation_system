const express = require('express');
const app = express()
const port = 8383
const salt = 12; 
const db = require('./db.js');
const { createUserAccount, authentication } = require('./Models/userModels.js');
const {getAllProduct,likeProduct} = require('./Models/productModel.js');

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const bcrypt = require('bcrypt');

app.post('/LoginPage', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await authentication(username, password);
        res.status(200).json(result);
    } 
    catch (err) {
        console.error("Login failed:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/createAccountPage', async (req, res) => {
    const { username, passwordInput } = req.body;
    try {
        console.log("Creating Account");
        const result = await createUserAccount(username, passwordInput);
        res.status(201).json(result);
    }
    catch {
        console.error("Create account failed:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 24;
        const offset = (page - 1) * limit;

        const result = await getAllProduct(limit, offset);
        
        res.json(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    } 
})

app.post('/api/products/like/:asin', async (req, res) => {
    const { asin } = req.params;
    try {
        // Here you would typically update the like count in your database
        // For demonstration, we'll just return a success message
        const result = await likeProduct(asin, true, 1);

        console.log(`Product with ASIN ${asin} liked`);
        res.json({ message: `Product with ASIN ${asin} liked successfully` });
    } catch (err) {
        console.error("Error liking product:", err);
        res.status(500).json({ error: "Server error" });
    }
}
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});