const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const database = require('./util/database');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/company');
const errorRoutes = require('./controllers/404');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', 'views');
// const view = path.join(__dirname, )


app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/work', companyRoutes);


app.get('/', (req, res, next) => {
    res.render('index');
    // res.send('<html><a> Sign-In </a></html>');
    next();
});

app.use((req, res, next) => {
    res.status(404);
    res.render('404');

});


// database.mongoConnect(() => {

    app.listen(5000, () => {
        console.log('Job Portal app is running');
    })
        
// })