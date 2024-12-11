import React, { FC  } from 'react';
import style from '@/styles/product.module.scss';
import { getYearFromDate } from '@/hooks/getYearFromDate';

interface ProductBannerProps {
  stateisAuction: any;
  itemProduct: any;
  itemImages: any;
}

const ProductBanner: FC<ProductBannerProps> = ({
  stateisAuction,
  itemProduct,
  itemImages,
}) => {
  /**
   * Product Banner Hooks.
   */

  return (
    <div className={style.bannerTop}>
      <div className={style.bannerContainer}>
        <img src={itemImages?.url} alt={itemImages?.mimeType} style={{maxWidth: '100%', maxHeight: '100%'}}/>
        {stateisAuction === 'AUCTION' &&
          <div className={style.stateAuction}>
            <div className={style.auctionTitle}>на аукционе</div>
          </div>
        }
      </div>
      <div className={` ${style.showInfoImage} ${style.showInfoImageM} ` }>
        <div className={style.gridShowInfo}>
          <div className={style.infoTitle} style={{ width: 'max-content' }}>
            <span> {itemProduct?.name} </span>
          </div>
          <div className={`${style.mobileHidden} ${style.materialDiv}`}>
            <span className={style.spaceX}>{itemProduct?.material}</span>
            <span style={{ letterSpacing: '-2px' }} className={style.spaceX}>
              {' '}
              –––{' '}
            </span>
            <span className={style.spaceX}>
            {itemProduct?.height} x {itemProduct?.width} СМ.
            </span>
          </div>
          <div className={style.infoYear}>
            <span>{itemProduct.year && getYearFromDate(itemProduct.year)}</span>
          </div>
        </div>
        <div className={style.searchBottom} />
        <div className={`${style.mobileShow} `}>
          <span className={style.spaceX}>{itemProduct?.material}</span>
          {/* <span className={style.spaceX}> ---- </span> */}
          <span style={{margin: '0 5px'}} />
          <span className={style.spaceX}>
          {itemProduct?.height} x {itemProduct?.width} СМ.
          </span>
        </div>
      </div>
      {stateisAuction === 'AUCTION' && 
        <div className={style.stateAuctionM} style={{ marginBottom: '40px' }}>
          <div className={style.auctionTitleM}>на аукционе</div>
        </div>
      }
    </div>
  );
};

export default ProductBanner;
