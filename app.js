const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const app = express();
const mongoose = require('mongoose');


//DB Config gets the value from config file
const db = require('./config/keys').MongoURI

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))


//Use EJS templating engine
app.use(expressLayouts);
app.set('view engine', 'ejs')

//We need to be able to recieve data from the form
app.use(express.urlencoded({ extended: false}))

//Routes
//Anything with slash get from routes/index
app.use('/', require('./routes/index'));


app.use('/users', require('./routes/users'));

const PORT = process.env.PORT ||  3000;

app.listen(PORT, console.log(`server started on port ${PORT} ` ))