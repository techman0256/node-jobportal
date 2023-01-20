const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const database = require('./util/database');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/company');
const errorRoutes = require('./controllers/404');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

main().catch(err => {});

async function main() {
  await mongoose.connect('mongodb+srv://jpadmin:PwSbRxz9W5exaIEz@cluster0.t2vy8et.mongodb.net/?retryWrites=true&w=majority');
  console.log('mongoose connected successfully');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(bodyParser.urlencoded());

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/work', companyRoutes);
app.use('/', userRoutes)


app.use((req, res, next) => {
    // console.log(req.body.email);
    res.status(404);
    res.render('404');

});


// database.mongoConnect(() => {

    app.listen(5000, () => {
        console.log('Job Portal app is running');
    })
        
// })