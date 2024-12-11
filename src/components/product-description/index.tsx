import React, { FC, useEffect, useState } from 'react';
import style from '@/styles/product.module.scss';

interface ProductDescriptionProps {
  itemProduct: any;
  handleOpenReqestModal: () => void;
  stateisAuction: any;
}

const ProductDescription: FC<ProductDescriptionProps> = ({
  itemProduct,
  stateisAuction,
  handleOpenReqestModal,
}) => {
  /**
   *  Product Description Hooks.
   */

  const [gicleMiddlePrice, setGicleMiddlePrice] = useState<any>(null);

  const zero = 0;
  const one = 1;
  const two = 2;
  const showPrice = stateisAuction === 'AVAILABLE' || stateisAuction === null;

  const filterGicles = itemProduct?.gicles;
  // eslint-disable-next-line no-shadow
  const allPrices = filterGicles.flatMap((item: { variants: any[] }) =>
    item.variants.map((variant: { price: any }) => variant.price)
  );
  const minPrice = Math.min(...allPrices);

  if(gicleMiddlePrice){
    
  }

  useEffect(() => {
    if (filterGicles && filterGicles.length > 0) {
      const variantsArray = filterGicles.flatMap(
        (giclee: { variants: any }) => giclee.variants
      );

      const prices = variantsArray.map(
        (variant: { price: any }) => variant.price
      );
     
      const calculateMedian = (numbers: number[]): number => {
        if (numbers.length === zero) return 0;

        const sorted = [...numbers].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / two);

        return sorted.length % two === zero
          ? (sorted[mid - one] + sorted[mid]) / two
          : sorted[mid];
      };

      const medianPrice = calculateMedian(prices);

      setGicleMiddlePrice(medianPrice);
    } else {
    }
  }, [filterGicles]);

  return (
    <div className={style.descriptionInfo}>
      <div className={style.infoParagraph} style={{ paddingTop: 0 }}>
        <div className={style.infoText}>
          {itemProduct?.description && 
            <div
              dangerouslySetInnerHTML={{ __html: itemProduct?.description }}
            />
          }
        </div>
      </div>
      {showPrice && 
        <div className={style.infoParagraph}>

          <p className={style.flexRow}>
            <span className={style.infoText}>
              {' '}
              Оригинал в наличии
            </span>
            {/* <span className={style.priceText}>{itemProduct?.price} ₽</span> */}
          </p>
          
          <div className={style.spaceTopPrice} />

          {filterGicles?.length > 0 && 
            <p className={style.flexRow}>
              <span className={style.infoText}> Стоимость жикле ОТ:</span>
              <span className={style.priceText}>
                {' '}
               {/* {gicleMiddlePrice} ₽ */}

               {minPrice}  ₽
              </span>
            </p>
          }
          
          <div className={style.priceSubbmit}>
            <button
              className={`btn ${style.btnSubbmit}`}
              onClick={() => handleOpenReqestModal()}
            >
              <div className={'btnPriceContainer'}>
                <span className={style.subbmitText}>
                  Отправить запрос на покупку
                </span>
                <svg
                  width='28'
                  height='28'
                  viewBox='0 0 28 28'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M3 13.875H25M25 13.875L18.125 7M25 13.875L18.125 20.75'
                    stroke='black'
                    strokeWidth='2'
                    strokeLinecap='square'
                  />
                </svg>
              </div>
              <div className={'bottomLine'}></div>
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default ProductDescription;
