import moment from 'moment';

function futurEvents(eventsArray) {
  const now = moment();
  return eventsArray.filter((ev) => {
    return moment(ev.date).isSameOrAfter(now);
  })
}

function passedEvents(eventsArray) {
  const now = moment();
  return eventsArray.filter((ev) => {
    return moment(ev.date).isBefore(now);
  })
}

export { futurEvents, passedEvents };
