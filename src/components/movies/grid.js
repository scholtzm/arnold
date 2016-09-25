import React, { Component } from 'react'
import { Card, Menu, Container } from 'stardust'

import LoaderSegment from '../misc/loader-segment.js';
import MovieStore from '../../stores/movie-store.js';
import { getMovies } from '../../actions/movie-actions.js';
import MovieCard from './movie-card.js';
import MovieDetail from './detail.js';

class MovieGrid extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      movies: MovieStore.getAll(),
      loading: true,
      page: '1',
      pageSize: 50,
      detailActive: false
    };

    this.onChange = this._onChange.bind(this);
  }

  _onChange() {
    this.setState({
      loading: false,
      movies: MovieStore.getAll()
    });
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
    MovieStore.addChangeListener(this.onChange);

    if(this.state.movies.length > 0) {
      this.setState({loading: false});
    }

    getMovies();
  }

  componentWillUnmount() {
    MovieStore.removeChangeListener(this.onChange);
  }

  render() {
    if(this.state.loading) {
      return <LoaderSegment />;
    }

    const paginationItemCount = Math.ceil(this.state.movies.length / this.state.pageSize);

    let paginationItems = [];
    for(let i = 1; i <= paginationItemCount; i++) {
      paginationItems.push(<Menu.Item key={i.toString()} name={i.toString()} active={this.state.page === i.toString()} onClick={this._paginate.bind(this)} />)
    }

    let movieItems = [];
    const low = (this.state.page - 1) * this.state.pageSize;
    const high = Math.min(this.state.movies.length -1, low + this.state.pageSize);

    for(let i = low; i < high; i++) {
      let movie = this.state.movies[i];
      movieItems.push(<MovieCard key={movie.movieid} movie={movie} showDetail={() => this._showDetail(movie)} />);
    }

    return (
      <Container fluid>
        <MovieDetail active={this.state.detailActive} movie={this.state.detailMovie} hide={this._hideDetail.bind(this)}/>

        <Card.Group itemsPerRow={8}>
          {movieItems}
        </Card.Group>
          {/* <Menu pagination>
            {paginationItems}
          </Menu> */}
      </Container>
    )
  }

};

export default MovieGrid;
