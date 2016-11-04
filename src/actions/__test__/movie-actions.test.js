import testSettings from './test-settings.js';
import { getMovies } from '../movie-actions.js';
import MovieStore from '../../stores/movie-store.js';
import { setSettings } from '../settings-actions.js';
import MovieStoreData from '../../../data/MovieStoreData.json';
import { init } from '../../rpc/flux-listeners.js';

jest.useFakeTimers();

beforeAll(() => {
  init();
  setSettings(testSettings);
});

it('allows to retrieve movies', () => {
  const mockListener = jest.fn();

  MovieStore.addChangeListener(mockListener);

  getMovies();

  jest.runAllTimers();

  const movies = MovieStore.get().movies;

  expect(mockListener).toHaveBeenCalledTimes(1);
  expect(movies[0].title).toEqual(MovieStoreData.result.movies[0].title);
  expect(movies[10].title).toEqual(MovieStoreData.result.movies[10].title);
});
