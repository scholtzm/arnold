import React from 'react';
import { Segment, Button, Header } from 'stardust';

const ReloadSegment = (props) => {
  return (
    <Segment textAlign='center'>
      <Header size='medium'>{props.message}</Header>
      <Button labeled icon='refresh' content='Reload' onClick={props.onClick} />
    </Segment>
  );
};

export default ReloadSegment;
