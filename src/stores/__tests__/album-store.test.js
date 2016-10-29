import AlbumStore from '../album-store.js';
import { setAlbums, getAlbumsError } from '../../actions/album-actions.js';

const emptyState = {
  albums: [],
  lastFetchFailed: false
};

const dummyData1 = {
  albums: ['album1', 'album2'],
  lastFetchFailed: false
};

const dummyData2 = {
  albums: ['album3', 'album4'],
  lastFetchFailed: false
};

it('provides state', () => {
  const state = AlbumStore.get();
  expect(state).toEqual(emptyState);
});

it('tracks albums', () => {
  setAlbums(dummyData1.albums);

  const stateOld = AlbumStore.get();
  expect(stateOld).toEqual(dummyData1);

  setAlbums(dummyData2.albums);

  const stateNew = AlbumStore.get();
  expect(stateNew).toEqual(dummyData2);
});

it('emits change event', () => {
  const mockListener1 = jest.fn();
  const mockListener2 = jest.fn();

  AlbumStore.addChangeListener(mockListener1);
  AlbumStore.addChangeListener(mockListener2);

  setAlbums(dummyData1.albums);

  expect(mockListener1).toHaveBeenCalledTimes(1);
  expect(mockListener2).toHaveBeenCalledTimes(1);

  AlbumStore.removeChangeListener(mockListener2);

  setAlbums(dummyData1.albums);

  expect(mockListener1).toHaveBeenCalledTimes(2);
  expect(mockListener2).toHaveBeenCalledTimes(1);
});

it('tracks load errors', () => {
  getAlbumsError(new Error('Test'));

  const state = AlbumStore.get();
  expect(state.lastFetchFailed).toBe(true);
});
