const express = require('express');
const app = express();

const PORT = process.env.PORT || 3030;

const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookie = require('cookie');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const database = require('./util/database');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const auth = require('./controllers/auth')
const companyRoutes = require('./routes/company');
const errorRoutes = require('./controllers/404');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

main().catch(err => {});

async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log('mongoose connected successfully');
    
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/work', companyRoutes);
app.use('/', userRoutes)


app.use((req, res) => {
    // console.log(req.body.email);
    res.status(404);
    res.render('404');

});

app.listen(PORT, () => {
    console.log('Job Portal app is running');
})
        