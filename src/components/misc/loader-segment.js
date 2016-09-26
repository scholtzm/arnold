import React from 'react';
import { Segment, Loader, Image } from 'stardust';
import BasicContainer from './basic-container.js';

import dummyText from '../../static/image/dummy-text.png';

const LoaderSegment = () => {
  return (
    <BasicContainer>
      <Segment>
        <div className='ui dimmer active'>
          <Loader size='massive'>Loading</Loader>
        </div>
        <Image src={dummyText} />
      </Segment>
    </BasicContainer>
  );
};

export default LoaderSegment;
