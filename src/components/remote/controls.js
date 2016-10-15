import React, { Component } from 'react';
import { Grid, Container, Button, Header } from 'semantic-ui-react';

import ActionButton from '../../components/misc/action-button.js';
import input from '../../ws/input.js';
import videoLibrary from '../../ws/video-library.js';
import audioLibrary from '../../ws/audio-library.js';
import player from '../../ws/player.js';
import application from '../../ws/application.js';

class Controls extends Component {

  render() {
    return (
      <Container text>
        <Grid>
          <Grid.Row columns={3} textAlign='center'>
            <Grid.Column>
              <div><ActionButton icon='arrow up' asyncAction={input.up} /></div>
              <div style={{margin: '5px 0'}}>
                <ActionButton icon='arrow left' asyncAction={input.left} />
                <ActionButton icon='selected radio' color='green' asyncAction={input.select} />
                <ActionButton icon='arrow right' asyncAction={input.right} />
              </div>
              <div><ActionButton icon='arrow down' asyncAction={input.down} /></div>
              <div style={{paddingTop: '10px'}}>
                <ActionButton content='Home' asyncAction={input.home} />
                {' '}
                <ActionButton content='Back' asyncAction={input.back} />
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header as='h5'>Playback</Header>
              <div style={{paddingTop: '5px'}}>
                <Button.Group color='blue'>
                  <ActionButton icon='play' asyncAction={player.playPause} />
                  <ActionButton icon='pause' asyncAction={player.playPause} />
                  <ActionButton icon='stop' asyncAction={player.stop} />
                </Button.Group>
              </div>
              <div style={{paddingTop: '5px'}}>
                <Button.Group basic>
                  <ActionButton icon='volume down' asyncAction={application.setVolume} asyncActionArguments={['decrement']} />
                  <ActionButton icon='volume off' asyncAction={application.setMute} />
                  <ActionButton icon='volume up' asyncAction={application.setVolume} asyncActionArguments={['increment']} />
                </Button.Group>
              </div>
            </Grid.Column>
            <Grid.Column>
              <Header as='h5'>Video Library</Header>
              <div style={{paddingTop: '5px'}}>
                <ActionButton content='Scan' asyncAction={videoLibrary.scan} />
                {' '}
                <ActionButton content='Clean' asyncAction={videoLibrary.clean} />
              </div>
              <Header as='h5'>Audio Library</Header>
              <div style={{paddingTop: '5px'}}>
                <ActionButton content='Scan' asyncAction={audioLibrary.scan} />
                {' '}
                <ActionButton content='Clean' asyncAction={audioLibrary.clean} />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }

}

export default Controls;
