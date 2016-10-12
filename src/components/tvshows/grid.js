import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import LoaderSegment from '../misc/loader-segment.js';
import ReloadSegment from '../misc/reload-segment.js';
import TvShowStore from '../../stores/tvshow-store.js';
import SettingsStore from '../../stores/settings-store.js';
import { getTvShows } from '../../actions/tvshow-actions.js';
import TvShowCard from './tvshow-card.js';
import TvShowDetail from './detail.js';

class TvShowGrid extends Component {

  constructor(props, context) {
    super(props, context);

    const settings = SettingsStore.get();
    const storeState = TvShowStore.get();

    this.state = {
      tvShows: storeState.tvShows,
      lastFetchFailed: false,
      loading: true,
      itemsPerPage: settings.itemsPerPage,
      itemsPerRow: settings.itemsPerRow,
      detailActive: false
    };

    this._onChange = this._onChange.bind(this);
  }

  _onChange() {
    const storeState = TvShowStore.get();

    this.setState({
      loading: false,
      tvShows: storeState.tvShows,
      lastFetchFailed: storeState.lastFetchFailed
    });
  }

  _onReload() {
    this.setState({
      loading: true
    });

    getTvShows();
  }

  _showDetail(tvShow) {
    this.setState({
      detailActive: true,
      detailTvShow: tvShow
    });
  }

  _hideDetail() {
    this.setState({
      detailActive: false
    });
  }

  componentDidMount() {
    TvShowStore.addChangeListener(this._onChange);

    if(this.state.tvShows.length > 0) {
      this.setState({loading: false});
    }

    getTvShows();
  }

  componentWillUnmount() {
    TvShowStore.removeChangeListener(this._onChange);
  }

  render() {
    if(this.state.loading) {
      return <LoaderSegment />;
    }

    if(!this.state.loading && this.state.lastFetchFailed === true && this.state.tvShows.length === 0) {
      return <ReloadSegment message='Failed to load TV shows' onClick={this._onReload.bind(this)} />
    }

    let detail;
    if(this.state.detailActive) {
      detail = <TvShowDetail active={this.state.detailActive} tvShow={this.state.detailTvShow} hide={() => this._hideDetail()} />;
    } else {
      detail = null;
    }

    return (
      <div>
        {detail}

        <Card.Group itemsPerRow={this.state.itemsPerRow}>
          {
            this.state.tvShows
              .filter(tvShow => this.props.showSeen || tvShow.playcount === 0)
              .map(tvShow => <TvShowCard key={tvShow.tvshowid} tvShow={tvShow} showDetail={() => this._showDetail(tvShow)} />)
          }
        </Card.Group>
      </div>
    )
  }

};

export default TvShowGrid;
