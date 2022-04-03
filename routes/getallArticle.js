const express = require('express')
const router = express.Router()
const { MongoClient2, MongoUrl2 } = require('../database/mongo2')
const redisConnect = require('../database/redisConnect');

router.get('/allarticle', async(req,res)=>{
    await redisConnect.redisConnect()
    MongoClient2.connect(MongoUrl2,(err,db)=>{
        if(err){
            res.json({
                message:"Could not connect to mongoDb"
            })
        }
        var dbo = db.db('CategoryDb')
        var myDb = dbo.collection('articleData')
        var mySort = { views: -1 }
        var todayEnd = new Date().setHours(23,59,59,999);
        myDb.find({}).sort(mySort).toArray( async (err,result)=>{
            if(err){
                console.log(err,"err---->")
            }
            const mostviewedObjectViews = result[0]
            const mostviewedObjectCategory = mostviewedObjectViews.category
            let redisData = await redisConnect.client.set(mostviewedObjectCategory,JSON.stringify(mostviewedObjectViews))
            let redisExpire = redisConnect.client.expireAt(mostviewedObjectCategory,parseInt(todayEnd/1000))
            res.json({
                message: `The highest viewed article which is ${mostviewedObjectCategory} stored in Redis DB`,
                status:redisData
            })
        })
        
    })
})

module.exports = router
