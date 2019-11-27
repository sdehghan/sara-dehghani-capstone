const nanoid = require('nanoid')
const express = require("express");
const router = express.Router();
let location = require('../data/location.json');

router.use(express.json());


router.get('/:category',(req,res)=>{
     if (req.url == "/resturants"){
       let resturant=location.resturants
       res.send(resturant)
     }else if (req.url == "/services"){
        let resturant=location.services
        res.send(resturant)
      }else if (req.url == "/kids"){
        let resturant=location.kids
        res.send(resturant)
      }else if (req.url == "/grocery"){
        let resturant=location.grocery
        res.send(resturant)
      }
})



module.exports = router;
