const User = require('../model/user');
const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.send("User already exists");
        }
        const newUser = new User({
            username,
            email,
            password,
        });
        await newUser.save();
        res.redirect("/login");
    } catch (error) {
        console.error("Error registering user:", error); // Log the error for debugging
        res.send("Error registering user");
    }
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/login",
        failureFlash: false,
    })
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/login");
    });
});

module.exports = router;
