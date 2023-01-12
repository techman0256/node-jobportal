const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');


app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);


app.get('/', (req, res, next) => {
    res.send('Job-Portal');
    next();
});



// console.log('');
app.listen(5000, () => {
    console.log('Job Portal app is running');
})