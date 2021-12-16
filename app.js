const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session')

mongoose.connect('mongodb://localhost:27017/shop-app')
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))




// Routes 

const authRoutes = require('./routes/auth');

app.get('/', (req, res) => {
    res.render('index');
});

app.use(authRoutes);






app.listen(3000,()=>{
  console.log('server started at port 3000');
});