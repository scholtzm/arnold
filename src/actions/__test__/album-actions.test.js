import testSettings from './test-settings.js';
import { getAlbums } from '../album-actions.js';
import AlbumStore from '../../stores/album-store.js';
import { setSettings } from '../settings-actions.js';
import AlbumStoreData from '../../../data/AlbumStoreData.json';
import { init } from '../../rpc/flux-listeners.js';

jest.useFakeTimers();

beforeAll(() => {
  init();
  setSettings(testSettings);
});

it('allows to retrieve albums', () => {
  const mockListener = jest.fn();

  AlbumStore.addChangeListener(mockListener);

  getAlbums();

  jest.runAllTimers();

  const albums = AlbumStore.get().albums;

  expect(mockListener).toHaveBeenCalledTimes(1);
  expect(albums[0].title).toEqual(AlbumStoreData.result.albums[0].title);
  expect(albums[1].title).toEqual(AlbumStoreData.result.albums[1].title);
});
