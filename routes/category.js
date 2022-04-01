const express = require("express");
const router = express.Router();
const { MongoClient2,MongoUrl2 } = require('../database/mongo2');
const verifyToken = require('../utils/middleware');
const jwt = require('jsonwebtoken');

router.post('/category',verifyToken,(req,res)=>{
    MongoClient2.connect(MongoUrl2,(err,db)=>{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)
        const decodedName = decoded.name
        console.log(decoded,"---->this is decoded")
        if(err){
            res.json({
                message:"Cannot connect to mongoDb"
            })
        }
        var dbo = db.db("CategoryDb")
        var myObj = {
            title:req.body.title,
            createdBy: decodedName,
            createdAt: new Date().toISOString()
        }
        dbo.collection("CategoryData").insertOne(myObj)
        res.json({
            message:"Inserted"
        })
    })
})

module.exports = router

