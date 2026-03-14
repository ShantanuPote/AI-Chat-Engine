const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require('../src/routes/auth.routes')

const app = express();



// using middlewares 
app.use(express.json());
app.use(cookieParser())


// using routes
app.use('/api/auth', authRoutes)


module.exports = app;