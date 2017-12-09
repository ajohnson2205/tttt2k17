//function to turn a number of seconds into HH:MM:SS
export function secondsToHHMMSS(seconds) {
  var hours = Math.floor((seconds) / 3600)
  if (hours < 10) {
    var displayHours = "0" + hours.toString()
  } else
    displayHours = hours

  var minutes = Math.floor((seconds) / 60 - (hours * 60)).toString()
  if (minutes < 10) {
    var displayMinutes = "0" + minutes.toString()
  } else
    displayMinutes = minutes

  var seconds = seconds - (hours * 3600) - (minutes * 60).toString()
  if (seconds < 10) {
    var displaySeconds = "0" + seconds.toString()
  } else
    displaySeconds = seconds

  return (displayHours + ":" + displayMinutes + ":" + displaySeconds)
}

//function to turn a day number (0-6) into the appropriate weekday
export function determineWeekdayFromNumber(param) {
  var day
  switch(param) {
    case 0 : day = 'Sunday'
      break;
    case 1 : day = 'Monday'
      break;
    case 2 : day = 'Tuesday'
      break;
    case 3 : day = 'Wednesday'
      break;
    case 4 : day = 'Thursday'
      break;
    case 5 : day = 'Friday'
      break;
    case 6 : day = 'Saturday'
      break;
    default: 'WTF?'
  }
  return day
}


//function to convert timestamp into HH:MM:SS AM/PM
export function timestampToHHMMSS(timestampParam) {
  let hours = timestampParam.getHours();
  let minutes = timestampParam.getMinutes();
  let seconds = timestampParam.getSeconds();
  let addendum = "AM"

  //get things straight for AM vs PM
  if (hours > 12) {
    hours = hours - 12;
    addendum = "PM"
  }

  //get hours minutes and seconds to display zeroes as apppropriate
  if (hours < 10) {
    var displayHours = "0" + hours.toString()
  } else
    displayHours = hours

  if (minutes < 10) {
    var displayMinutes = "0" + minutes.toString()
  } else
    displayMinutes = minutes

  if (seconds < 10) {
    var displaySeconds = "0" + seconds.toString()
  } else
    displaySeconds = seconds

  //put it all together
  return displayHours + ":" + displayMinutes + ":" + displaySeconds + " " + addendum
}
