var express = require('express');
var router = express.Router();

router.get('/myIndex',(req,res)=>{
  res.json({
    message:"This is the testing route"
  })
})

module.exports = router;
