import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { omit } from 'lodash';

import { addNotification } from '../../actions/notification-actions.js';

class ActionButton extends Component {
  state = { loading: false }

  _onAction() {
    this.setState({ loading: true });

    const { asyncAction, asyncActionArguments } = this.props;

    let args = asyncActionArguments || [];
    args.push((err, res) => {
      this.setState({ loading: false });
    });

    asyncAction(...args);
  }

  render() {
    const rest = omit(this.props, ['asyncAction', 'asyncActionArguments', 'onClick', 'loading']);

    return (
      <Button loading={this.state.loading} onClick={this._onAction.bind(this)} {...rest} />
    );
  }
}

export default ActionButton;
