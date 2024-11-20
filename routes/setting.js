const express = require('express');
const User = require('../model/user');

const router = express.Router();

router.put('/update', async (req, res) => {
    const {username, email, password } = req.body;
    const userId = req.user._id;
    console.log(username, email, password);
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();
        res.send('User updated successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;