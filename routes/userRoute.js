const nanoid = require('nanoid')
const express = require("express");
const router = express.Router();
let users = require('../data/user.json');

router.use(express.json());

  router.post('/',(req,res)=>{
     
    users.forEach(item=>{
     if(item.username === req.body.username && item.password === req.body.password){
      res.send(true)
      }else{
        res.send(false)
      }
      })
    })
    
module.exports = router;