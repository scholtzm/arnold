/**
 * Connect to dummy Kodi instance and retrieve raw JSON responses.
 */

const fs = require('fs');
const rp = require('request-promise');

const IP_ADDRESS = process.env.KODI_IP || 'localhost';
const PORT = process.env.KODI_PORT || 8080;

function makeRequest(method, params) {
  return rp({
      url: `http://${IP_ADDRESS}:${PORT}/jsonrpc?${method}`,
      method: 'POST',
      json: true,
      body: {
        jsonrpc: '2.0',
        id: 'ArnoldMockScraper',
        method,
        params
      }
    })
}

function catchError(err) {
  console.log(err.message);
}

function getMovies() {
  const movieStoreDataFile = '../data/MovieStoreData.json';

  const method = 'VideoLibrary.GetMovies';
  const params = {
    limits: {
      start: 0,
    },
    properties: [
      'genre',
      'director',
      'trailer',
      'tagline',
      'plot',
      'plotoutline',
      'title',
      'originaltitle',
      'lastplayed',
      'runtime',
      'year',
      'playcount',
      'rating',
      'thumbnail',
      'file'
    ],
    sort: {
      method: 'sorttitle',
      ignorearticle: true
    }
  };

  makeRequest(method, params)
    .then((body) => {
      body.result.movies = body.result.movies.map(movie => {
        movie.file = '';
        return movie;
      });

      fs.writeFileSync(movieStoreDataFile, JSON.stringify(body));
      console.log('Received mock data for movie library.');
    })
    .catch(catchError);
}

function getTvShows() {
  const tvShowStoreDataFile = '../data/TvShowStoreData.json';
  const seasonStoreDataFile = '../data/SeasonStoreData.json';
  const episodeStoreDataFile = '../data/EpisodeStoreData.json';

  const method = 'VideoLibrary.GetTVShows';
  const params = {
    properties: [
      'genre',
      'plot',
      'title',
      'lastplayed',
      'episode',
      'year',
      'playcount',
      'rating',
      'thumbnail',
      'studio',
      'mpaa',
      'premiered',
      'episodeguide',
      'watchedepisodes'
    ]
  };

  makeRequest(method, params)
    .then((body) => {
      fs.writeFileSync(tvShowStoreDataFile, JSON.stringify(body));
      console.log('Received mock data for TV show library.');

      const seasonPromises = body.result.tvshows.map(tvshow => {
        return getSeasons(tvshow.tvshowid);
      });

      return Promise.all(seasonPromises)
    })
    .then(results => {
      const seasons = {};

      results.forEach(result => {
        const tvshowid = result.result.seasons[0].tvshowid;
        seasons[tvshowid] = result;
      });

      fs.writeFileSync(seasonStoreDataFile, JSON.stringify(seasons));
      console.log('Received mock data for seasons.');

      const episodePromises = [];
      results.forEach(result => {
        result.result.seasons.forEach(season => {
          episodePromises.push(getEpisodes(season.tvshowid, season.season));
        });
      });

      return Promise.all(episodePromises)
    })
    .then(results => {
      const episodes = {};

      results.forEach(result => {
        const id = result.result.episodes[0].tvshowid + '_' + result.result.episodes[0].season;
        episodes[id] = result;
      });

      fs.writeFileSync(episodeStoreDataFile, JSON.stringify(episodes));
      console.log('Received mock data for episodes.');
    })
    .catch(catchError);
}

function getSeasons(tvshowid) {
  const method = 'VideoLibrary.GetSeasons';
  const params = {
    tvshowid,
    properties: [
      'season',
      'showtitle',
      'playcount',
      'episode',
      'thumbnail',
      'fanart',
      'tvshowid'
    ]
  };

  return makeRequest(method, params);
}

function getEpisodes(tvshowid, season) {
  const method = 'VideoLibrary.GetEpisodes';
  const params = {
    tvshowid,
    season,
    properties: [
      'title',
      'thumbnail',
      'plot',
      'episode',
      'season',
      'tvshowid',
      'playcount'
    ]
  };

  return makeRequest(method, params);
}

getMovies();
getTvShows();
