import EpisodeStore from '../episode-store.js';
import { setEpisodes } from '../../actions/episode-actions.js';

const emptyState = {
  episodes: {}
};

const dummyData1Episodes = [
  { tvshowid: 123, season: 1, foo: 'bar' },
];

const dummyData1 = {
  episodes: {
    123: {
      1: dummyData1Episodes
    }
  }
};

const dummyData2Episodes = [
  { tvshowid: 456, season: 2, ban: 'ana' },
];

const dummyData2 = {
  episodes: {
    123: {
      1: dummyData1Episodes
    },
    456: {
      2: dummyData2Episodes
    }
  }
};

const dummyData3Episodes = [
  { tvshowid: 456, season: 2, overriden: 'value' },
];

const dummyData3 = {
  episodes: {
    123: {
      1: dummyData1Episodes
    },
    456: {
      2: dummyData3Episodes
    }
  }
};

it('provides state', () => {
  const state = EpisodeStore.get();
  expect(state).toEqual(emptyState);
});

it('tracks episodes', () => {
  setEpisodes(dummyData1Episodes);

  const state1 = EpisodeStore.get();
  expect(state1).toEqual(dummyData1);

  setEpisodes(dummyData2Episodes);

  const state2 = EpisodeStore.get();
  expect(state2).toEqual(dummyData2);

  setEpisodes(dummyData3Episodes);

  const state3 = EpisodeStore.get();
  expect(state3).toEqual(dummyData3);
});

it('provides episodes by tvshowid', () => {
  setEpisodes(dummyData1Episodes);
  setEpisodes(dummyData2Episodes);

  const episodes = EpisodeStore.getByTvShow(123);
  expect(episodes).toEqual({1: dummyData1Episodes});
});

it('provides episodes by tvshowid and season number', () => {
  setEpisodes(dummyData1Episodes);
  setEpisodes(dummyData2Episodes);

  const episodes = EpisodeStore.getByTvShowAndSeason(456, 2);
  expect(episodes).toEqual(dummyData2Episodes);
});

it('emits change event', () => {
  const mockListener1 = jest.fn();
  const mockListener2 = jest.fn();

  EpisodeStore.addChangeListener(mockListener1);
  EpisodeStore.addChangeListener(mockListener2);

  setEpisodes(dummyData1Episodes);

  expect(mockListener1).toHaveBeenCalledTimes(1);
  expect(mockListener2).toHaveBeenCalledTimes(1);

  EpisodeStore.removeChangeListener(mockListener2);

  setEpisodes(dummyData2Episodes);

  expect(mockListener1).toHaveBeenCalledTimes(2);
  expect(mockListener2).toHaveBeenCalledTimes(1);
});
