import testSettings from './test-settings.js';
import { getSongs } from '../song-actions.js';
import SongStore from '../../stores/song-store.js';
import { setSettings } from '../settings-actions.js';
import SongStoreData from '../../../data/SongStoreData.json';
import { init } from '../../rpc/flux-listeners.js';

jest.useFakeTimers();

beforeAll(() => {
  init();
  setSettings(testSettings);
});

it('allows to retrieve songs', () => {
  const albumId = 1;
  const mockListener = jest.fn();

  SongStore.addChangeListener(mockListener);

  getSongs(albumId);

  jest.runAllTimers();

  const songs = SongStore.getBy(albumId);

  expect(mockListener).toHaveBeenCalledTimes(1);
  expect(songs[0].title).toEqual(SongStoreData[albumId].result.songs[0].title);
  expect(songs[5].title).toEqual(SongStoreData[albumId].result.songs[5].title);
});

it('allows to retrieve songs for other albums', () => {
  const albumId1 = 1;
  const albumId2 = 2;

  const mockListener = jest.fn();

  SongStore.addChangeListener(mockListener);

  getSongs(albumId1);
  getSongs(albumId2);

  jest.runAllTimers();

  const state = SongStore.get();
  const songs1 = SongStore.getBy(albumId1);
  const songs2 = SongStore.getBy(albumId2);

  expect(mockListener).toHaveBeenCalledTimes(2);

  expect(Object.keys(state.songs).length).toEqual(2);
  expect(songs1[0].title).toEqual(SongStoreData[albumId1].result.songs[0].title);
  expect(songs2[0].title).toEqual(SongStoreData[albumId2].result.songs[0].title);
});
