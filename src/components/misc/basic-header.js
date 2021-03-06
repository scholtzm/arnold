import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const BasicHeader = (props) => (
  <Header as='h2'>
    <Icon name={props.icon} />
    <Header.Content>
      {props.text}
      <Header.Subheader>
        {props.subtext}
      </Header.Subheader>
    </Header.Content>
  </Header>
);

export default BasicHeader;
