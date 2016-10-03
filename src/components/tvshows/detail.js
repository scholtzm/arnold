import React, { Component } from 'react';
import { Modal, Image, Button, Rating, Progress, Accordion, Icon } from 'stardust';
import PlayTvShowButton from './play-button.js';
import SeasonStore from '../../stores/season-store.js';
import EpisodeStore from '../../stores/episode-store.js';
import { getSeasons } from '../../actions/season-actions.js';
import { getEpisodes } from '../../actions/episode-actions.js';

class TvShowDetail extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      seasons: [],
      episodes: {}
    };

    this.activeSeason = 1;

    this._onSeasonsChange = this._onSeasonsChange.bind(this);
    this._onEpisodesChange = this._onEpisodesChange.bind(this);
  }

  _onTitleClick(event, index) {
    const season = index + 1;
    const { tvShow } = this.props;

    getEpisodes(tvShow.tvshowid, season);
    this.activeSeason = season;
  }

  _onSeasonsChange() {
    const { tvShow } = this.props;
    const seasons = SeasonStore.getBy(tvShow.tvshowid);

    this.setState({
      seasons
    });
  }

  _onEpisodesChange() {
    const { tvShow } = this.props;
    const episodes = EpisodeStore.getBy(tvShow.tvshowid, this.activeSeason);
    const newEpisodes = this.state.episodes;

    newEpisodes[this.activeSeason] = episodes;

    this.setState({
      episodes: newEpisodes
    });
  }

  componentDidMount() {
    const { tvShow } = this.props;
    SeasonStore.addChangeListener(this._onSeasonsChange);
    EpisodeStore.addChangeListener(this._onEpisodesChange);

    getSeasons(tvShow.tvshowid);
  }

  componentWillUnmount() {
    SeasonStore.removeChangeListener(this._onSeasonsChange);
    EpisodeStore.removeChangeListener(this._onEpisodesChange);
  }

  render() {
    const { tvShow } = this.props;
    const progress = Math.floor((tvShow.watchedepisodes / tvShow.episode) * 100);

    return (
      <Modal open={this.props.active} onClose={this.props.hide}>
        <Modal.Header>{tvShow.title} ({tvShow.year})</Modal.Header>
        <Modal.Content image>
          <Image wrapped bordered shape='rounded' className='medium' src={tvShow.thumbnail} />
          <Modal.Description>
            <div>{tvShow.plot}</div>
            <div style={{padding: '10px 0'}}>
              <div><b>Studio:</b> {tvShow.studio[0]}</div>
              <div><b>Year:</b> {tvShow.year}</div>
              <div><b>Rating:</b> {tvShow.rating.toFixed(1)} <Rating defaultRating={Math.round(tvShow.rating)} maxRating={10} icon='star' disabled /></div>
              <div>
                <b>Progress:</b> seen {tvShow.watchedepisodes} out of {tvShow.episode} episodes available in the library
                <Progress percent={progress} size='tiny' color='green' />
              </div>
              <div>
                <Accordion onTitleClick={(event, index) => this._onTitleClick(event, index)}>
                  {
                    this.state.seasons.map(season => {
                      return ([
                        <Accordion.Title>
                          <Icon name='dropdown' />
                          Season {season.season} ({season.episode} episode{season.episode === 1 ? '' : 's'})
                        </Accordion.Title>,
                        <Accordion.Content>
                          {
                            (this.state.episodes[season.season] || []).map(episode => {
                              return (
                                <span key={episode.episodeid}>{episode.title}</span>
                              )
                            })
                          }
                        </Accordion.Content>
                      ])
                    })
                  }
                </Accordion>
              </div>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <PlayTvShowButton tvShow={tvShow} />
          <Button color='black' onClick={this.props.hide}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

}

export default TvShowDetail;
