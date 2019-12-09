const express = require("express");
const router = express.Router();
let locations = require('../data/location.json');

router.use(express.json());

router.get('/', (req, res) => {
  res.send(locations)
})

module.exports = router;

