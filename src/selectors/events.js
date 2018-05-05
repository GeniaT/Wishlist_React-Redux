import moment from 'moment';

function getFuturEvents(eventsArray) {
  const now = moment();
  return eventsArray.filter((ev) => {
    return moment(ev.date).isSameOrAfter(now, 'day');
  })
}

function getPassedEvents(eventsArray) {
  const now = moment();
  return eventsArray.filter((ev) => {
    return moment(ev.date).isBefore(now, 'day');
  })
}

function getEvent(arr, id) {
  return arr.find(obj => obj.id === id);
}

export { getFuturEvents, getPassedEvents, getEvent };
