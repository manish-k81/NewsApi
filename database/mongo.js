var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb://localhost:27017/RegisterNews";

MongoClient.connect(MongoUrl, function(err, db) {
    if (err) throw err;
    // console.log("Database created!");
    db.close();
});

module.exports = {MongoClient,MongoUrl}