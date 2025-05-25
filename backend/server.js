const express = require('express');
const app = express()
const port = 8383
const salt = 12; 
const db = require('./db.js');
const { createUserAccount, authentication } = require('./Models/userModels.js');

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
    } catch (err) {
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