const { format } = require('date-fns');
var formatDistanceToNow = require('date-fns/formatDistanceToNow')
var differenceInCalendarDays = require('date-fns/differenceInCalendarDays')

const dateCalc = (reminder) => {

    let value = differenceInCalendarDays(new Date(reminder), new Date())
    return value
}

module.exports.dateCalc = dateCalc;