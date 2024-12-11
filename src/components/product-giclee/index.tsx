import React, { FC, useState } from 'react';
import style from '@/styles/product.module.scss';
import ModalMoreInfo from '../modals/modalMoreInfo';
// import ImageItemCategory from '@/components/imageItemCategory';

interface ProductGicleeProps {
  isActiveImage: boolean;
  itemImages: any;
  itemProduct: any;
}

const ProductGiclee: FC<ProductGicleeProps> = ({
  isActiveImage,
  itemImages,
  itemProduct,
}) => {
  /**
   *  Product Giclee Hooks.
   */

  const [isMoreOpen, onMoreClose] = useState<boolean>(false);
  const [isGifType, setIsGifType] = useState<string | null>(null);

  const handleMouseEnter = (e: string) => {
    setIsGifType(e);
  };

  const handleMouseLeave = () => {
    setIsGifType(null);
  };

  const closeModal = () => {
    onMoreClose(false);
  };

  return (
    <div className={style.giclee}>
      <div className={style.flexBetween}>
        <div className={style.infoTitle}>
          <span> Жикле </span>
        </div>
        <div className={style.redInfoTitle} onClick={() => onMoreClose(true)}>
          <span className={style.redInfoIcon}> 
           <img src={`/icons/plus-icon.svg`} alt='Plus-Icon' width={28} height={28} />  
          </span>
          <span className={style.redInfoSubtitle}> узнать больше </span>
        </div>
      </div>
      <div className={style.searchBottom} />
      <div className={style.glileeInfo}>
        {isGifType === '1' && 
          <div className={`${style.hoverGif}`}  onMouseLeave={handleMouseLeave} >
            <img src={'/gif/1.gif'} alt='1' className={`${style.imageGif}`} />
          </div>
        }
        <p className={style.infoText}>
          Художник дорабатывает холст вручную
          <span
           style={{ letterSpacing: '-2px' }}
            className={` ${style.spaceX} ${style.textNumber} `}
            onMouseEnter={() => handleMouseEnter('1')}
            // onMouseLeave={handleMouseLeave}
          >
            –– 1 ––
          </span>
          с помощью тех же масляных красок, которыми написаны оригиналы. Такой
          подход позволяет создать объемную поверхность,
          <span
          style={{ letterSpacing: '-2px' }}
            className={` ${style.spaceX} ${style.textNumber} `}
            onMouseEnter={() => handleMouseEnter('2')}
            // onMouseLeave={handleMouseLeave}
          >
            –– 2 ––
          </span>
          наложить «живые» мазки и проявить фактуру холста. Жикле производится в
          ограниченном тираже из 10 штук, имеет номер авторской
          <span
          style={{ letterSpacing: '-2px' }}
            className={` ${style.spaceX} ${style.textNumber}`}
            onMouseEnter={() => handleMouseEnter('3')}
            onMouseLeave={handleMouseLeave}
            
          >
          –– 3 ––
          </span>
          серии. Масштаб может полностью совпадать с оригиналом, или быть
          больше/меньше оригинального, в зависимости от пожелания заказчика.
        </p>
        {isGifType === '2' && 
          <div
            className={`${style.hoverGifTwo}`}
            onMouseLeave={handleMouseLeave}
      
          >
            <img src={'/gif/2.gif'} alt='2' className={`${style.imageGif}`} />
          </div>
        }
        {isGifType === '3' && 
          <div
            className={`${style.hoverGifThree}`}
            onMouseLeave={handleMouseLeave}
          >
            <img src={'/gif/3.gif'} alt='3' className={`${style.imageGif}`} />
          </div>
        }
      </div>
      <div className={style.glileeImage}>
        {isActiveImage ? 
          <div className={` `}>
            <div className={`${style.greenBorderBackground}`}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                style={{ display: 'none' }}
              >
                <filter id='customGreenFilter'>
                  <feColorMatrix
                    type='matrix'
                    values='0 0 0 0 0
                    0 0.698 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0'
                  />
                </filter>
              </svg>
              <img
                src={itemImages?.url}
                alt={itemImages?.mimeType}
                className={`${style.gilieeBackground}`}
                // style={{
                //   filter: `url(#customGreenFilter)`,
                // }}
              />
              <div className={` ${style.overlayGreen} `}></div>
              {/* <ImageItemCategory itemId={`url(#customGreenFilter)`} /> */}
              <div className={`${style.greenBackgroundSize}`}>
                <div className={`${style.titleBackground}`}>
                  <span>ЖИКЛЕ №00</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className={`${style.subTitleBackground}`}>выпущено</div>
                  <div className={`${style.greenBackgroundRadius}`} />
                </div>
              </div>
            </div>
            
          </div>
         : 
          <div>
            <div className={`${style.redBorderBackground}`}>
              <img
                src={itemImages?.url}
                alt={itemImages?.mimeType}
                className={`${style.redgilieeBackground}`}
                // style={{
                //   filter: `url(#redFilter-01)`,
                // }}
              />
              <div className={` ${style.overlayRed} `}></div>
              {/* <ImageItemCategory itemId={`redFilter-01`} /> */}
              <div className={`${style.redBackgroundSize} `}>
                <div className={` ${style.titleBackground} `}>
                  <span> ЖИКЛЕ №00</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div className={` ${style.subTitleBackground} `}>
                    не выпущено
                  </div>
                  <div className={` ${style.redBackgroundRadius} `} />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <ModalMoreInfo isMoreOpen={isMoreOpen} onMoreClose={closeModal} />
    </div>
  );
};

// @ts-ignore
export default ProductGiclee;
