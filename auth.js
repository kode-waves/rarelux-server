// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const users = []; // Temporary in-memory user store. Replace with a database in a real application.

const generateToken = (user) => {
    return jwt.sign({ id: user.id, walletId: user.walletId, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access token missing or invalid' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is not valid' });
        }
        req.user = user;
        next();
    });
};

const register = async (req, res) => {
    const { walletId, email, password } = req.body;
    if (users.find(user => user.walletId === walletId || user.email === email)) {
        return res.status(400).json({ message: 'User with this walletId or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: users.length + 1, walletId, email, password: hashedPassword };
    users.push(user);

    res.status(201).json({ message: 'User registered successfully' });
};

const login = async (req, res) => {
    const { walletId, email, password } = req.body;
    const user = users.find(user => user.walletId === walletId && user.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid walletId, email, or password' });
    }

    const token = generateToken(user);
    res.json({ token });
};

module.exports = { authenticateToken, register, login };
