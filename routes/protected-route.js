const express = require("express");
const router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");   
}

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("index", { user: req.user });
});

router.get('/setting' , isAuthenticated, (req , res) => {
  res.render('setting', {user : req.user});
})

router.get('/stats' , isAuthenticated, (req , res) => {
  res.render('statistics', {user : req.user});
})

router.get('/setting' , isAuthenticated , (req,res)=> {
    res.render('setting' , {user : req.user})
})

module.exports = router;