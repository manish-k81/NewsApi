const express = require('express')
const router = express.Router()
const {MongoClient,MongoUrl} = require('../database/mongo');

router.post('/register',(req,res)=>{
    MongoClient.connect(MongoUrl, function(err, db) {
        if (err){
            res.json({
                message:"Could not connect to mongodb"
            })
        }
        var dbo = db.db("RegisterNews");
        var myObj = { name:req.body.name, email:req.body.email, password:req.body.password }
        dbo.collection("RegisteresUsers").insertOne(myObj, function(err, result) {
            if (err){
                res.json({
                    message:"There is some Errorr"
                })
            }
            res.json({
                message:"One data inserted!"
            })
            db.close();
        });
    });
})



module.exports = router;