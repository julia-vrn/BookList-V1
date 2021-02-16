const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db; //_ - the variable is used internally only

const mongoConnect = (callback) =>{
    MongoClient.connect('mongodb://localhost:27017/toDoListDB',  { useUnifiedTopology: true })
        .then(client => {
        console.log('connected');
        _db = client.db(); //db() - pass the name of the db as an argument
        callback();
    })
    .catch(error => {
        console.log(error);
        throw error;
    });
};

const getDb = () => {
    if(_db) {
        return _db; //return the connection
    }
    throw "No db found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;