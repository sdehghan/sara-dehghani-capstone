const nanoid = require('nanoid')
const express = require("express");
const router = express.Router();
let location = require('../data/location.json');
let func = require('../function/function')

router.use(express.json());



let data=[...location.resturants,...location.services,...location.kids,...location.grocery]

router.get('/',(req,res)=>{

data.forEach(item=>{
  if (item.reminder){
    
       let value =func.dateCalc(item.reminder )
       if (value==0){
           res.send(true)
       }else{
           res.send(false)
       }
  }
}
  
)})



module.exports = router;