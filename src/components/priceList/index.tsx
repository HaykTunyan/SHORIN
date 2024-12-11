import React, { FC } from 'react';
import style from '@/styles/product.module.scss';

interface PriceListProps {
  gicleeNumber: number;
  id: string;
  state: string;
  variants: any[];
  handleCheckIt: () => void;
  isCheckActive: boolean[];
}

const PriceList: FC<PriceListProps> = ({
  gicleeNumber,
  id,
  state,
  variants,
  handleCheckIt,
  isCheckActive,
}) => {
  /**
   * PriceList Hooks.
   */

  // eslint-disable-next-line no-shadow
  const findLowestPricedItem = (variants: any[]) => {
    if (variants.length === 0) return null;

    return variants.reduce((minItem: any, currentItem: any) => {
      return currentItem.price < minItem.price ? currentItem : minItem;
    }, variants[0]);
  };

  const lowestPricedItem = findLowestPricedItem(variants);

  return (
    <div
      className={` ${style.labelDiv}  ${
        state === 'AUCTION' ? style.labelHight : ''
      }  `}
    >
      <label
        className={`  
       ${state === 'AUCTION' ? style.auctionDiv : ''}
      ${state === 'AVAILABLE' && style.hoverLabelColor}`}
        onChange={handleCheckIt}
        key={id}
        htmlFor={id}
      >
        <a
          className={`
            ${style.listPrice} 
            ${state === 'AVAILABLE' && style.activePrice}
            ${state === 'SALES' && style.inactive}  
            `}
          //
        >
          <div className={style.flexRow}>
            {state === 'AVAILABLE' ? 
              <>
                <input
                  type='checkbox'
                  id={id}
                  checked={isCheckActive[gicleeNumber]}
                />
              </>
             : state === 'AUCTION' ? 
              ''
             : 
              <>
                <input type='checkbox' 
                 className={`${style.checkboxAvailable} ${state === 'SALES' ? style.borderSell : ''}`}  
                
                />
              </>
            }

            <span
              style={{ fontWeight: '400' }}
              className={` 
                ${state != 'AUCTION' ? style.listTitle : style.auctionTitle}  
              ${isCheckActive[gicleeNumber] ? style.checkedText : ''}  
              `}
            >
              жикле №0{gicleeNumber}
            </span>
          </div>
          <div className={style.flexRow}>
            {state === 'AUCTION' ? 
              <span className={style.auctionTitle}> на аукционе </span>
             : 
              <div>
                <span
                  style={{ fontWeight: '400' }}
                  className={
                    isCheckActive[gicleeNumber] ? style.checkedText : ''
                  }
                >
                  от{' '}
                </span>
                <span
                  style={{ fontWeight: '400' }}
                  className={
                    isCheckActive[gicleeNumber] ? style.checkedText : ''
                  }
                >
                  {lowestPricedItem?.price}
                </span>
                <span
                  style={{ fontWeight: '400' }}
                  className={
                    isCheckActive[gicleeNumber] ? style.checkedText : ''
                  }
                >
                  {' '}
                  ₽
                </span>
              </div>
            }
          </div>
        </a>
      </label>
    </div>
  );
};

export default PriceList;
