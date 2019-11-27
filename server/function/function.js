const dateCalc=(reminder)=>{
let today=new Date();
console.log(today)
let reminderTime=new Date(reminder)
console.log(reminderTime)
var Difference_In_Time = today.getTime()-reminderTime.getTime(); 
var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
return Math.floor(Difference_In_Days);
}

module.exports.dateCalc= dateCalc;