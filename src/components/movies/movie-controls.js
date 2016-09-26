import React, { Component } from 'react';
import { Checkbox } from 'stardust';

class MovieControls extends Component {
  render() {
    return (
      <div>
        <Checkbox toggle label='Show seen' defaultChecked onChange={this.props.onShowSeenToggle} />
      </div>
    );
  }
}

export default MovieControls;
