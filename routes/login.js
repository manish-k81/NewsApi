const express = require('express');
const router = express.Router()
const {MongoClient, MongoUrl } = require('../database/mongo')
const jwt = require('jsonwebtoken')
const verifyToken = require('../utils/middleware')

router.post('/login',(req,res)=>{
    MongoClient.connect(MongoUrl,(err,db)=>{
        if(err){
            res.json({
                message:"Could not connect"
            })
        }
        var dbo = db.db("RegisterNews")
        dbo.collection("RegisteresUsers").find({},{ projection: { _id: 0, email: 1, password: 1 } }).toArray((err,results)=>{
            let newArray = [];
            if(err){
                res.json({
                    message:"there is some error"
                })
            }
            results.forEach(result=>{
                newArray.push(result.email)
            })
            newArray.map(na=>{
                if(na === req.body.email) {
                    const access_token = jwt.sign({email: req.body.email, name:req.body.name},process.env.JWT_ACCESS_KEY,{expiresIn: process.env.JWT_ACCESS_TIME})
                    return res.json({
                        message:"Logged in successfully",
                        access_token:access_token
                    })
                }else{
                    console.log("Please register")
                }
            })
        })
    })
})

module.exports = router;