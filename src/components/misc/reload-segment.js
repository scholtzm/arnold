import React from 'react';
import { Segment, Button, Header } from 'stardust';
import BasicContainer from './basic-container.js';

const ReloadSegment = (props) => {
  return (
    <BasicContainer>
      <Segment textAlign='center'>
        <Header size='medium'>{props.message}</Header>
        <Button labeled icon='refresh' content='Reload' onClick={props.onClick} />
      </Segment>
    </BasicContainer>
  );
};

export default ReloadSegment;
