import React, { useState } from 'react';
import styles from '@/styles/catalog.module.scss';
import { ICatalogItem } from '@/pages/catalog';
import { getYearFromDate } from '@/hooks/getYearFromDate';
import CatalogItem from '@/components/catalog-data/catalog-item';

interface ICatalogDataRow {
  chunk: ICatalogItem[];
  index: number;
}

const CatalogDataRow = ({ chunk }: ICatalogDataRow) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverShowInfo, setHoverShowInfo] = useState<ICatalogItem | null>(null);

  const handleHoverOnImage = (item: any, index: number) => {
    setHoveredIndex(index);
    setHoverShowInfo(item);
  };

  return (
    <div className={styles.rowContainer}>
      <div className={styles.imagesRow}>
        {chunk.map((item, chunkIndex) => 
          <CatalogItem
            item={item}
            chunkIndex={chunkIndex}
            key={chunkIndex}
            handleHoverOnImage={handleHoverOnImage}
            setHoveredIndex={setHoveredIndex}
          />
        )}
      </div>
      {hoverShowInfo?.index === hoveredIndex && 
        <div className={styles.showInfoImage}>
          <div className={styles.flexBetween2}>
            <span className={styles.spaceXHeader}> {hoverShowInfo?.name} </span>
            <div className={styles.flexBetween3}>
              {hoverShowInfo.material && 
                <span className={styles.spaceXMaterial}>
                  {hoverShowInfo.material}
                </span>
              }
              {hoverShowInfo.material &&
                hoverShowInfo.height &&
                hoverShowInfo.width && 
                  <span className={styles.spaceXDashes}> ––– </span>
                }
              {hoverShowInfo.height && hoverShowInfo.width && 
                <>
                  <span className={styles.spaceXMaterial}>
                     {hoverShowInfo.height} X {hoverShowInfo.width} см.
                  </span>
                </>
              }
            </div>
            <span>
              {hoverShowInfo?.year && getYearFromDate(hoverShowInfo.year)}
            </span>
          </div>
          <div className={styles.searchBottom} />
        </div>
      }
    </div>
  );
};

export default CatalogDataRow;
