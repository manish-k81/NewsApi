const express = require('express');
const router = express.Router()
const { MongoClient2, MongoUrl2 } = require('../database/mongo2');

router.get('/:category',(req,res)=>{
    MongoClient2.connect(MongoUrl2, async (err,db)=>{
        if(err){
            res.json({
                message:"Could not connect to mongoDb"
            })
        }
        var myParams = req.params.category
        var dbo = db.db("CategoryDb");
        const myDb = dbo.collection('articleData')
        let processedData = await myDb.findOne({category:myParams})
        let updateData = await myDb.updateOne({category:myParams}, { $set: { views: Number(processedData.views + 1)}})
        // console.log(processedData,"---->ptedata")
        // console.log(updateData,"---->updatedata")
        let finalView = await myDb.findOne({ category:myParams})
        res.json({
            message:"Fetched the data",
            result:finalView
        })
        let findViews = await myDb.find({}).toArray()
        findViews.forEach(findView=>{
            console.log(findView.views,"---->views")
        })
    })
})

module.exports = router