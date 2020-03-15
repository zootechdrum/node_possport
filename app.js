const express = require('express');

const app = express()

//Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT ||  3000;

app.listen(PORT, console.log(`server started on port ${PORT} ` ))