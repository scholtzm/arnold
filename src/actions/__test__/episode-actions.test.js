import testSettings from './test-settings.js';
import { getEpisodes } from '../episode-actions.js';
import EpisodeStore from '../../stores/episode-store.js';
import { setSettings } from '../settings-actions.js';
import EpisodeStoreData from '../../../data/EpisodeStoreData.json';
import { init } from '../../rpc/flux-listeners.js';

jest.useFakeTimers();

beforeAll(() => {
  init();
  setSettings(testSettings);
});

it('allows to retrieve episodes', () => {
  const tvShowId = 1;
  const seasonId = 1;
  const identifier = `${tvShowId}_${seasonId}`;
  const mockListener = jest.fn();

  EpisodeStore.addChangeListener(mockListener);

  getEpisodes(tvShowId, seasonId);

  jest.runAllTimers();

  const episodes = EpisodeStore.getByTvShowAndSeason(tvShowId, seasonId);

  expect(mockListener).toHaveBeenCalledTimes(1);
  expect(episodes[0].label).toEqual(EpisodeStoreData[identifier].result.episodes[0].label);
  expect(episodes[3].label).toEqual(EpisodeStoreData[identifier].result.episodes[3].label);
});

it('allows to retrieve seasons for other tv shows', () => {
  const tvShowId1 = 1;
  const seasonId1 = 1;
  const identifier1 = `${tvShowId1}_${seasonId1}`;

  const tvShowId2 = 3;
  const seasonId2 = 3;
  const identifier2 = `${tvShowId2}_${seasonId2}`;

  const mockListener = jest.fn();

  EpisodeStore.addChangeListener(mockListener);

  getEpisodes(tvShowId1, seasonId1);
  getEpisodes(tvShowId2, seasonId2);

  jest.runAllTimers();

  const state = EpisodeStore.get();
  const episodes1 = EpisodeStore.getByTvShowAndSeason(tvShowId1, seasonId1);
  const episodes2 = EpisodeStore.getByTvShowAndSeason(tvShowId2, seasonId2);

  expect(mockListener).toHaveBeenCalledTimes(2);

  expect(Object.keys(state.episodes).length).toEqual(2);
  expect(Object.keys(state.episodes[tvShowId1][seasonId1]).length).toEqual(EpisodeStoreData[identifier1].result.episodes.length);
  expect(Object.keys(state.episodes[tvShowId2][seasonId2]).length).toEqual(EpisodeStoreData[identifier2].result.episodes.length);

  expect(episodes1[0].label).toEqual(EpisodeStoreData[identifier1].result.episodes[0].label);
  expect(episodes2[0].label).toEqual(EpisodeStoreData[identifier2].result.episodes[0].label);
});
