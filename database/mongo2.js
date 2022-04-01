var MongoClient2 = require('mongodb').MongoClient;
var MongoUrl2 = "mongodb://localhost:27017/CategoryDb";

MongoClient2.connect(MongoUrl2, function(err, db) {
    if (err) throw err;
    // console.log("Database created!");
    db.close();
});

module.exports = {MongoClient2,MongoUrl2}