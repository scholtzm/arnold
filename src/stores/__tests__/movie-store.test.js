import MovieStore from '../movie-store.js';
import { setMovies, getMoviesError } from '../../actions/movie-actions.js';

const emptyState = {
  movies: [],
  lastFetchFailed: false
};

const dummyData1 = {
  movies: ['movie1', 'movie2'],
  lastFetchFailed: false
};

const dummyData2 = {
  movies: ['movie3', 'movie4'],
  lastFetchFailed: false
};

it('provides state', () => {
  const state = MovieStore.get();
  expect(state).toEqual(emptyState);
});

it('tracks movies', () => {
  setMovies(dummyData1.movies);

  const stateOld = MovieStore.get();
  expect(stateOld).toEqual(dummyData1);

  setMovies(dummyData2.movies);

  const stateNew = MovieStore.get();
  expect(stateNew).toEqual(dummyData2);
});

it('emits change event', () => {
  const mockListener1 = jest.fn();
  const mockListener2 = jest.fn();

  MovieStore.addChangeListener(mockListener1);
  MovieStore.addChangeListener(mockListener2);

  setMovies(dummyData1.movies);

  expect(mockListener1).toHaveBeenCalledTimes(1);
  expect(mockListener2).toHaveBeenCalledTimes(1);

  MovieStore.removeChangeListener(mockListener2);

  setMovies(dummyData1.movies);

  expect(mockListener1).toHaveBeenCalledTimes(2);
  expect(mockListener2).toHaveBeenCalledTimes(1);
});

it('tracks load errors', () => {
  getMoviesError(new Error('Test'));

  const state = MovieStore.get();
  expect(state.lastFetchFailed).toBe(true);
});
