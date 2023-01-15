const mongodb = require('mongodb');
const mongoose = require('mongoose');

main().catch(err => {});

async function main() {
  await mongoose.connect('mongodb+srv://jpadmin:PwSbRxz9W5exaIEz@cluster0.t2vy8et.mongodb.net/?retryWrites=true&w=majority');
  console.log('mongoose connected successfully');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = mongoose.Schema({
    email: String,
    crtPwd: String,
    // cfrmPwd: String
})



module.exports = mongoose.model('users', userSchema);