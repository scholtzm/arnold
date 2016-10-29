import TvShowStore from '../tvshow-store.js';
import { setTvShows, getTvShowsError } from '../../actions/tvshow-actions.js';

const emptyState = {
  tvShows: [],
  lastFetchFailed: false
};

const dummyData1 = {
  tvShows: ['tvShow1', 'tvShow2'],
  lastFetchFailed: false
};

const dummyData2 = {
  tvShows: ['tvShow3', 'tvShow4'],
  lastFetchFailed: false
};

it('provides state', () => {
  const state = TvShowStore.get();
  expect(state).toEqual(emptyState);
});

it('tracks tv shows', () => {
  setTvShows(dummyData1.tvShows);

  const stateOld = TvShowStore.get();
  expect(stateOld).toEqual(dummyData1);

  setTvShows(dummyData2.tvShows);

  const stateNew = TvShowStore.get();
  expect(stateNew).toEqual(dummyData2);
});

it('emits change event', () => {
  const mockListener1 = jest.fn();
  const mockListener2 = jest.fn();

  TvShowStore.addChangeListener(mockListener1);
  TvShowStore.addChangeListener(mockListener2);

  setTvShows(dummyData1.tvShows);

  expect(mockListener1).toHaveBeenCalledTimes(1);
  expect(mockListener2).toHaveBeenCalledTimes(1);

  TvShowStore.removeChangeListener(mockListener2);

  setTvShows(dummyData1.tvShows);

  expect(mockListener1).toHaveBeenCalledTimes(2);
  expect(mockListener2).toHaveBeenCalledTimes(1);
});

it('tracks load errors', () => {
  getTvShowsError(new Error('Test'));

  const state = TvShowStore.get();
  expect(state.lastFetchFailed).toBe(true);
});
