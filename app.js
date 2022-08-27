const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config()

const Authroute = require('./Routes/Auth.route')

const app = express()

const PORT = process.env.PORT || 3000

app.get('/', async (req, res, next) => {
    res.send("Hello from express")
})

app.use('/auth', Authroute)

app.use((req, res, next) => {
    // const error = new Error("Not Found");
    // error.status = 404;

    // next(error);

    // http-errors can be used instead of that
    next(createError.NotFound("Not Found"))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message  
        }
    })
})

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})