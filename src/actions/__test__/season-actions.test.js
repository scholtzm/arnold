import testSettings from './test-settings.js';
import { getSeasons } from '../season-actions.js';
import SeasonStore from '../../stores/season-store.js';
import { setSettings } from '../settings-actions.js';
import SeasonStoreData from '../../../data/SeasonStoreData.json';
import { init } from '../../rpc/flux-listeners.js';

jest.useFakeTimers();

beforeAll(() => {
  init();
  setSettings(testSettings);
});

it('allows to retrieve seasons', () => {
  const tvShowId = 1;
  const mockListener = jest.fn();

  SeasonStore.addChangeListener(mockListener);

  getSeasons(tvShowId);

  jest.runAllTimers();

  const seasons = SeasonStore.getBy(tvShowId);

  expect(mockListener).toHaveBeenCalledTimes(1);
  expect(seasons[0].label).toEqual(SeasonStoreData[tvShowId].result.seasons[0].label);
  expect(seasons[3].label).toEqual(SeasonStoreData[tvShowId].result.seasons[3].label);
});

it('allows to retrieve seasons for other tv shows', () => {
  const tvShowId1 = 1;
  const tvShowId2 = 2;

  const mockListener = jest.fn();

  SeasonStore.addChangeListener(mockListener);

  getSeasons(tvShowId1);
  getSeasons(tvShowId2);

  jest.runAllTimers();

  const state = SeasonStore.get();
  const seasons1 = SeasonStore.getBy(tvShowId1);
  const seasons2 = SeasonStore.getBy(tvShowId2);

  expect(mockListener).toHaveBeenCalledTimes(2);

  expect(Object.keys(state.seasons).length).toEqual(2);
  expect(seasons1[0].label).toEqual(SeasonStoreData[tvShowId1].result.seasons[0].label);
  expect(seasons2[0].label).toEqual(SeasonStoreData[tvShowId2].result.seasons[0].label);
});
