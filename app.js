const express = require('express');
const flash = require('connect-flash');
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const app = express();
const mongoose = require('mongoose');
const path = require('path')


//DB Config gets the value from config file
const db = require('./config/keys').MongoURI

// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))


//Use EJS templating engine
app.use(expressLayouts);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

//We need to be able to recieve data from the form
app.use(express.urlencoded({ extended: false}))

//Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//connect flash
app.use(flash())

//Global Vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.success_msg = req.flash('error_msg')
    next()
})

//Routes
//Anything with slash get from routes/index
app.use('/', require('./routes/index'));


app.use('/users', require('./routes/users'));

const PORT = process.env.PORT ||  3000;

app.listen(PORT, console.log(`server started on port ${PORT} ` ))