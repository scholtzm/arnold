import SeasonStore from '../season-store.js';
import { setSeasons } from '../../actions/season-actions.js';

const emptyState = {
  seasons: {}
};

const dummyData1Seasons = [
  { tvshowid: 123, foo: 'bar' },
];

const dummyData1 = {
  seasons: {
    123: dummyData1Seasons
  }
};

const dummyData2Seasons = [
  { tvshowid: 456, foo: 'baz' },
];

const dummyData2 = {
  seasons: {
    123: dummyData1Seasons,
    456: dummyData2Seasons
  }
};

const dummyData3Seasons = [
  { tvshowid: 456, ban: 'ana' },
];

const dummyData3 = {
  seasons: {
    123: dummyData1Seasons,
    456: dummyData3Seasons
  }
};

it('provides state', () => {
  const state = SeasonStore.get();
  expect(state).toEqual(emptyState);
});

it('tracks seasons', () => {
  setSeasons(dummyData1Seasons);

  const state1 = SeasonStore.get();
  expect(state1).toEqual(dummyData1);

  setSeasons(dummyData2Seasons);

  const state2 = SeasonStore.get();
  expect(state2).toEqual(dummyData2);

  setSeasons(dummyData3Seasons);

  const state3 = SeasonStore.get();
  expect(state3).toEqual(dummyData3);
});

it('provides seasons by tvshowid', () => {
  setSeasons(dummyData1Seasons);
  setSeasons(dummyData2Seasons);

  const seasons = SeasonStore.getBy(123);
  expect(seasons).toEqual(dummyData1Seasons);
});

it('emits change event', () => {
  const mockListener1 = jest.fn();
  const mockListener2 = jest.fn();

  SeasonStore.addChangeListener(mockListener1);
  SeasonStore.addChangeListener(mockListener2);

  setSeasons(dummyData1Seasons);

  expect(mockListener1).toHaveBeenCalledTimes(1);
  expect(mockListener2).toHaveBeenCalledTimes(1);

  SeasonStore.removeChangeListener(mockListener2);

  setSeasons(dummyData2Seasons);

  expect(mockListener1).toHaveBeenCalledTimes(2);
  expect(mockListener2).toHaveBeenCalledTimes(1);
});
