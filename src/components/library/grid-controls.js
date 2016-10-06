import React, { Component } from 'react';
import { Checkbox } from 'semantic-ui-react';

class GridControls extends Component {
  render() {
    return (
      <div>
        <Checkbox toggle label='Show seen' defaultChecked onChange={this.props.onShowSeenToggle} />
      </div>
    );
  }
}

export default GridControls;
