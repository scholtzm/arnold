import testSettings from './test-settings.js';
import { getTvShows } from '../tvshow-actions.js';
import TvShowStore from '../../stores/tvshow-store.js';
import { setSettings } from '../settings-actions.js';
import TvShowStoreData from '../../../data/TvShowStoreData.json';
import { init } from '../../rpc/flux-listeners.js';

jest.useFakeTimers();

beforeAll(() => {
  init();
  setSettings(testSettings);
});

it('allows to retrieve tv shows', () => {
  const mockListener = jest.fn();

  TvShowStore.addChangeListener(mockListener);

  getTvShows();

  jest.runAllTimers();

  const tvShows = TvShowStore.get().tvShows;

  expect(mockListener).toHaveBeenCalledTimes(1);
  expect(tvShows[0].title).toEqual(TvShowStoreData.result.tvshows[0].title);
  expect(tvShows[1].title).toEqual(TvShowStoreData.result.tvshows[1].title);
});
