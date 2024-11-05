const express = require('express');
const connectDB = require('./config/connectDB')
const dotenv = require('dotenv')
const passport = require('./config/passport')
const session = require('express-session');
const path = require('path');

dotenv.config();

const app = express();
connectDB();

app.set("view engine" , 'ejs');
app.set("views", path.join(__dirname, "views"));
 

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
    session({
        secret: process.env.SECRET,
        resave : false,
        saveUninitialized: false,
        cookie : {
            maxAge : 10 * 60 * 60 * 1000,
        }
    })
)

app.use(passport.initialize());
app.use(passport.session());

app.use('/' , require('./routes/auth'))
app.use('/' , require('./routes/protected-route'))

const port = process.env.PORT; 

app.listen(port ,()=> {
    console.log('Connected to the Port'); 
})