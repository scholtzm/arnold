import React from 'react';
import { Segment, Loader, Image } from 'stardust';

import dummyText from '../../static/image/dummy-text.png';

const LoaderSegment = () => {
  return (
    <Segment>
      <div className='ui dimmer active'>
        <Loader size='massive'>Loading</Loader>
      </div>
      <Image src={dummyText} />
    </Segment>
  );
};

export default LoaderSegment;
