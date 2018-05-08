import moment from 'moment';

function getEvent(arr, id) {
  return arr.find(obj => obj.id === id);
}

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

export { getFuturEvents, getPassedEvents, getEvent };
