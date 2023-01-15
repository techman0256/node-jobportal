const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    
    MongoClient.connect('mongodb+srv://jpadmin:PwSbRxz9W5exaIEz@cluster0.t2vy8et.mongodb.net/?retryWrites=true&w=majority')
    .then(result => {
        console.log('Connected successfully !');
        _db = result.db()
        callback();
    })
    .catch(err => {
        console.log(err);
    });

}

const getDB = () => {
    if (_db) {
        return _db;
    }
    // throw 'No database found !';
}

exports.mongoConnect = mongoConnect; 
exports.getDB = getDB;


