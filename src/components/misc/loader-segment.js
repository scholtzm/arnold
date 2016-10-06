import React from 'react';
import { Segment, Loader, Image } from 'semantic-ui-react';

import shortParagraph from '../../static/image/short-paragraph.png';
import longParagraph from '../../static/image/long-paragraph.png';

const LoaderSegment = (props) => {
  const { size } = props;
  let image;

  switch(size) {
    case 'mini':
    case 'tiny':
    case 'small':
    case 'medium':
      image = shortParagraph;
      break;
    default:
      image = longParagraph;
      break;
  }

  return (
    <Segment>
      <div className='ui dimmer inverted active'>
        <Loader size={props.size}>Loading</Loader>
      </div>
      <Image src={image} />
    </Segment>
  );
};

LoaderSegment.defaultProps = {
  size: 'massive'
};

export default LoaderSegment;
