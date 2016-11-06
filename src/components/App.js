import React, { Component } from 'react';
import { Menu, Label, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

import GlobalSearch from './misc/global-search.js';
import packageJson from '../../package.json';
import icon from '../static/image/icon-rounded.png';
import { isDemoMode } from '../util/env.js';

const { version, repository } = packageJson;
const releaseUrl = `${repository.url}/releases/tag/v${version}`;

class App extends Component {
  constructor(...args) {
    super(...args);

    const pathname = this.props.location.pathname.replace('/', '');
    const activeItem = pathname === ''
      ? 'remote'
      : pathname;

    this.state = {
      activeItem
    };
  }

  onItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    let demoLabel = null;
    if(isDemoMode) {
      demoLabel = (
        <Label as='a' href={repository.url} target='_blank' color='blue'>
          <Icon name='github' />
          Fork me on GitHub
        </Label>
      );
    }

    return (
      <div>
        <Menu>
          <Menu.Item>
            <img src={icon} alt='Arnold' />
            <Label as='a' href={releaseUrl} target='_blank' content={`v${version}`} color='green' />
            {demoLabel}
          </Menu.Item>
          <Menu.Item as={Link} to='remote' name='remote' content='Remote' active={activeItem === 'remote'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='movies' name='movies' content='Movies' active={activeItem === 'movies'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='tvshows' name='tvshows' content='TV Shows' active={activeItem === 'tvshows'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='music' name='music' content='Music' active={activeItem === 'music'} onClick={this.onItemClick} />
          <Menu.Item as={Link} to='settings' name='settings' content='Settings' active={activeItem === 'settings'} onClick={this.onItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <GlobalSearch />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        {this.props.children}
      </div>
    );
  }
}

export default App;
