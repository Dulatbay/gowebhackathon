const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const errorMiddleware = require("./middlewares/error-middleware");
const router = require("./router");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload')
require('dotenv').config()

const DB_URL = process.env.DB_URL
const app = express();

app.use(cookieParser());
app.use(fileUpload({}));
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/static', express.static('static'))
app.use('/api', router);
app.use(errorMiddleware)
mongoose.connect(DB_URL)


module.exports = app;