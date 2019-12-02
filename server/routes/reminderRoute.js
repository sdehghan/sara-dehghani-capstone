const express = require("express");
const router = express.Router();
let locations = require('../data/location.json');
const format = require('date-fns/format')
let func = require('../function/function')
var parseISO = require('date-fns/parseISO')
router.use(express.json());


reminderList=[]

router.post('/',(req,res)=>{
  let reminderItem =locations.find(item =>req.body.name.toLowerCase() === item.name.toLowerCase())
      if(reminderItem){
        console.log(req.body)
        console.log(req.body.reminder)
        reminderItem.event=req.body.event
        let reminderTime=format(parseISO(req.body.reminder),'MM/dd/yyyy')
        reminderItem.reminder=reminderTime;
        reminderList.push(reminderItem)
        res.send(reminderItem)
        }
        else res.status(400).json({error:"error"})
      })
  
// router.get('/',(req,res)=>{

// // locations.forEach(item=>{
//   // if (location.reminder){
//        let value =func.dateCalc(item.reminder)
//        console.log(value)
//        if (value==0){
//            res.send(true)
//        }else{
//            res.send(false)
//        }
//   // }
// })

module.exports = router;