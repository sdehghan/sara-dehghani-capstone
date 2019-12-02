const nanoid = require('nanoid')
const express = require("express");
const router = express.Router();
let locations = require('../data/location.json');
const format = require('date-fns/format')
let func = require('../function/function')
var parseISO = require('date-fns/parseISO')
router.use(express.json());


let savedLocations=[]

  router.post('/',(req,res)=>{
  
   let savedItem =locations.find(item =>req.body.name.toLowerCase()=== item.name.toLowerCase())
   let value=savedLocations.find(item=>item.name.toLowerCase()== req.body.name.toLowerCase())
   if(savedItem && !value){
     savedLocations.push(savedItem)
     res.send(savedItem)
     }else res.status(400).json({error:"item already saved"})
  })


  router.get('/',(req,res)=>{
     res.send(savedLocations)
    })

  router.delete('/:id',(req,res)=>{
    newList=[]
    console.log(req)
    //start troubleshooting here
    if(req.params.id){
      let newLocations =savedLocations.filter(item =>req.params.id!==item.id)
       savedLocations=newLocations
      res.send(savedLocations)
    }
  })

  router.post('/:category',(req,res)=>{

    let value =func.dateCalc(req.body.reminder)
    console.log(value)
    if (value==0){
        res.send(true)
    }else{
        res.send(false)
    }
  })


  module.exports = router;