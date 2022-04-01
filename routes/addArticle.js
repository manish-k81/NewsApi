const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { MongoClient2,MongoUrl2 } = require("../database/mongo2");
const verifyToken = require('../utils/middleware');

router.post('/article',verifyToken,(req,res)=>{
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
            author:decodedName,
            title:req.body.title,
            category:req.body.category,
            desc:req.body.desc,
            publishedAt:new Date().toISOString(),
            updatedBy: decodedName,
            views:0
        }
        dbo.collection("articleData").insertOne(myObj)
        res.json({
            message:"Inserted"
        })
    })
})

module.exports = router

