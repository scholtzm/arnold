import React, { Component } from 'react'
import { Card } from 'stardust'

import LoaderSegment from '../misc/loader-segment.js';
import ReloadSegment from '../misc/reload-segment.js';
import MovieStore from '../../stores/movie-store.js';
import SettingsStore from '../../stores/settings-store.js';
import { getMovies } from '../../actions/movie-actions.js';
import MovieCard from './movie-card.js';
import MovieDetail from './detail.js';

class MovieGrid extends Component {

  constructor(props, context) {
    super(props, context);

    const settings = SettingsStore.get();
    const storeState = MovieStore.get();

    this.state = {
      movies: storeState.movies,
      lastFetchFailed: false,
      loading: true,
      itemsPerPage: settings.itemsPerPage,
      itemsPerRow: settings.itemsPerRow,
      detailActive: false
    };

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    const storeState = MovieStore.get();

    this.setState({
      loading: false,
      movies: storeState.movies,
      lastFetchFailed: storeState.lastFetchFailed
    });
  }

  _onReload() {
    this.setState({
      loading: true
    });

    getMovies();
  }

  _showDetail(movie) {
    this.setState({
      detailActive: true,
      detailMovie: movie
    });
  }

  _hideDetail() {
    this.setState({
      detailActive: false
    });
  }

  _paginate(e, { name }) {
    this.setState({page: name})
  }

  componentDidMount() {
    MovieStore.addChangeListener(this._onChange);

    if(this.state.movies.length > 0) {
      this.setState({loading: false});
    }

    getMovies();
  }

  componentWillUnmount() {
    MovieStore.removeChangeListener(this._onChange);
  }

  render() {
    if(this.state.loading) {
      return <LoaderSegment />;
    }

    if(!this.state.loading && this.state.lastFetchFailed === true) {
      return <ReloadSegment message='Failed to load movies' onClick={this._onReload.bind(this)} />
    }

    return (
      <div>
        <MovieDetail active={this.state.detailActive} movie={this.state.detailMovie} hide={this._hideDetail.bind(this)}/>

        <Card.Group itemsPerRow={this.state.itemsPerRow}>
          {
            this.state.movies
              .filter(movie => this.props.showSeen || movie.playcount === 0)
              .map(movie => <MovieCard key={movie.movieid} movie={movie} showDetail={() => this._showDetail(movie)} />)
          }
        </Card.Group>
      </div>
    )
  }

};

export default MovieGrid;
