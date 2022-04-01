const express = require('express');
const router = express.Router()
const redisConnect = require('../database/redisConnect')

router.post('/testing', async (req, res)=>{
    redisConnect.redisConnect()
    const myData = await redisConnect.client.set('agenew', JSON.stringify({"_id": "623f11ba9128b825fde02807",
    "author": "sam",
    "title": "Ukraine vs Russia",
    "category": "politics",
    "desc": "Ukrainian President Volodymyr Zelenskyy calls on energy producing countries to increase output to stop Russia from using its oil and gas wealth to “blackmail” other nations.",
    "publishedAt": "2022-03-26T13:14:34.029Z",
    "updatedBy": "sam",
    "views": 9}))
    console.log(myData,"---> mydata")
    return res.json({
        message:"Data added to the redis"
    })
});

// router.get('/testing/:name', async (req, res)=>{
//     redisConnect.redisConnect()
//     const myData = await redisConnect.client.get(req.params.name)
//     let newData = JSON.stringify(myData)
//     console.log(myData,"---> mydata")
//     return res.json({
//         message:"Data fetched",
//         status:newData
//     })
// });


module.exports = router