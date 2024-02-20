import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { api } from '../../api/api';

export default function ImageMagnify({ src, width, height  }) {
  return (
    
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            
            src: src,
            height:height,  
            width:width
          },
          largeImage: {
            src: src,
            width: 1300,
            height: 1800,
       
          },
          isHintEnabled: false,
          enlargedImageContainerDimensions: {
            width: '150%',  
            height: '100%', 
          },
         
        }}
      />
  );
}
