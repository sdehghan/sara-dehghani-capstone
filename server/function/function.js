const { format} = require('date-fns');
var formatDistanceToNow = require('date-fns/formatDistanceToNow')
// var compareAsc = require('date-fns/compareAsc')
var differenceInCalendarDays = require('date-fns/differenceInCalendarDays')

const dateCalc=(reminder)=>{

console.log(new Date(reminder))
console.log(new Date())

let value=differenceInCalendarDays(new Date(reminder),new Date())
console.log(value)
 return value
}

module.exports.dateCalc= dateCalc;