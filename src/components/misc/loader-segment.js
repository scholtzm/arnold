import React from 'react';
import { Segment, Loader, Image } from 'stardust';

import dummyText from '../../static/image/short-paragraph.png';

const LoaderSegment = (props) => {
  return (
    <Segment>
      <div className='ui dimmer inverted active'>
        <Loader size={props.size}>Loading</Loader>
      </div>
      <Image src={dummyText} />
    </Segment>
  );
};

LoaderSegment.defaultProps = {
  size: 'massive'
};

export default LoaderSegment;
