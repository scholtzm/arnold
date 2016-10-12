import React from 'react';
import { Segment, Button, Header } from 'semantic-ui-react';

const ReloadSegment = (props) => {
  return (
    <Segment textAlign='center'>
      <Header size='medium'>{props.message}</Header>
      <Button icon='refresh' content='Reload' labelPosition='left' onClick={props.onClick} />
    </Segment>
  );
};

export default ReloadSegment;
