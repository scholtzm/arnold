/**
 * Connect to dummy Kodi instance and retrieve raw JSON responses.
 */

const fs = require('fs');
const request = require('request');

const IP_ADDRESS = process.env.KODI_IP || 'localhost';
const PORT = process.env.KODI_PORT || 8080;

function getMovies(ipAdress, targetFile) {
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

  request({
    url: `http://${IP_ADDRESS}:${PORT}/jsonrpc?${method}`,
    method: 'POST',
    json: true,
    body: {
      jsonrpc: '2.0',
      id: 'Arnold',
      method,
      params
    }
  }, (err, res, body) => {
    if(err) {
      console.log('Failed to load movies from KODI', err);
      return;
    }

    body.result.movies = body.result.movies.map(movie => {
      movie.file = '/file/does/not/exist';
      return movie;
    });

    fs.writeFileSync(movieStoreDataFile, JSON.stringify(body, null, 2));
    console.log('Received mock data for movie library.');
  });
}

getMovies();
