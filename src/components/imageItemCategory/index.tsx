
import React, { FC } from 'react';

interface ImageItemCategoryProps {
    itemId: string;
} 

const ImageItemCategory: FC<ImageItemCategoryProps> = ({ itemId }) => {

    return (
      <svg
        aria-hidden='true'
        style={{
          position: 'absolute',
          width: '0',
          height: '0',
          overflow: 'hidden',
        }}
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
      >
        <defs>
          <filter
            id={itemId as string}
            x='-10%'
            y='-10%'
            width='120%'
            height='120%'
            filterUnits='objectBoundingBox'
            primitiveUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feColorMatrix
              type='matrix'
              values='.33 .33 .33 0 0
                                      .33 .33 .33 0 0
                                      .33 .33 .33 0 0
                                      0 0 0 1 0'
              in='SourceGraphic'
              result='colormatrix'
            />
            <feComponentTransfer in='colormatrix' result='componentTransfer'>
              <feFuncR type='table' tableValues='0.84 1' />
              <feFuncG type='table' tableValues='0.05 0.94' />
              <feFuncB type='table' tableValues='0.37 0.61' />
              <feFuncA type='table' tableValues='0 1' />
            </feComponentTransfer>
            <feBlend
              mode='normal'
              in='componentTransfer'
              in2='SourceGraphic'
              result='blend'
            />
          </filter>
        </defs>
      </svg>
    );
  };

  export default ImageItemCategory;
