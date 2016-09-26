import React, { Component } from 'react';
import { Menu, Input } from 'stardust';
import { Link } from 'react-router';

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      activeItem: this.props.location.pathname
    };

    console.log('>>>', this.props);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu>
          <Menu.Item as={Link} to='/remote' name='/remote' content='Remote' active={activeItem === '/remote'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to='/movies' name='/movies' content='Movies' active={activeItem === '/movies'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to='/tvshows' name='/tvshows' content='TV Shows' active={activeItem === '/tvshows'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to='/music' name='/music' content='Music' active={activeItem === '/music'} onClick={this.handleItemClick} />
          <Menu.Item as={Link} to='/settings' name='/settings' content='Settings' active={activeItem === '/settings'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input className='icon' icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        {this.props.children}
      </div>
    );
  }
}

export default App;
