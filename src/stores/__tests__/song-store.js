import SongStore from '../song-store.js';
import { setSongs } from '../../actions/song-actions.js';

const emptyState = {
  songs: {}
};

const dummyData1Songs = [
  { albumid: 123, foo: 'bar' },
];

const dummyData1 = {
  songs: {
    123: dummyData1Songs
  }
};

const dummyData2Songs = [
  { albumid: 456, foo: 'baz' },
];

const dummyData2 = {
  songs: {
    123: dummyData1Songs,
    456: dummyData2Songs
  }
};

const dummyData3Songs = [
  { albumid: 456, ban: 'ana' },
];

const dummyData3 = {
  songs: {
    123: dummyData1Songs,
    456: dummyData3Songs
  }
};

it('provides state', () => {
  const state = SongStore.get();
  expect(state).toEqual(emptyState);
});

it('tracks songs', () => {
  setSongs(dummyData1Songs);

  const state1 = SongStore.get();
  expect(state1).toEqual(dummyData1);

  setSongs(dummyData2Songs);

  const state2 = SongStore.get();
  expect(state2).toEqual(dummyData2);

  setSongs(dummyData3Songs);

  const state3 = SongStore.get();
  expect(state3).toEqual(dummyData3);
});

it('provides songs by albumid', () => {
  setSongs(dummyData1Songs);
  setSongs(dummyData2Songs);

  const seasons = SongStore.getBy(123);
  expect(seasons).toEqual(dummyData1Songs);
});

it('emits change event', () => {
  const mockListener1 = jest.fn();
  const mockListener2 = jest.fn();

  SongStore.addChangeListener(mockListener1);
  SongStore.addChangeListener(mockListener2);

  setSongs(dummyData1Songs);

  expect(mockListener1).toHaveBeenCalledTimes(1);
  expect(mockListener2).toHaveBeenCalledTimes(1);

  SongStore.removeChangeListener(mockListener2);

  setSongs(dummyData2Songs);

  expect(mockListener1).toHaveBeenCalledTimes(2);
  expect(mockListener2).toHaveBeenCalledTimes(1);
});
