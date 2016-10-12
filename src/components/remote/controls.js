import React, { Component } from 'react';
import { Grid, Container, Button, Header } from 'semantic-ui-react';

import debug from '../../util/debug.js';
// import input from '../../ajax/input.js';
import input from '../../ws/input.js';
import videoLibrary from '../../ajax/video-library.js';
import audioLibrary from '../../ajax/audio-library.js';
import player from '../../ajax/player.js';
import application from '../../ajax/application.js';

const logger = debug('component:controls');

class Controls extends Component {

  _callInput(inputMethod) {
    input[inputMethod]((err, res) => {
      if(err) {
        logger(err, res);
      }
    });
  }

  _callVideoLibrary(methodName) {
    videoLibrary[methodName]((err, res) => {
      if(err) {
        logger(err, res);
      }
    });
  }

  _callAudioLibrary(methodName) {
    audioLibrary[methodName]((err, res) => {
      if(err) {
        logger(err, res);
      }
    });
  }

  _callPlayer(methodName) {
    player[methodName]((err, res) => {
      if(err) {
        logger(err, res);
      }
    });
  }

  _callApplication(methodName, param = null) {
    const cb = (err, res) => {
      if(err) {
        logger(err, res);
      }
    }

    if(param) {
      application[methodName](param, cb);
    } else {
      application[methodName](cb);
    }
  }

  render() {
    return (
      <Container text>
        <Grid>
          <Grid.Row columns={3} textAlign='center'>
            <Grid.Column>
              <div><Button icon='arrow up' onClick={() => this._callInput('up')} /></div>
              <div style={{margin: '5px 0'}}>
                <Button icon='arrow left' onClick={() => this._callInput('left')} />
                <Button icon='selected radio' color='green' onClick={() => this._callInput('select')} />
                <Button icon='arrow right' onClick={() => this._callInput('right')} />
              </div>
              <div><Button icon='arrow down' onClick={() => this._callInput('down')} /></div>
              <div style={{paddingTop: '10px'}}>
                <Button content='Home' onClick={() => this._callInput('home')} />
                {' '}
                <Button content='Back' onClick={() => this._callInput('back')} />
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header as='h5'>Playback</Header>
              <div style={{paddingTop: '5px'}}>
                <Button.Group color='blue'>
                  <Button icon='play' onClick={() => this._callPlayer('playPause')} />
                  <Button icon='pause' onClick={() => this._callPlayer('playPause')} />
                  <Button icon='stop' onClick={() => this._callPlayer('stop')} />
                </Button.Group>
              </div>
              <div style={{paddingTop: '5px'}}>
                <Button.Group basic>
                  <Button icon='volume down' onClick={() => this._callApplication('setVolume', 'decrement')} />
                  <Button icon='volume off' onClick={() => this._callApplication('setMute')} />
                  <Button icon='volume up' onClick={() => this._callApplication('setVolume', 'increment')} />
                </Button.Group>
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header as='h5'>Video Library</Header>
              <div style={{paddingTop: '5px'}}>
                <Button content='Scan' onClick={() => this._callVideoLibrary('scan')} />
                {' '}
                <Button content='Clean' onClick={() => this._callVideoLibrary('clean')} />
              </div>
              <Header as='h5'>Audio Library</Header>
              <div style={{paddingTop: '5px'}}>
                <Button content='Scan' onClick={() => this._callAudioLibrary('scan')} />
                {' '}
                <Button content='Clean' onClick={() => this._callAudioLibrary('clean')} />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

}

export default Controls;
