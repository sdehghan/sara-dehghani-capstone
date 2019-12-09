const express = require("express");
const router = express.Router();
let locations = require('../data/location.json');
const format = require('date-fns/format')
let func = require('../function/function')
var parseISO = require('date-fns/parseISO')
router.use(express.json());


reminderList = []

//posting reminder
router.post('/', (req, res) => {
  let reminderItem = locations.find(item => req.body.name.toLowerCase() === item.name.toLowerCase())
  if (reminderItem) {
    //create reminder
    reminderItem.event = req.body.event
    let reminderTime = format(parseISO(req.body.reminder), 'MM/dd/yyyy')
    reminderItem.reminder = reminderTime;
    //
    //check if item already has reminder
    let repeatItem = reminderList.find(item => req.body.name.toLowerCase() === item.name.toLowerCase())
    if (repeatItem) {
      reminderItem.displayed = 0;
      repeatItem = reminderItem
      res.send(repeatItem)
    } else {
      reminderList.push(reminderItem)
      res.send(reminderItem)
    }
  }
  else res.status(400).json({ error: "error" })
})

//delete reminder
router.delete('/:id', (req, res) => {
  reminderList.map(item => {
    if (req.params.id === item.id) {
      item.event = ""
      item.reminder = ""
      res.send(item)
    }
  });

})

module.exports = router;