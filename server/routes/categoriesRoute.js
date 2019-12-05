const nanoid = require('nanoid')
const express = require("express");
const router = express.Router();
let locations = require('../data/location.json');
const format = require('date-fns/format')
let func = require('../function/function')
var parseISO = require('date-fns/parseISO')
router.use(express.json());


let savedLocations=[]

//post a saved item
  router.post('/',(req,res)=>{
  
   let savedItem =locations.find(item =>req.body.name.toLowerCase()=== item.name.toLowerCase())
   let value=savedLocations.find(item=>item.name.toLowerCase()===req.body.name.toLowerCase())
   if(savedItem && !value){
     savedLocations.push(savedItem)
     res.send(savedItem)
     }else res.status(400).json({error:"item already saved"})
  })

 //get all save location
  router.get('/',(req,res)=>{
     res.send(savedLocations)
    })

  //delete  a saved location
  router.delete('/:id',(req,res)=>{
    if(req.params.id){
      let newLocations =savedLocations.filter(item =>req.params.id!==item.id)
       savedLocations=newLocations
      res.send(savedLocations)
    }
  })
 //reminder check
  router.post('/:category',(req,res)=>{
    let value =func.dateCalc(req.body.reminder)
    let test=savedLocations.find(item=>item.id === req.body.id)
    test.displayed= test.displayed+1;
    if (value===0 && test.displayed <= 1){
        res.send(true)
    }else{
        res.send(false)
    }
  })

  module.exports = router;