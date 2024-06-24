const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const dotenv = require('dotenv');
const authMiddleware = require('../middleware/authMiddleware');
const UserModel = require('../models/user')
dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new UserModel({ email, name, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});


router.post('/worko/user', authMiddleware, );
router.get('/worko/user', authMiddleware, );
router.get('/worko/user/:userId', authMiddleware, );
router.put('/worko/user/:userId', authMiddleware, );
router.patch('/worko/user/:userId', authMiddleware, );
router.delete('/worko/user/:userId', authMiddleware, );

module.exports = router;

