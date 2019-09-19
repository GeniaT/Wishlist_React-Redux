import { getFuturEvents, getPassedEvents, getEvent } from '../../selectors/events';
import myEvents from '../dataForTest/events';

test('Should return passed events. Current date: 2018-05-08T05:09:53.091Z', () => {
  const eventsArray = [
    {date:'2016-05-08T05:09:53.091Z'},
    {date:'2020-05-08T05:09:53.091Z'},
    {date:'2018-05-28T05:09:53.091Z'},
    {date:'2018-05-05T05:09:53.091Z'}
  ]
  const result = getPassedEvents(eventsArray);
  expect(result).toEqual([
    {date:'2016-05-08T05:09:53.091Z'},
    {date:'2018-05-28T05:09:53.091Z'},
    {date:'2018-05-05T05:09:53.091Z'}
  ]);
});

test('Should return futur events. Current date: 08/05/2018', () => {
  const eventsArray = [
    {date:'2016-05-08T05:09:53.091Z'},
    {date:'2020-05-08T05:09:53.091Z'},
    {date:'2021-07-28T05:09:53.091Z'},
    {date:'2018-05-05T05:09:53.091Z'}
  ]
  const result = getFuturEvents(eventsArray);
  expect(result).toEqual([
    {date:'2020-05-08T05:09:53.091Z'},
    {date:'2021-07-28T05:09:53.091Z'}
  ]);
});

test('Should select the right event object based on id', () => {
  const result = getEvent(myEvents, '18jh3');
  expect(result).toEqual({
    id:'18jh3',
    date: "01/02/2019",
    title: "Sandro's brirthday",
    participants: ['Olivier','Dimitri','Jerome','Genia'],
    items: ['Alienware Laptop','1b','DBZ Vegeta figure','2c','3g','Kosplay clothe #1'],
    reservedItems: ['Kosplay clothe #1', 'DBZ Vegeta figure', 'Alienware Laptop'],
    note: "Please reserve an item if you are about to buy it"
  });
});
