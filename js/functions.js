const workTime = (dayStart, dayEnd, startMeeting, timeMeeting) => {
  dayStart = dayStart.split(':');
  dayEnd = dayEnd.split(':');
  startMeeting = startMeeting.split(':');
  let timeMeetingHour = 0;
  while (timeMeeting >= 60){
    timeMeetingHour += 1;
    timeMeeting -= 60;
  }

  const timeEndHour = Number(startMeeting[0]) + timeMeetingHour;
  const timeEndMinute = Number(startMeeting[1]) + timeMeeting;

  if (dayStart[0][0] === '0') {
    dayStart[0] = dayStart[0][1];
  }

  if (timeEndHour <= Number(dayEnd[0]) && timeEndHour >= Number(dayStart[0])){
    if (timeEndMinute <= Number(dayEnd[1])){
      return true;
    }
  }
  return false;
};

workTime('08:00', '17:30', '14:00', 90);
workTime('8:0', '10:0', '8:0', 120);
workTime('08:00', '14:30', '14:00', 90);
workTime('14:00', '17:30', '08:0', 90);
workTime('8:00', '17:30', '08:00', 900);
