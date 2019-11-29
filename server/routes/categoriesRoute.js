const nanoid = require('nanoid')
const express = require("express");
const router = express.Router();
let locations = require('../data/location.json');

router.use(express.json());


let savedLocations=[]

  router.post('/',(req,res)=>{
 
   let savedItem =locations.find(item =>req.body.name === item.name)
   let value=savedLocations.find(item=>item.name == req.body.name)
   if(savedItem && !value){
     savedLocations.push(savedItem)
     res.send(savedItem)
     }
  })


  router.get('/',(req,res)=>{
     res.send(savedLocations)
    })

    module.exports = router;