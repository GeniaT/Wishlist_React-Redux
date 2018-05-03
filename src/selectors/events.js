import moment from 'moment';

function getFuturEvents(eventsArray) {
  const now = moment();
  return eventsArray.filter((ev) => {
    return moment(ev.date).isSameOrAfter(now);
  })
}

function getPassedEvents(eventsArray) {
  const now = moment();
  return eventsArray.filter((ev) => {
    return moment(ev.date).isBefore(now);
  })
}

export { getFuturEvents, getPassedEvents };
